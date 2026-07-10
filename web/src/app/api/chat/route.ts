import { buildSystemPrompt } from "@/prompts/system-prompt";
import { z } from "zod";

// ============================================================
// Zod 输入校验 — 兼容两种消息格式
// AI SDK v4 transport 发送 { role, parts: [...] }
// curl / 自定义前端 发送 { role, content: "..." }
// ============================================================
const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  // 兼容 content 字符串格式
  content: z.string().optional(),
  // 兼容 parts 数组格式（AI SDK v4 UIMessage）
  parts: z
    .array(
      z.object({
        type: z.string(),
        text: z.string().optional(),
      })
    )
    .optional(),
});

const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
});

// 从消息中提取纯文本（兼容两种格式）
function extractText(msg: z.infer<typeof MessageSchema>): string {
  if (msg.content) return msg.content;
  if (msg.parts) {
    return msg.parts
      .filter((p) => p.type === "text" && p.text)
      .map((p) => p.text!)
      .join("");
  }
  return "";
}

// ============================================================
// IP 频率限制
// ============================================================
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// ============================================================
// 访问令牌校验
// ============================================================
function validateToken(request: Request): boolean {
  const token = request.headers.get("x-scope-token");
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const ts = parseInt(decoded, 10);
    if (isNaN(ts)) return false;
    return Date.now() - ts < 5 * 60 * 1000;
  } catch {
    return false;
  }
}

// ============================================================
// POST /api/chat
// ============================================================
export async function POST(request: Request) {
  // 安全：访问令牌
  if (!validateToken(request)) {
    return Response.json({ error: "禁止直接访问 API" }, { status: 403 });
  }

  // 安全：IP 频率限制
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "请求过于频繁，请稍后再试" },
      { status: 429 }
    );
  }

  // 安全：输入校验
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "消息格式不符合要求" },
      { status: 400 }
    );
  }

  // 构建消息：系统提示词 + 对话历史（统一转为 content 格式）
  const systemPrompt = buildSystemPrompt();
  const messages = [
    { role: "system", content: systemPrompt },
    ...parsed.data.messages.map((m) => ({
      role: m.role,
      content: extractText(m),
    })),
  ];

  // 安全：API Key 只在服务端使用
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "服务未配置 AI 接口" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "qwen-plus",
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 4096,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("DashScope API error:", response.status, errText);
      return Response.json(
        { error: `AI 服务返回错误 (${response.status})` },
        { status: 502 }
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return Response.json({ error: "无法读取流" }, { status: 500 });
    }

    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // 跳过无法解析的行
              }
            }
          }
        } catch (e) {
          console.error("Stream read error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("DashScope request error:", error);
    return Response.json(
      { error: "AI 服务暂时不可用，请稍后重试" },
      { status: 502 }
    );
  }
}

export async function GET() {
  return Response.json({ error: "请使用 POST 请求" }, { status: 405 });
}

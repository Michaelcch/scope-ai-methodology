import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { z } from "zod";
import { NextRequest } from "next/server";

const FeedbackSchema = z.object({
  type: z.enum(["suggestion", "bug", "other"]).default("suggestion"),
  content: z.string().min(1).max(5000),
  contact: z.string().max(200).optional(),
  page: z.string().max(500).optional(),
});

// ============================================================
// 简易频率限制（反馈专用）
// ============================================================
const feedbackRateMap = new Map<
  string,
  { count: number; resetAt: number }
>();

function checkFeedbackRate(ip: string): boolean {
  const now = Date.now();
  const entry = feedbackRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    feedbackRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 3) return false; // 每分钟最多 3 条反馈
  entry.count++;
  return true;
}

// POST: 提交反馈（无需鉴权）
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkFeedbackRate(ip)) {
    return Response.json(
      { error: "提交过于频繁，请稍后再试" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }

  const parsed = FeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "反馈内容格式不正确" },
      { status: 400 }
    );
  }

  try {
    await db.feedback.create({ data: parsed.data });
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "提交失败，请稍后重试" },
      { status: 500 }
    );
  }
}

// GET: 查询所有反馈（需管理员鉴权）
export async function GET() {
  const authed = await getAuthFromCookies();
  if (!authed) {
    return Response.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const feedbacks = await db.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(feedbacks);
  } catch {
    return Response.json(
      { error: "查询失败" },
      { status: 500 }
    );
  }
}

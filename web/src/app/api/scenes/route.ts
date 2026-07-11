import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { z } from "zod";
import { NextRequest } from "next/server";

const SaveSceneSchema = z.object({
  prompt: z.string().min(1).max(2000),
  result: z.string().min(1).max(50000),
});

// 简易频率限制（场景保存专用）
const sceneRateMap = new Map<
  string,
  { count: number; resetAt: number }
>();

function checkSceneRate(ip: string): boolean {
  const now = Date.now();
  const entry = sceneRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    sceneRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

// POST: 保存场景（无需鉴权）
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkSceneRate(ip)) {
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

  const parsed = SaveSceneSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "方案内容格式不正确" },
      { status: 400 }
    );
  }

  try {
    await db.scene.create({ data: parsed.data });
    return Response.json({ success: true });
  } catch (e) {
    console.error("保存场景失败:", e);
    return Response.json(
      { error: "保存失败，请稍后重试" },
      { status: 500 }
    );
  }
}

// GET: 查询所有场景（需管理员鉴权）
export async function GET() {
  const authed = await getAuthFromCookies();
  if (!authed) {
    return Response.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const scenes = await db.scene.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(scenes);
  } catch {
    return Response.json(
      { error: "查询失败" },
      { status: 500 }
    );
  }
}

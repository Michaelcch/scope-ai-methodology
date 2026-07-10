import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sendVerificationCode } from "@/lib/sms";
import { checkRateLimit } from "@/lib/rate-limit";

// 手机号正则（中国大陆）
const PHONE_REGEX = /^1[3-9]\d{9}$/;

export async function POST(request: NextRequest) {
  let body: { phone?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { phone } = body;

  // 1. 校验手机号格式
  if (!phone || !PHONE_REGEX.test(phone)) {
    return Response.json({ error: "手机号格式不正确" }, { status: 400 });
  }

  // 2. 手机号频率限制：同号码 60 秒内仅一次
  if (!checkRateLimit(`sms:phone:${phone}`, 1, 60_000)) {
    return Response.json(
      { error: "验证码已发送，请 60 秒后再试" },
      { status: 429 }
    );
  }

  // 3. IP 频率限制：同 IP 每小时 5 次
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!checkRateLimit(`sms:ip:${ip}`, 5, 3_600_000)) {
    return Response.json(
      { error: "请求过于频繁，请稍后再试" },
      { status: 429 }
    );
  }

  // 4. 生成 6 位验证码
  const code = String(Math.floor(100000 + Math.random() * 900000));

  // 5. 存库（5 分钟有效）
  await db.verificationCode.create({
    data: {
      phone,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  // 6. 发送短信
  try {
    await sendVerificationCode(phone, code);
  } catch (e) {
    console.error("短信发送失败:", e);
    return Response.json({ error: "短信发送失败，请稍后重试" }, { status: 500 });
  }

  return Response.json({ success: true });
}

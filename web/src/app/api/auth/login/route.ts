import { signToken, COOKIE_NAME } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

// 手机号正则
const PHONE_REGEX = /^1[3-9]\d{9}$/;

export async function POST(request: NextRequest) {
  let body: { phone?: string; code?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { phone, code } = body;

  // 1. 校验手机号
  if (!phone || !PHONE_REGEX.test(phone)) {
    return Response.json({ error: "手机号格式不正确" }, { status: 400 });
  }

  // 2. 校验验证码
  if (!code || code.length !== 6) {
    return Response.json({ error: "验证码格式不正确" }, { status: 400 });
  }

  // 3. 查找有效验证码
  const record = await db.verificationCode.findFirst({
    where: {
      phone,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record || record.code !== code) {
    return Response.json(
      { error: "验证码错误或已过期" },
      { status: 401 }
    );
  }

  // 4. 标记验证码已使用
  await db.verificationCode.update({
    where: { id: record.id },
    data: { used: true },
  });

  // 5. 创建或查找用户
  await db.user.upsert({
    where: { phone },
    create: { phone },
    update: {},
  });

  // 6. 签发 JWT
  const token = await signToken();

  return Response.json(
    { success: true },
    {
      status: 200,
      headers: {
        "Set-Cookie": `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`,
      },
    }
  );
}

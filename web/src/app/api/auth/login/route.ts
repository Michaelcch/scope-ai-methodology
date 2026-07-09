import { signToken, COOKIE_NAME } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { password } = body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return Response.json(
      { error: "服务端未配置管理员密码" },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return Response.json({ error: "密码错误" }, { status: 401 });
  }

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

import { signToken, COOKIE_NAME } from "@/lib/auth";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }

  const { username, password } = body;

  if (!username || !password) {
    return Response.json(
      { error: "用户名和密码不能为空" },
      { status: 400 }
    );
  }

  // 查找用户
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    // 避免泄露用户是否存在，统一返回"用户名或密码错误"
    return Response.json(
      { error: "用户名或密码错误" },
      { status: 401 }
    );
  }

  // 验密
  const valid = await compare(password, user.passwordHash);
  if (!valid) {
    return Response.json(
      { error: "用户名或密码错误" },
      { status: 401 }
    );
  }

  // 签发 JWT
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

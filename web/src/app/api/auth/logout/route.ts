import { COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  return Response.json(
    { success: true },
    {
      headers: {
        "Set-Cookie": `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
      },
    }
  );
}

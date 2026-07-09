import { getAuthFromCookies } from "@/lib/auth";

export async function GET() {
  const authed = await getAuthFromCookies();
  return Response.json({ authenticated: authed });
}

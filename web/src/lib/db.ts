import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

function initClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("placeholder")) return null;
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: url }),
  });
}

function getClient(): PrismaClient {
  if (globalForPrisma.prisma === undefined) {
    globalForPrisma.prisma = initClient();
  }
  const c = globalForPrisma.prisma;
  if (!c) throw new Error("数据库未连接：请配置 DATABASE_URL");
  return c;
}

// Proxy: 透明代理到 PrismaClient，只在真正调用时才初始化
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getClient() as any)[prop];
  },
});

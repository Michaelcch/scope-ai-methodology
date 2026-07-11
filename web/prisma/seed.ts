// ============================================================
// 初始化管理员账号
// 用法: npx tsx prisma/seed.ts
// 环境变量 ADMIN_USERNAME / ADMIN_PASSWORD 控制初始凭据
// ============================================================

import { config } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

// 加载 .env 和 .env.local（文件在 web/ 根目录，__dirname 是 prisma/）
config({ path: resolve(__dirname, "..", ".env") });
config({ path: resolve(__dirname, "..", ".env.local"), override: true });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ 请设置 DATABASE_URL 环境变量");
  process.exit(1);
}

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!PASSWORD) {
  console.error("❌ 请设置 ADMIN_PASSWORD 环境变量");
  process.exit(1);
}

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: DATABASE_URL }),
  });

  const passwordHash = await hash(PASSWORD!, 12);

  const user = await prisma.user.upsert({
    where: { username: USERNAME },
    create: { username: USERNAME, passwordHash },
    update: { passwordHash },
  });

  console.log(`✅ 管理员已就绪: ${user.username}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("种子脚本执行失败:", e);
  process.exit(1);
});

#!/bin/sh
set -e

echo "=========================================="
echo "  SCOPE Agent - 阿里云部署脚本"
echo "=========================================="

cd /root/web

echo ""
echo "[1/4] 构建 Docker 镜像..."
docker build -t scope-web .

echo ""
echo "[2/4] 数据库建表..."
docker run --rm --env-file .env.production --network host scope-web node node_modules/.bin/prisma db push

echo ""
echo "[3/4] 创建管理员账号..."
docker run --rm --env-file .env.production --network host scope-web node node_modules/.bin/tsx prisma/seed.ts

echo ""
echo "[4/4] 启动应用..."
docker stop scope-web 2>/dev/null || true
docker rm scope-web 2>/dev/null || true
docker run -d -p 3000:3000 --env-file .env.production --name scope-web --restart always scope-web

echo ""
echo "=========================================="
echo "  部署完成！"
echo "  访问 http://121.40.61.131:3000"
echo "=========================================="

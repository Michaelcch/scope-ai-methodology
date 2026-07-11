# ===== Stage 1: 构建 =====
FROM node:22-alpine AS builder
WORKDIR /app

# 阿里云 Alpine 镜像加速
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --no-cache openssl openssl-dev

# npm 淘宝镜像加速
RUN npm config set registry https://registry.npmmirror.com

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# ===== Stage 2: 运行 =====
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --no-cache openssl

# Next.js standalone 输出 + 静态文件
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma schema + migrations（db push 需要）
COPY --from=builder /app/prisma ./prisma

# prisma CLI + tsx + dotenv（db push / seed 需要）
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/tsx ./node_modules/tsx
COPY --from=builder /app/node_modules/dotenv ./node_modules/dotenv

EXPOSE 3000
CMD ["node", "server.js"]

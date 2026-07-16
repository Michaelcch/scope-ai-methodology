import type { Metadata } from "next";
// 字体使用系统默认栈，无需加载外部字体，国内访问零延迟
import "./globals.css";

export const metadata: Metadata = {
  title: "SCOPE · AI 业务场景顾问",
  description:
    "基于 ~1000 个真实案例和 36 个发明原理，系统性地帮您找到 AI 赋能业务的最佳切入点。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const router = useRouter();

  const startCountdown = () => {
    setCountdown(60);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    if (!phone || countdown > 0) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (res.ok) {
        startCountdown();
      } else {
        const data = await res.json();
        setError(data.error || "发送失败");
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setSending(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !code) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "登录失败");
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            SCOPE 管理后台
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            手机号验证码登录
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          {/* 手机号 */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="手机号"
            autoFocus
            maxLength={11}
            className="mb-3 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          {/* 验证码 + 发送按钮 */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="验证码"
              maxLength={6}
              className="flex-1 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={sending || countdown > 0 || phone.length !== 11}
              className="w-28 shrink-0 rounded-xl bg-zinc-100 py-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              {sending
                ? "发送中…"
                : countdown > 0
                  ? `${countdown}s`
                  : "获取验证码"}
            </button>
          </div>

          {error && (
            <p className="mb-4 text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !phone || !code}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "验证中…" : "登录"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
            ← 返回对话
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

interface WelcomePanelProps {
  onExampleClick: (question: string) => void;
}

const EXAMPLES = [
  "我是一家连锁餐饮企业，200家门店，备货损耗率8%，想用AI降本增效",
  "我们做电商的，想用AI提高转化率，但又怕推荐算法太复杂落不了地",
  "我是制造业工厂的，设备经常出故障，想知道AI能不能帮我们预测和预防",
];

export function WelcomePanel({ onExampleClick }: WelcomePanelProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
            S
          </div>
        </div>

        {/* 标题 */}
        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          SCOPE · AI 业务场景顾问
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          基于 <strong>210 个真实案例</strong>和 <strong>36 个发明原理</strong>，
          系统性地帮您找到 AI 赋能业务的最佳切入点。
          不用懂技术，告诉我您的业务痛点就行。
        </p>

        {/* 五步法卡片 */}
        <div className="mb-8 grid grid-cols-5 gap-2">
          {[
            { step: "S", label: "明确目标", color: "bg-blue-500" },
            { step: "C", label: "识别约束", color: "bg-amber-500" },
            { step: "O", label: "查矩阵", color: "bg-green-500" },
            { step: "P", label: "规划路线", color: "bg-purple-500" },
            { step: "E", label: "匹配技术", color: "bg-red-500" },
          ].map(({ step, label, color }) => (
            <div key={step} className="text-center">
              <div
                className={`mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg ${color} text-xs font-bold text-white`}
              >
                {step}
              </div>
              <div className="text-[10px] text-zinc-400">{label}</div>
            </div>
          ))}
        </div>

        {/* 示例问题 */}
        <p className="mb-3 text-xs text-zinc-400">试试这些问题：</p>
        <div className="flex flex-col gap-2">
          {EXAMPLES.map((q) => (
            <button
              key={q}
              onClick={() => onExampleClick(q)}
              className="rounded-xl border border-zinc-200 px-4 py-3 text-left text-sm text-zinc-600 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-600 dark:hover:bg-blue-950"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

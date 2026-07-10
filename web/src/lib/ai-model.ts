import { createOpenAI } from "@ai-sdk/openai";

// 通义千问 DashScope API（OpenAI 兼容协议）
export const qwen = createOpenAI({
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.DASHSCOPE_API_KEY!,
});

export const QWEN_MODEL = "qwen-plus";

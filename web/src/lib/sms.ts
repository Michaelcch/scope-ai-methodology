// ============================================================
// 阿里云短信服务 — 发送验证码
// 使用 @alicloud/dysmsapi20170525 官方 SDK
// 开发环境直接 console.log 验证码，不调用真实短信
// ============================================================

import Dysmsapi20170525 from "@alicloud/dysmsapi20170525";

let client: Dysmsapi20170525 | null = null;

function getClient(): Dysmsapi20170525 {
  if (!client) {
    client = new Dysmsapi20170525({
      accessKeyId: process.env.ALIBABA_ACCESS_KEY_ID!,
      accessKeySecret: process.env.ALIBABA_ACCESS_KEY_SECRET!,
    });
  }
  return client;
}

export async function sendVerificationCode(
  phone: string,
  code: string
): Promise<void> {
  // 开发环境：打印验证码到日志，不发送真实短信
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] 验证码 ${code} → ${phone}`);
    return;
  }

  await getClient().sendSms({
    phoneNumbers: phone,
    signName: process.env.SMS_SIGN_NAME!,
    templateCode: process.env.SMS_TEMPLATE_CODE!,
    templateParam: JSON.stringify({ code }),
  });
}

import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `你是一个面向"零基础、英语较弱的技术小白"的编程英语老师。
用户会给你一个英文单词，请你返回该单词在编程/技术领域的解释。
请直接输出合法的 JSON，不要包含任何 Markdown 代码块包裹（不要有 \`\`\`json）。
JSON 格式要求（严格遵守，不要多余字段）：
{
  "phonetic": "国际音标，如 [fɛtʃ]",
  "translation": "简洁的中文释义",
  "tech_context": "技术场景，用大白话解释，不超过2句话",
  "code_example": "极简的代码示例，1行最佳"
}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const word = body.word?.trim();

    if (!word) {
      return NextResponse.json({ error: "缺少 word 参数" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseURL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.OPENAI_MODEL || "deepseek-chat";
    const endpoint = `${baseURL}/chat/completions`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: word },
        ],
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[/api/generate] LLM API error:", res.status, errBody);
      return NextResponse.json(
        { error: "AI 服务调用失败，请稍后再试" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content?.trim() ?? "";

    /* 兼容模型可能返回 ```json 包裹的情况 */
    let cleaned = raw;
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const result = JSON.parse(cleaned);

    const { phonetic, translation, tech_context, code_example } = result;
    if (!phonetic || !translation || !tech_context || !code_example) {
      return NextResponse.json(
        { error: "AI 返回数据格式不完整，请重试" },
        { status: 502 }
      );
    }

    return NextResponse.json({ phonetic, translation, tech_context, code_example });
  } catch (err: unknown) {
    console.error("[/api/generate] Error:", err);

    const message =
      err instanceof SyntaxError
        ? "AI 返回内容解析失败，请重试"
        : "AI 服务暂时不可用，请稍后再试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

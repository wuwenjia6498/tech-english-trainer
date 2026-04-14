/**
 * 将词汇 JSON 转为 Supabase 可直接执行的 INSERT SQL
 * 代码示例开头会追加一行注释，让学习词汇在代码中显式出现
 * 用法: node scripts/json-to-sql.js
 */
const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync("C:\\Users\\Administrator\\Desktop\\词汇.txt", "utf-8");
const words = JSON.parse(raw);

/* 去重：以 word 为键，后出现的覆盖前面的 */
const unique = new Map();
for (const w of words) {
  unique.set(w.word, w);
}

/* 根据代码内容推断注释语法 */
function detectCommentStyle(code) {
  const trimmed = code.trim();
  if (trimmed.startsWith("<") || trimmed.includes("</")) return "html";
  if (trimmed.match(/^(SELECT|INSERT|CREATE|ALTER|DROP)\b/i)) return "sql";
  if (
    trimmed.startsWith("function ") ||
    trimmed.startsWith("const ") ||
    trimmed.startsWith("document.") ||
    trimmed.startsWith("export ")
  )
    return "js";
  if (trimmed.match(/^[\w-]+\s*\{/)) return "css";
  return "hash";
}

function makeComment(style, text) {
  switch (style) {
    case "html":
      return `<!-- ${text} -->`;
    case "sql":
      return `-- ${text}`;
    case "js":
      return `// ${text}`;
    case "css":
      return `/* ${text} */`;
    default:
      return `# ${text}`;
  }
}

/* SQL 字符串转义：单引号翻倍 */
function esc(str) {
  return str.replace(/'/g, "''");
}

let sql =
  "-- 清空旧数据并重置自增 ID\nTRUNCATE TABLE vocabulary RESTART IDENTITY;\n\n";
sql +=
  "INSERT INTO vocabulary (word, phonetic, category, translation, tech_context, code_example)\nVALUES\n";

const rows = [];
for (const w of unique.values()) {
  /* 在 code_example 首行插入包含单词的注释 */
  const style = detectCommentStyle(w.code_example);
  const commentLine = makeComment(style, `${w.word} — ${w.translation}`);
  const enhancedCode = commentLine + "\n" + w.code_example;

  const row = `  (E'${esc(w.word)}', E'${esc(w.phonetic)}', E'${esc(w.category)}', E'${esc(w.translation)}', E'${esc(w.tech_context)}', E'${esc(enhancedCode)}')`;
  rows.push(row);
}

sql += rows.join(",\n") + ";\n";

const outPath = path.join(__dirname, "..", "vocabulary-import.sql");
fs.writeFileSync(outPath, sql, "utf-8");
console.log(`Done! ${unique.size} words (deduped from ${words.length}).`);
console.log(`SQL saved to: ${outPath}`);

/* 打印前 3 条预览 */
let i = 0;
for (const w of unique.values()) {
  if (i >= 3) break;
  const style = detectCommentStyle(w.code_example);
  const comment = makeComment(style, `${w.word} — ${w.translation}`);
  console.log(`\n--- [${w.word}] ---`);
  console.log(comment);
  console.log(w.code_example.split("\n")[0] + " ...");
  i++;
}

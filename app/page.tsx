import { supabase, type VocabularyRow } from "@/lib/supabase";
import FlashcardDeck from "@/components/FlashcardDeck";
import Link from "next/link";

/* Server Component：按 next_review 升序排列，待复习的词排在最前 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { word: focusWord } = await searchParams;

  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .order("next_review", { ascending: true, nullsFirst: true })
    .order("id", { ascending: true });

  const words: VocabularyRow[] = data ?? [];

  /* 如果 URL 带 ?word=xxx，计算该词在列表中的索引 */
  const focusStr = typeof focusWord === "string" ? focusWord : undefined;
  const initialIndex = focusStr
    ? Math.max(0, words.findIndex((w) => w.word.toLowerCase() === focusStr.toLowerCase()))
    : 0;

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-svh bg-[#F7F6F2] px-5 pt-8 pb-6 sm:px-6 sm:py-12">
      <header className="mb-10 sm:mb-16 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#333]">
          Tech English Trainer
        </h1>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#B0ADA6]">
          技术英语闪卡 · 轻松记忆编程词汇
        </p>
        <p className="mt-2 text-xs text-[#7A9586] font-medium">
          <Link href="/manage" className="hover:underline underline-offset-2">
            查看词库 →
          </Link>
        </p>
      </header>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#B0ADA6]">
          <p className="text-lg">数据加载失败</p>
          <p className="mt-2 text-sm">请检查网络连接或 Supabase 配置</p>
        </div>
      ) : (
        <FlashcardDeck words={words} initialIndex={initialIndex} />
      )}

      <footer className="mt-auto pt-12 sm:pt-16 pb-4 sm:pb-6">
        <p className="text-xs text-[#D0CDC5]">V0.5 · Spaced Repetition</p>
      </footer>
    </div>
  );
}

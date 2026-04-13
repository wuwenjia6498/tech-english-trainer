import { supabase, type VocabularyRow } from "@/lib/supabase";
import FlashcardDeck from "@/components/FlashcardDeck";

/* Server Component：在服务端直接查询 Supabase，零客户端 JS 开销 */
export default async function Home() {
  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .order("id", { ascending: true });

  const words: VocabularyRow[] = data ?? [];

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-svh bg-[#F7F6F2] px-5 pt-8 pb-6 sm:px-6 sm:py-12">
      {/* 标题区 */}
      <header className="mb-10 sm:mb-16 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#333]">
          Tech English Trainer
        </h1>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#B0ADA6]">
          技术英语闪卡 · 轻松记忆编程词汇
        </p>
      </header>

      {/* 闪卡交互区域 - 数据从服务端传入 */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#B0ADA6]">
          <p className="text-lg">数据加载失败</p>
          <p className="mt-2 text-sm">请检查网络连接或 Supabase 配置</p>
        </div>
      ) : (
        <FlashcardDeck words={words} />
      )}

      {/* 底部装饰文字 */}
      <footer className="mt-auto pt-12 sm:pt-16 pb-4 sm:pb-6">
        <p className="text-xs text-[#D0CDC5]">V0.1 · Minimalist Healing</p>
      </footer>
    </div>
  );
}

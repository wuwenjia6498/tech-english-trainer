import { supabase, type VocabularyRow } from "@/lib/supabase";
import ManageList from "@/components/ManageList";

export default async function ManagePage() {
  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .order("word", { ascending: true });

  const words: VocabularyRow[] = data ?? [];

  return (
    <div className="flex flex-col min-h-svh bg-[#F7F6F2]">
      {error ? (
        <div className="flex flex-col items-center justify-center flex-1 text-[#B0ADA6]">
          <p className="text-lg">数据加载失败</p>
          <p className="mt-2 text-sm">请检查网络连接或 Supabase 配置</p>
        </div>
      ) : (
        <ManageList words={words} />
      )}
    </div>
  );
}

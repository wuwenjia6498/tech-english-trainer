"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, Pencil } from "lucide-react";
import Link from "next/link";
import EditWordModal from "@/components/EditWordModal";
import type { VocabularyRow } from "@/lib/supabase";

type FilterTab = "all" | "due" | "mastered" | "hard";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "due", label: "待复习" },
  { key: "mastered", label: "已熟知" },
  { key: "hard", label: "难点词" },
];

interface ManageListProps {
  words: VocabularyRow[];
}

function formatInterval(interval: number): string {
  if (!interval || interval === 0) return "新词";
  if (interval < 1) return "< 1天";
  if (interval >= 30) return `${Math.round(interval / 30)}个月`;
  return `${Math.round(interval)}天`;
}

function getStatusInfo(word: VocabularyRow): {
  text: string;
  color: string;
  bgColor: string;
} {
  const now = new Date().toISOString();
  const isDue = !word.next_review || word.next_review <= now;
  const isHard = (word.ease_factor ?? 2.5) < 1.8;
  const isMastered = (word.interval ?? 0) > 7;

  if (isHard) return { text: "难点词", color: "text-[#C4867A]", bgColor: "bg-[#F5E6E0]" };
  if (isDue) return { text: "待复习", color: "text-[#B5A47A]", bgColor: "bg-[#F2EDE0]" };
  if (isMastered) return { text: `间隔: ${formatInterval(word.interval)}`, color: "text-[#7A9586]", bgColor: "bg-[#E0EEEA]" };
  return { text: `间隔: ${formatInterval(word.interval)}`, color: "text-[#B0ADA6]", bgColor: "bg-[#F2F1ED]" };
}

export default function ManageList({ words: initialWords }: ManageListProps) {
  const [words, setWords] = useState(initialWords);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [editingWord, setEditingWord] = useState<VocabularyRow | null>(null);

  const now = useMemo(() => new Date().toISOString(), []);

  const filteredWords = useMemo(() => {
    switch (activeTab) {
      case "due":
        return words.filter((w) => !w.next_review || w.next_review <= now);
      case "mastered":
        return words.filter((w) => (w.interval ?? 0) > 7);
      case "hard":
        return words.filter((w) => (w.ease_factor ?? 2.5) < 1.8);
      default:
        return words;
    }
  }, [words, activeTab, now]);

  const counts = useMemo(
    () => ({
      all: words.length,
      due: words.filter((w) => !w.next_review || w.next_review <= now).length,
      mastered: words.filter((w) => (w.interval ?? 0) > 7).length,
      hard: words.filter((w) => (w.ease_factor ?? 2.5) < 1.8).length,
    }),
    [words, now]
  );

  const handleUpdated = useCallback((updated: VocabularyRow) => {
    setWords((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  }, []);

  const handleDeleted = useCallback((id: number) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E8E6E0]/60">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          <Link
            href="/"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/60 transition-colors active:scale-95"
            aria-label="返回首页"
          >
            <ChevronLeft className="w-5 h-5 text-[#7A9586]" />
          </Link>
          <h1 className="text-lg font-semibold text-[#333]">词库管理</h1>
          <span className="ml-auto text-xs text-[#B0ADA6] tabular-nums">
            {filteredWords.length} 词
          </span>
        </div>

        <div className="flex gap-1 px-4 pb-3 max-w-2xl mx-auto overflow-x-auto scrollbar-none">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === key
                  ? "bg-[#7A9586] text-white shadow-[0_2px_8px_rgba(122,149,134,0.3)]"
                  : "bg-white/60 text-[#999] hover:bg-white hover:text-[#666]"
              }`}
            >
              {label}
              <span
                className={`text-[10px] tabular-nums ${
                  activeTab === key ? "text-white/70" : "text-[#C5C2BA]"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-2xl mx-auto px-4 py-3">
          {filteredWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#B0ADA6]">
              <p className="text-base">当前分类没有单词</p>
              <p className="mt-1.5 text-xs">切换其他标签看看</p>
            </div>
          ) : (
            <ul className="space-y-1.5">
              {filteredWords.map((word) => {
                const status = getStatusInfo(word);
                return (
                  <li key={word.id} className="flex items-center gap-1.5">
                    {/* 词汇信息 — 点击跳转闪卡 */}
                    <Link
                      href={`/?word=${encodeURIComponent(word.word)}`}
                      className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 hover:bg-white/70 active:scale-[0.98] active:bg-white"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[15px] font-semibold text-[#333] truncate">
                            {word.word}
                          </span>
                          <span className="text-[11px] text-[#C5C2BA] font-light truncate hidden sm:inline">
                            {word.phonetic}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#B0ADA6] truncate">
                          {word.translation}
                        </p>
                      </div>

                      <span
                        className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium ${status.color} ${status.bgColor}`}
                      >
                        {status.text}
                      </span>
                    </Link>

                    {/* 编辑按钮 */}
                    <button
                      onClick={() => setEditingWord(word)}
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/70 transition-colors active:scale-90"
                      aria-label={`编辑 ${word.word}`}
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#C5C2BA]" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <EditWordModal
        open={!!editingWord}
        word={editingWord}
        onClose={() => setEditingWord(null)}
        onUpdated={handleUpdated}
        onDeleted={handleDeleted}
      />
    </>
  );
}

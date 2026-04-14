"use client";

import { useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import Flashcard from "@/components/Flashcard";
import SearchBar from "@/components/SearchBar";
import AddWordModal from "@/components/AddWordModal";
import {
  supabase,
  calculateReview,
  type VocabularyRow,
  type ReviewRating,
} from "@/lib/supabase";

interface FlashcardDeckProps {
  words: VocabularyRow[];
  initialIndex?: number;
}

export default function FlashcardDeck({ words: initialWords, initialIndex = 0 }: FlashcardDeckProps) {
  const [words, setWords] = useState(initialWords);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [flipKey, setFlipKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  /* 入库成功反馈动画 */
  const [showFeedback, setShowFeedback] = useState(false);

  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return words;
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.translation.includes(q) ||
        w.tech_context.toLowerCase().includes(q)
    );
  }, [words, searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentIndex(0);
    setFlipKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : filteredWords.length - 1));
    setFlipKey((k) => k + 1);
  }, [filteredWords.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i < filteredWords.length - 1 ? i + 1 : 0));
    setFlipKey((k) => k + 1);
  }, [filteredWords.length]);

  const handleWordAdded = useCallback((newWord: VocabularyRow) => {
    setWords((prev) => [...prev, newWord]);
    setSearchQuery("");
    setCurrentIndex(0);
    setFlipKey((k) => k + 1);
  }, []);

  /* 触发入库反馈动画 */
  const triggerFeedback = useCallback(() => {
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1200);
  }, []);

  /* 复习评分回调：计算新参数 → 更新 Supabase → 更新本地状态 → 切到下一张 */
  const handleReview = useCallback(
    async (rating: ReviewRating) => {
      const word = filteredWords[currentIndex];
      if (!word) return;

      const update = calculateReview(rating, {
        interval: word.interval ?? 0,
        ease_factor: word.ease_factor ?? 2.5,
        review_count: word.review_count ?? 0,
      });

      /* 乐观更新本地状态 */
      setWords((prev) =>
        prev.map((w) => (w.id === word.id ? { ...w, ...update } : w))
      );

      triggerFeedback();

      /* 切到下一张 */
      if (filteredWords.length > 1) {
        setCurrentIndex((i) =>
          i < filteredWords.length - 1 ? i : 0
        );
      }
      setFlipKey((k) => k + 1);

      /* 异步写入数据库 */
      await supabase
        .from("vocabulary")
        .update(update)
        .eq("id", word.id);
    },
    [filteredWords, currentIndex, triggerFeedback]
  );

  return (
    <>
      {/* 入库成功反馈 */}
      {showFeedback && (
        <div className="review-feedback">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7A9586] text-white text-sm shadow-lg">
            <Check className="w-4 h-4" />
            已记录
          </div>
        </div>
      )}

      {/* 搜索栏 + 添加按钮 */}
      <div className="w-full max-w-md flex items-center gap-3 mb-8">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <button
          onClick={() => setModalOpen(true)}
          className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-2xl bg-[#7A9586] text-white transition-all hover:bg-[#6B8575] active:scale-90 shadow-[0_2px_12px_rgba(122,149,134,0.3)]"
          aria-label="添加新词"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* 闪卡区域 */}
      {filteredWords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#B0ADA6]">
          {words.length === 0 ? (
            <>
              <p className="text-lg">暂无词汇数据</p>
              <p className="mt-2 text-sm">点击右上角 + 添加你的第一个单词</p>
            </>
          ) : (
            <>
              <p className="text-lg">未找到匹配的单词</p>
              <p className="mt-2 text-sm">试试其他关键词吧</p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="w-full max-w-md">
            <Flashcard
              key={flipKey}
              data={filteredWords[currentIndex]}
              onSwipeLeft={goNext}
              onSwipeRight={goPrev}
              onReview={handleReview}
            />
          </div>

          <div className="mt-8 mb-6 sm:mt-12 sm:mb-0 flex items-center gap-6 sm:gap-8">
            <button
              onClick={goPrev}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_4px_18px_rgba(0,0,0,0.1)] active:scale-90 active:bg-[#F7F6F2]"
              aria-label="上一个"
            >
              <ChevronLeft className="w-5 h-5 text-[#7A9586]" />
            </button>

            <span className="text-sm text-[#B0ADA6] tabular-nums min-w-[3rem] text-center">
              {currentIndex + 1} / {filteredWords.length}
            </span>

            <button
              onClick={goNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_4px_18px_rgba(0,0,0,0.1)] active:scale-90 active:bg-[#F7F6F2]"
              aria-label="下一个"
            >
              <ChevronRight className="w-5 h-5 text-[#7A9586]" />
            </button>
          </div>
        </>
      )}

      <AddWordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onWordAdded={handleWordAdded}
        existingWords={words}
      />
    </>
  );
}

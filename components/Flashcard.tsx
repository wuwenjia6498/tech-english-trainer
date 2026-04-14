"use client";

import { useState, useCallback, useRef } from "react";
import { Volume2 } from "lucide-react";
import type { ReviewRating } from "@/lib/supabase";

interface FlashcardData {
  word: string;
  phonetic: string;
  category: string;
  translation: string;
  tech_context: string;
  code_example: string;
}

interface FlashcardProps {
  data: FlashcardData;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onReview?: (rating: ReviewRating) => void;
}

const SWIPE_THRESHOLD = 60;

export default function Flashcard({
  data,
  onSwipeLeft,
  onSwipeRight,
  onReview,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isSwiping = useRef(false);

  const handleFlip = useCallback(() => {
    if (isSwiping.current) return;
    setIsFlipped((prev) => !prev);
  }, []);

  const handleSpeak = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(data.word);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    },
    [data.word]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    isSwiping.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        isSwiping.current = true;
        if (dx < 0) onSwipeLeft?.();
        else onSwipeRight?.();
      }
      touchStart.current = null;
    },
    [onSwipeLeft, onSwipeRight]
  );

  /* 复习按钮点击 — 阻止冒泡以避免触发翻转 */
  const handleReviewClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent, rating: ReviewRating) => {
      e.stopPropagation();
      e.preventDefault();
      onReview?.(rating);
    },
    [onReview]
  );

  return (
    <div
      className="card-perspective w-full max-w-md mx-auto cursor-pointer select-none card-slide-enter"
      style={{ height: 420 }}
      onClick={handleFlip}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* ---- 正面 ---- */}
        <div className="card-face bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center px-10 py-12">
          <button
            onClick={handleSpeak}
            onTouchEnd={handleSpeak}
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-[#F7F6F2] active:bg-[#EDECE6] active:scale-95"
            aria-label="播放发音"
          >
            <Volume2 className="w-5 h-5 text-[#7A9586]" />
          </button>

          <span className="text-5xl font-semibold tracking-tight text-[#333]">
            {data.word}
          </span>
          <span className="mt-4 text-lg text-[#B0ADA6] font-light tracking-wide">
            {data.phonetic}
          </span>

          <span className="absolute bottom-6 text-xs text-[#CCC9C1] tracking-widest">
            点击翻转 · 左右滑动切换
          </span>
        </div>

        {/* ---- 背面 ---- */}
        <div className="card-face card-back bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col px-8 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-7">
          {data.category && (
            <span className="self-start px-3 py-1 rounded-full text-[10px] font-medium tracking-wide bg-[#F2F1ED] text-[#B0ADA6] mb-2">
              {data.category}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333]">
            {data.translation}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#999] mt-2">
            {data.tech_context}
          </p>

          <div className="w-full mt-3 rounded-xl bg-[#F7F6F2] px-4 py-2.5 overflow-x-auto sm:px-5 sm:py-3">
            <code className="text-xs sm:text-sm font-mono text-[#7A9586] whitespace-pre-wrap break-all">
              {data.code_example}
            </code>
          </div>

          {/* 间隔重复评分按钮 */}
          <div className="mt-auto pt-4 flex items-center gap-3">
            <button
              onClick={(e) => handleReviewClick(e, "again")}
              onTouchEnd={(e) => handleReviewClick(e, "again")}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 bg-[#F5E6E0] text-[#C4867A] hover:bg-[#F0DDD6]"
            >
              忘记
            </button>
            <button
              onClick={(e) => handleReviewClick(e, "hard")}
              onTouchEnd={(e) => handleReviewClick(e, "hard")}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 bg-[#F2EDE0] text-[#B5A47A] hover:bg-[#EDE7D8]"
            >
              模糊
            </button>
            <button
              onClick={(e) => handleReviewClick(e, "easy")}
              onTouchEnd={(e) => handleReviewClick(e, "easy")}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 bg-[#E0EEEA] text-[#7A9586] hover:bg-[#D5E8E2]"
            >
              认识
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

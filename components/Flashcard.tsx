"use client";

import { useState, useCallback, useRef } from "react";
import { Volume2 } from "lucide-react";

interface FlashcardData {
  word: string;
  phonetic: string;
  translation: string;
  tech_context: string;
  code_example: string;
}

interface FlashcardProps {
  data: FlashcardData;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

/* 滑动识别的最小距离阈值（px） */
const SWIPE_THRESHOLD = 60;

export default function Flashcard({
  data,
  onSwipeLeft,
  onSwipeRight,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  /* 触摸追踪 */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isSwiping = useRef(false);

  const handleFlip = useCallback(() => {
    if (isSwiping.current) return;
    setIsFlipped((prev) => !prev);
  }, []);

  /* 调用浏览器原生 Web Speech API 播放美式发音 */
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

  /* 触摸开始 - 记录起始点 */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    isSwiping.current = false;
  }, []);

  /* 触摸结束 - 判断滑动方向 */
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;

      /* 水平滑动距离超过阈值且水平分量大于垂直分量 → 识别为左右滑动 */
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        isSwiping.current = true;
        if (dx < 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }

      touchStart.current = null;
    },
    [onSwipeLeft, onSwipeRight]
  );

  return (
    <div
      className="card-perspective w-full max-w-md mx-auto cursor-pointer select-none card-slide-enter"
      style={{ height: 360 }}
      onClick={handleFlip}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* ---- 正面：英文单词 + 音标 + 发音按钮 ---- */}
        <div className="card-face bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center px-10 py-12">
          {/* 右上角发音按钮 - 增大触控区域到 44x44 以符合移动端最小点击规范 */}
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

        {/* ---- 背面：中文释义 + 技术语境 + 代码示例 ---- */}
        <div className="card-face card-back bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col items-start justify-center px-8 py-10 gap-4 sm:px-10 sm:py-12 sm:gap-5">
          <h2 className="text-3xl font-semibold text-[#333]">
            {data.translation}
          </h2>

          <p className="text-base leading-relaxed text-[#999] mt-1">
            {data.tech_context}
          </p>

          <div className="w-full mt-2 rounded-xl bg-[#F7F6F2] px-4 py-3 overflow-x-auto sm:px-5 sm:py-4">
            <code className="text-sm font-mono text-[#7A9586] whitespace-pre-wrap break-all">
              {data.code_example}
            </code>
          </div>

          <span className="absolute bottom-6 left-0 right-0 text-center text-xs text-[#CCC9C1] tracking-widest">
            点击翻回 · 左右滑动切换
          </span>
        </div>
      </div>
    </div>
  );
}

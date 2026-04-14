import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* vocabulary 表的行类型定义（含间隔重复字段） */
export interface VocabularyRow {
  id: number;
  word: string;
  phonetic: string;
  category: string;
  translation: string;
  tech_context: string;
  code_example: string;
  interval: number;
  ease_factor: number;
  next_review: string;
  review_count: number;
}

/* 复习评分等级 */
export type ReviewRating = "again" | "hard" | "easy";

/* 间隔重复算法计算结果 */
export interface ReviewUpdate {
  interval: number;
  ease_factor: number;
  next_review: string;
  review_count: number;
}

/**
 * 基于 SM-2 变体的间隔重复算法
 * @param rating    用户评分：again / hard / easy
 * @param current   当前单词的复习参数
 */
export function calculateReview(
  rating: ReviewRating,
  current: { interval: number; ease_factor: number; review_count: number }
): ReviewUpdate {
  let { interval, ease_factor, review_count } = current;
  const now = new Date();

  switch (rating) {
    case "again":
      interval = 0;
      ease_factor = Math.max(1.3, ease_factor - 0.2);
      break;

    case "hard":
      interval = Math.max(1, Math.round(interval * 1.2));
      ease_factor = Math.max(1.3, ease_factor - 0.15);
      break;

    case "easy":
      if (review_count === 0 || interval === 0) {
        interval = 1;
      } else {
        interval = Math.round(interval * ease_factor);
      }
      ease_factor += 0.1;
      break;
  }

  /* next_review = 当前时间 + interval 天 */
  const next = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    interval,
    ease_factor: Math.round(ease_factor * 100) / 100,
    next_review: next.toISOString(),
    review_count: review_count + 1,
  };
}

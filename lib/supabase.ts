import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* 单例 Supabase 客户端，服务端和客户端均可使用 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* vocabulary 表的行类型定义 */
export interface VocabularyRow {
  id: number;
  word: string;
  phonetic: string;
  translation: string;
  tech_context: string;
  code_example: string;
}

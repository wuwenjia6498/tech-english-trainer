"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { X, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { supabase, type VocabularyRow } from "@/lib/supabase";

interface AddWordModalProps {
  open: boolean;
  onClose: () => void;
  onWordAdded: (word: VocabularyRow) => void;
  existingWords: VocabularyRow[];
}

export default function AddWordModal({
  open,
  onClose,
  onWordAdded,
  existingWords,
}: AddWordModalProps) {
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [category, setCategory] = useState("");
  const [translation, setTranslation] = useState("");
  const [techContext, setTechContext] = useState("");
  const [codeExample, setCodeExample] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* 构建已有单词的小写 Set，用于 O(1) 查重 */
  const existingWordSet = useMemo(
    () => new Set(existingWords.map((w) => w.word.toLowerCase().trim())),
    [existingWords]
  );

  /* 实时判断当前输入是否重复 */
  const isDuplicate = useMemo(() => {
    const trimmed = word.trim().toLowerCase();
    return trimmed.length > 0 && existingWordSet.has(trimmed);
  }, [word, existingWordSet]);

  useEffect(() => {
    if (!open) {
      setWord("");
      setPhonetic("");
      setCategory("");
      setTranslation("");
      setTechContext("");
      setCodeExample("");
      setIsGenerating(false);
      setIsSaving(false);
      setGenerated(false);
      setErrorMsg("");
    }
  }, [open]);

  useEffect(() => {
    if (!errorMsg) return;
    const timer = setTimeout(() => setErrorMsg(""), 4000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleGenerate = useCallback(async () => {
    if (!word.trim() || isDuplicate) return;
    setIsGenerating(true);
    setGenerated(false);
    setErrorMsg("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: word.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "生成失败，请重试");
        return;
      }

      setPhonetic(data.phonetic);
      setCategory(data.category || "");
      setTranslation(data.translation);
      setTechContext(data.tech_context);
      setCodeExample(data.code_example);
      setGenerated(true);
    } catch {
      setErrorMsg("网络连接失败，请检查网络后重试");
    } finally {
      setIsGenerating(false);
    }
  }, [word, isDuplicate]);

  const handleSave = useCallback(async () => {
    if (!word.trim() || !generated) return;
    setIsSaving(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("vocabulary")
      .insert({
        word: word.trim(),
        phonetic,
        category,
        translation,
        tech_context: techContext,
        code_example: codeExample,
      })
      .select()
      .single();

    setIsSaving(false);

    if (error) {
      /* 捕获 Supabase UNIQUE 约束冲突（PostgreSQL error code 23505） */
      const isUniqueViolation =
        error.code === "23505" || error.message?.includes("duplicate");
      setErrorMsg(
        isUniqueViolation
          ? "该单词已存在于词库中，无法重复添加"
          : "保存失败，请重试"
      );
      return;
    }

    if (data) {
      onWordAdded(data as VocabularyRow);
      onClose();
    }
  }, [word, phonetic, category, translation, techContext, codeExample, generated, onWordAdded, onClose]);

  if (!open) return null;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-[#F7F6F2] border border-[#E8E6E0] text-sm text-[#333] placeholder:text-[#C5C2BA] outline-none transition-all focus:border-[#7A9586] focus:shadow-[0_0_0_3px_rgba(122,149,134,0.1)]";

  /* AI 生成按钮是否禁用 */
  const generateDisabled = !word.trim() || isDuplicate || isGenerating;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_-4px_40px_rgba(0,0,0,0.1)] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#333]">添加新词</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F6F2] transition-colors"
            aria-label="关闭"
          >
            <X className="w-4 h-4 text-[#B0ADA6]" />
          </button>
        </div>

        {/* 错误提示 Toast */}
        {errorMsg && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-500 animate-[fadeIn_0.2s_ease-out]">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 单词输入 + AI 生成按钮 */}
        <div className="flex gap-3 mb-1">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="输入英文单词"
            className={`${inputClass} flex-1 ${isDuplicate ? "border-[#D4A9A3] focus:border-[#D4A9A3] focus:shadow-[0_0_0_3px_rgba(212,169,163,0.15)]" : ""}`}
            onKeyDown={(e) => e.key === "Enter" && !generateDisabled && handleGenerate()}
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerate}
            disabled={generateDisabled}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7A9586] text-white text-sm font-medium transition-all duration-300 hover:bg-[#6B8575] active:scale-95 disabled:bg-[#C5C2BA] disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            AI 生成
          </button>
        </div>

        {/* 重复词警示 — 平滑淡入淡出 */}
        <div
          className={`overflow-hidden transition-all duration-300 ${isDuplicate ? "max-h-8 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"}`}
        >
          <p className="text-xs text-[#C4867A] mt-1.5 pl-1">
            词库中已有此词，请勿重复录入
          </p>
        </div>

        {/* 无重复时的正常间距 */}
        {!isDuplicate && <div className="mb-4" />}

        {/* AI 生成中的状态 */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-8 text-[#B0ADA6]">
            <Loader2 className="w-8 h-8 animate-spin text-[#7A9586] mb-3" />
            <p className="text-sm">AI 正在分析单词...</p>
          </div>
        )}

        {/* 生成完成后显示可编辑的字段 */}
        {generated && !isGenerating && (
          <div className="space-y-3 mb-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-[#B0ADA6] mb-1.5">音标</label>
                <input
                  type="text"
                  value={phonetic}
                  onChange={(e) => setPhonetic(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-[#B0ADA6] mb-1.5">分类</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#B0ADA6] mb-1.5">中文释义</label>
              <input
                type="text"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-[#B0ADA6] mb-1.5">技术语境</label>
              <textarea
                value={techContext}
                onChange={(e) => setTechContext(e.target.value)}
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className="block text-xs text-[#B0ADA6] mb-1.5">代码示例</label>
              <textarea
                value={codeExample}
                onChange={(e) => setCodeExample(e.target.value)}
                rows={2}
                className={`${inputClass} resize-none font-mono`}
              />
            </div>
          </div>
        )}

        {/* 保存按钮 */}
        {generated && !isGenerating && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3 rounded-2xl bg-[#7A9586] text-white text-sm font-medium transition-all hover:bg-[#6B8575] active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                保存中...
              </span>
            ) : (
              "保存到词库"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { supabase, type VocabularyRow } from "@/lib/supabase";

interface EditWordModalProps {
  open: boolean;
  word: VocabularyRow | null;
  onClose: () => void;
  onUpdated: (updated: VocabularyRow) => void;
  onDeleted: (id: number) => void;
}

export default function EditWordModal({
  open,
  word,
  onClose,
  onUpdated,
  onDeleted,
}: EditWordModalProps) {
  const [phonetic, setPhonetic] = useState("");
  const [category, setCategory] = useState("");
  const [translation, setTranslation] = useState("");
  const [techContext, setTechContext] = useState("");
  const [codeExample, setCodeExample] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* 打开时用当前词填充表单 */
  useEffect(() => {
    if (open && word) {
      setPhonetic(word.phonetic ?? "");
      setCategory(word.category ?? "");
      setTranslation(word.translation ?? "");
      setTechContext(word.tech_context ?? "");
      setCodeExample(word.code_example ?? "");
      setIsSaving(false);
      setIsDeleting(false);
      setConfirmDelete(false);
      setErrorMsg("");
    }
  }, [open, word]);

  useEffect(() => {
    if (!errorMsg) return;
    const timer = setTimeout(() => setErrorMsg(""), 4000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleSave = useCallback(async () => {
    if (!word) return;
    setIsSaving(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("vocabulary")
      .update({
        phonetic,
        category,
        translation,
        tech_context: techContext,
        code_example: codeExample,
      })
      .eq("id", word.id)
      .select()
      .single();

    setIsSaving(false);

    if (error) {
      setErrorMsg("保存失败，请重试");
      return;
    }

    if (data) {
      onUpdated(data as VocabularyRow);
      onClose();
    }
  }, [word, phonetic, category, translation, techContext, codeExample, onUpdated, onClose]);

  const handleDelete = useCallback(async () => {
    if (!word) return;

    /* 第一次点击：显示确认状态 */
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    /* 第二次点击：执行删除 */
    setIsDeleting(true);
    setErrorMsg("");

    const { error } = await supabase
      .from("vocabulary")
      .delete()
      .eq("id", word.id);

    setIsDeleting(false);

    if (error) {
      setErrorMsg("删除失败，请重试");
      setConfirmDelete(false);
      return;
    }

    onDeleted(word.id);
    onClose();
  }, [word, confirmDelete, onDeleted, onClose]);

  if (!open || !word) return null;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-[#F7F6F2] border border-[#E8E6E0] text-sm text-[#333] placeholder:text-[#C5C2BA] outline-none transition-all focus:border-[#7A9586] focus:shadow-[0_0_0_3px_rgba(122,149,134,0.1)]";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_-4px_40px_rgba(0,0,0,0.1)] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">{word.word}</h2>
            <p className="text-xs text-[#B0ADA6] mt-0.5">编辑词汇</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F6F2] transition-colors"
            aria-label="关闭"
          >
            <X className="w-4 h-4 text-[#B0ADA6]" />
          </button>
        </div>

        {/* 错误提示 */}
        {errorMsg && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-500 animate-[fadeIn_0.2s_ease-out]">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 可编辑字段 */}
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
              rows={3}
              className={`${inputClass} resize-none font-mono`}
            />
          </div>
        </div>

        {/* 操作按钮：保存 + 删除 */}
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
              confirmDelete
                ? "bg-[#E8B4B0] text-white hover:bg-[#D9A09B]"
                : "bg-[#F5E6E0] text-[#C4867A] hover:bg-[#F0DDD6]"
            }`}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {confirmDelete ? "确认删除" : "删除"}
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 py-3 rounded-2xl bg-[#7A9586] text-white text-sm font-medium transition-all hover:bg-[#6B8575] active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                保存中...
              </span>
            ) : (
              "保存修改"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

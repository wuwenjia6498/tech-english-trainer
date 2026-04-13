"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5C2BA] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索单词或释义..."
        className="w-full h-11 pl-11 pr-10 rounded-2xl bg-white border border-[#E8E6E0] text-sm text-[#333] placeholder:text-[#C5C2BA] outline-none transition-all focus:border-[#7A9586] focus:shadow-[0_0_0_3px_rgba(122,149,134,0.1)]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#F7F6F2] transition-colors"
          aria-label="清除搜索"
        >
          <X className="w-3.5 h-3.5 text-[#B0ADA6]" />
        </button>
      )}
    </div>
  );
}

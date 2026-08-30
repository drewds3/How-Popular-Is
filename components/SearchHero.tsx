import { Search, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type SearchHeroProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: (query?: string) => void;
  history: string[];
  loading: boolean;
};

export default function SearchHero({
  searchTerm,
  setSearchTerm,
  onSearch,
  history,
  loading,
}: SearchHeroProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (!searchTerm.trim() || loading) return;
    setShowHistory(false);
    onSearch();
  };

  const allowHoverEffect = !isFocused && !loading;

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center overflow-hidden rounded-full border border-line bg-surface shadow-sm transition-all duration-300 ${
          allowHoverEffect ? "hover:border-accent hover:shadow-[0_0_0_4px_rgba(166,50,30,0.12)]" : ""
        }`}
      >
        <div className="pl-6 text-ink-muted">
          <Search size={22} />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Escribe una palabra o frase"
          className="flex-1 bg-transparent px-4 py-5 text-lg text-ink placeholder:text-ink-muted outline-none"
          onFocus={() => {
            setShowHistory(true);
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        />

        <button
          onClick={handleSubmit}
          disabled={!searchTerm.trim() || loading}
          className="flex items-center gap-2 self-stretch px-8 font-semibold text-white bg-accent transition hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Analizando...
            </>
          ) : (
            <>
              <Zap size={18} />
              Analizar
            </>
          )}
        </button>
      </div>

      {showHistory && history.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl z-50">
          {history.map((item, index) => (
            <button
              key={index}
              onMouseDown={() => {
                setSearchTerm(item);
                setShowHistory(false);
                onSearch(item);
              }}
              className="w-full px-4 py-3 text-left text-ink-soft hover:bg-cream"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
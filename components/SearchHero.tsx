import { Search, Zap} from "lucide-react";

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
  loading
}: SearchHeroProps) {
  
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowHistory(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div 
      ref={searchRef}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center overflow-hidden rounded-full border border-slate-700 bg-[#111827] shadow-lg">

        <div className="pl-6 text-slate-500">
          <Search size={22} />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Escribe una palabra o frase"
          className="
            flex-1
            bg-transparent
            px-4
            py-0
            text-lg
            text-white
            placeholder:text-slate-500
            outline-none
          "
          onFocus={() => setShowHistory(true)}
        />

        <div className="h-10 w-px bg-slate-700" />

        <button
          onClick={() => onSearch()}
          disabled={!searchTerm.trim() || loading}
          className="
            flex
            items-center
            gap-2
            px-8
            py-5
            font-semibold
            text-white
            transition
            hover:bg-white/5
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
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
        <div
          className="
            absolute
            left-0
            right-0
            mt-2
            overflow-hidden
            rounded-2xl
            border
            border-slate-700
            bg-[#111827]
            shadow-xl
            z-50
          "
        >
          {history.map((item, index) => (
            <button
              key={index}
              onMouseDown={() => {
                setSearchTerm(item);
                setShowHistory(false);
                onSearch(item);
              }}
              className="
                w-full
                px-4
                py-3
                text-left
                text-slate-300
                hover:bg-slate-800
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
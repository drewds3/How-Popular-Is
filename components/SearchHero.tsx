import { Search, Zap} from "lucide-react";

type SearchHeroProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
};

export default function SearchHero({
  searchTerm,
  setSearchTerm,
  onSearch,
}: SearchHeroProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
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
        />

        <div className="h-10 w-px bg-slate-700" />

        <button
          onClick={onSearch}
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
          "
        >
          <Zap size={18} />
          Analizar
        </button>

      </div>
    </div>
  );
}
import React, { useEffect, useRef } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface TimelineSliderProps {
  selectedDecade: number;
  setSelectedDecade: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const DECADES = [1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

const DECADE_LABELS: Record<number, { title: string; desc: string }> = {
  1890: { title: "拉格泰姆", desc: "刚果广场与切分节奏" },
  1900: { title: "传统爵士", desc: "新奥尔良小号吹奏起航" },
  1910: { title: "大迁徙潮", desc: "沿密西西比河北上芝加哥" },
  1920: { title: "摇摆乐破晓", desc: "哈林文艺复兴，大乐团舞会" },
  1930: { title: "堪萨斯风暴", desc: "深夜即兴与高超独奏" },
  1940: { title: "咆哮革命", desc: "52街小酒馆的极速波普" },
  1950: { title: "冷爵士/Bossa", desc: "西海岸的理性与伊帕内玛海浪" },
  1960: { title: "调式与自由", desc: "打破和弦壁垒，精神求道" },
  1970: { title: "插电融合", desc: "迷幻插电，爵士与摇滚越界" },
  1980: { title: "传统重燃", desc: "新古典重燃，Blue Note 黄金现场" },
  1990: { title: "电子与跨界", desc: "酸爵士、北欧极简美学兴起" },
  2000: { title: "多元全球化", desc: "东方与西方多重根源的重组" },
  2010: { title: "伦敦新浪潮", desc: "Afrobeats与前卫电子的融合" },
  2020: { title: "无疆边界", desc: "数字时代的音乐无国界探索" },
};

export default function TimelineSlider({
  selectedDecade,
  setSelectedDecade,
  isPlaying,
  setIsPlaying,
}: TimelineSliderProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play chronologue cycle
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSelectedDecade((prev) => {
          const currentIndex = DECADES.indexOf(prev);
          if (currentIndex === DECADES.length - 1) {
            // Loop back to start
            return DECADES[0];
          }
          return DECADES[currentIndex + 1];
        });
      }, 4000); // Shift every 4 seconds to allow beautiful viewing
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, setSelectedDecade]);

  const handlePrev = () => {
    const currentIndex = DECADES.indexOf(selectedDecade);
    if (currentIndex > 0) {
      setSelectedDecade(DECADES[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = DECADES.indexOf(selectedDecade);
    if (currentIndex < DECADES.length - 1) {
      setSelectedDecade(DECADES[currentIndex + 1]);
    }
  };

  return (
    <div className="w-full bg-[#121212] border border-[#C9A227]/20 rounded-xl p-5 md:p-6 shadow-2xl text-left relative overflow-hidden backdrop-blur-sm">
      
      {/* Absolute vintage control metal finish background hint */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
              isPlaying
                ? "bg-[#C9A227] text-[#08080a] border-[#C9A227] shadow-[0_0_12px_rgba(201,162,39,0.3)]"
                : "bg-[#121212] text-zinc-300 border-[#C9A227]/20 hover:border-[#C9A227] hover:text-[#C9A227]"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>
          
          <div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
              <h3 className="text-sm font-mono font-bold text-white tracking-wide">
                爵士年代调谐器 (Jazz Era Tuner)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              拖动或播放以观察半个多世纪以来爵士乐从新奥尔良蔓延至全球的轨迹
            </p>
          </div>
        </div>

        {/* Selected Decade Focus Badge */}
        <div className="flex items-center gap-2 md:self-center">
          <button
            onClick={handlePrev}
            disabled={DECADES.indexOf(selectedDecade) === 0}
            className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="bg-[#0B0B0B] border border-[#C9A227]/25 px-4 py-1.5 rounded-lg text-center min-w-[120px]">
            <span className="block text-2xl font-serif font-black text-[#C9A227] leading-none">
              {selectedDecade}s
            </span>
            <span className="block text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-wider font-bold truncate max-w-[100px]">
              {DECADE_LABELS[selectedDecade]?.title || "流派破晓"}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={DECADES.indexOf(selectedDecade) === DECADES.length - 1}
            className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TIMELINE SLIDER TRACK */}
      <div className="relative pt-2 pb-6 px-4">
        
        {/* Horizontal Line Grid */}
        <div className="absolute top-5 inset-x-8 h-[2px] bg-[#C9A227]/10 rounded-full"></div>
        <div
          className="absolute top-5 left-8 h-[2px] bg-[#C9A227]/60 transition-all duration-300 rounded-full animate-pulse"
          style={{
            width: `${(DECADES.indexOf(selectedDecade) / (DECADES.length - 1)) * 90}%`,
          }}
        ></div>

        {/* Interactive ticks */}
        <div className="relative flex justify-between">
          {DECADES.map((dec, idx) => {
            const isSelected = selectedDecade === dec;
            const percentage = (idx / (DECADES.length - 1)) * 100;
            
            return (
              <div
                key={dec}
                className="flex flex-col items-center group relative cursor-pointer"
                onClick={() => {
                  setSelectedDecade(dec);
                  setIsPlaying(false); // Stop playing when manual selecting
                }}
              >
                {/* Pointer Node */}
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 relative z-10 ${
                    isSelected
                      ? "bg-[#C9A227] border-[#C9A227] scale-125 shadow-[0_0_8px_#C9A227]"
                      : "bg-[#0B0B0B] border-[#C9A227]/30 hover:border-[#C9A227] hover:scale-110"
                  }`}
                  style={{ top: "-5px" }}
                >
                  {/* Subtle pulsing core */}
                  {isSelected && (
                    <span className="absolute inset-0 rounded-full bg-[#C9A227] animate-ping opacity-40"></span>
                  )}
                </div>

                {/* Vertical slider scale mark */}
                <div className="w-[1px] h-2 bg-[#C9A227]/20 group-hover:bg-[#C9A227]/50 mt-1"></div>

                {/* Year display and mini subtitle */}
                <div className="mt-1 text-center select-none">
                  <span
                    className={`block font-mono text-[10px] md:text-xs font-semibold ${
                      isSelected ? "text-[#C9A227] font-bold scale-105" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {dec}
                  </span>
                  
                  {/* Floating label details on hover/selected */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#121212] border border-[#C9A227]/30 p-2 rounded-lg text-left shadow-2xl w-40 z-30 pointer-events-none transition-all duration-200 hidden md:group-hover:block ${
                      isSelected ? "border-[#C9A227]/50" : ""
                    }`}
                  >
                    <h5 className="text-[10px] font-bold text-[#C9A227] font-mono">
                      {dec}s: {DECADE_LABELS[dec]?.title}
                    </h5>
                    <p className="text-[9px] text-zinc-400 mt-0.5 leading-tight font-sans">
                      {DECADE_LABELS[dec]?.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE EXPANDED CARD SUMMARY FOR CURRENT ERA */}
      <div className="mt-2 bg-[#0B0B0B] border border-[#C9A227]/10 rounded-lg p-3.5 md:hidden">
        <h4 className="text-xs font-mono font-bold text-[#C9A227] flex items-center gap-1">
          <span>● Era Feature:</span>
          <span>{DECADE_LABELS[selectedDecade]?.title}</span>
        </h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed mt-1 font-sans">
          {DECADE_LABELS[selectedDecade]?.desc}
        </p>
      </div>
    </div>
  );
}

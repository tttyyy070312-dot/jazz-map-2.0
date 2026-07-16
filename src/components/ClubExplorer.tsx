import React, { useState } from "react";
import { Landmark, MapPin, Calendar, Users, FileText, Compass, Sparkles } from "lucide-react";
import { Club, clubs, cities } from "../data/jazzData";

interface ClubExplorerProps {
  onSelectCityId: (id: string) => void;
  activeCityId: string | null;
  selectedClubId: string;
  setSelectedClubId: (id: string) => void;
}

export default function ClubExplorer({
  onSelectCityId,
  activeCityId,
  selectedClubId,
  setSelectedClubId,
}: ClubExplorerProps) {

  // Find active club object
  const activeClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];

  // Find associated city
  const associatedCity = cities.find((city) => city.id === activeClub.cityId);

  return (
    <div className="w-full bg-[#121212] border border-[#C9A227]/20 rounded-xl p-5 md:p-6 shadow-2xl text-left relative overflow-hidden backdrop-blur-sm">
      
      {/* Absolute vintage neon golden dot accent */}
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-ping"></div>

      <div className="border-b border-[#C9A227]/10 pb-4 mb-6">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Historic Listening Rooms</span>
        </span>
        <h3 className="text-xl serif font-bold text-white mt-1">
          传奇爵士酒吧与俱乐部 (Historic Jazz Clubs)
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">
          探寻那些改变和声历史、灌录不朽现场专辑的传奇烟熏地下室
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* POSTCARD MARQUEE LIST (LEFT 5 COLS) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {clubs.map((club) => {
            const isSelected = selectedClubId === club.id;
            const clubCity = cities.find((c) => c.id === club.cityId);

            return (
              <button
                key={club.id}
                onClick={() => setSelectedClubId(club.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all duration-300 relative group flex justify-between items-center cursor-pointer ${
                  isSelected
                    ? "bg-[#1c1810]/40 border-[#C9A227] shadow-[0_4px_20px_rgba(201,162,39,0.06)]"
                    : "bg-[#0B0B0B] border-[#C9A227]/10 hover:border-[#C9A227]/30"
                }`}
              >
                {/* Visual marker inside active items */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A227] rounded-l-lg" />
                )}

                <div>
                  <h4
                    className={`text-xs font-sans font-extrabold ${
                      isSelected ? "text-[#C9A227]" : "text-zinc-300 group-hover:text-white"
                    }`}
                  >
                    {club.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mt-1">
                    <MapPin className="w-2.5 h-2.5 text-[#C9A227]/60" />
                    <span>
                      {club.chineseName} · {clubCity?.chineseName}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-[#C9A227]/10 text-zinc-400 font-semibold uppercase">
                    Since {club.openedYear}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* NEON DETAILS SHEET (RIGHT 7 COLS) */}
        <div className="lg:col-span-7 bg-[#0B0B0B] rounded-xl border border-[#C9A227]/10 p-5 min-h-[350px] flex flex-col justify-between relative shadow-lg">
          
          {/* Subtle architectural frame accent */}
          <div className="absolute top-3 left-3 bottom-3 right-3 border border-dashed border-[#C9A227]/10 pointer-events-none rounded"></div>

          <div className="space-y-4 relative z-10">
            
            {/* Header info sheet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900/60 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#C9A227] tracking-wider uppercase font-bold">
                  {activeClub.chineseName}
                </span>
                <h4 className="text-lg font-serif font-black text-white tracking-tight mt-0.5">
                  {activeClub.name}
                </h4>
              </div>

              <div className="flex gap-2 shrink-0">
                <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                  创建: <strong className="text-[#C9A227]">{activeClub.openedYear}年</strong>
                </span>
                <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                  状态: <strong className="text-emerald-500">{activeClub.closedYear === "present" ? "运营中" : `${activeClub.closedYear}年停业`}</strong>
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-1.5 text-xs text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-[#C9A227]/80 shrink-0 mt-0.5" />
              <span className="font-sans leading-normal">
                {activeClub.address}
              </span>
            </div>

            {/* Performers */}
            <div className="space-y-1.5 pt-1">
              <h5 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <Users className="w-3 h-3 text-[#C9A227]" />
                <span>常驻与不朽登台大师 (Legendary Stages)</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {activeClub.famousPerformers.map((performer, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] font-sans font-bold bg-zinc-900/60 border border-zinc-800/80 hover:border-[#C9A227]/30 text-zinc-300 hover:text-white px-2.5 py-1 rounded transition-colors"
                  >
                    {performer}
                  </span>
                ))}
              </div>
            </div>

            {/* Archival History */}
            <div className="space-y-1.5 pt-2">
              <h5 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>会所历史记叙 (Archival Record)</span>
              </h5>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {activeClub.history}
              </p>
            </div>
          </div>

          {/* Action button to center on map */}
          {associatedCity && (
            <div className="mt-6 pt-3 border-t border-zinc-900/60 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1 font-mono">
                <Compass className="w-3.5 h-3.5 text-[#C9A227]/70" />
                <span>所处地：{associatedCity.chineseName} ({associatedCity.country})</span>
              </span>
              
              <button
                onClick={() => onSelectCityId(activeClub.cityId)}
                className="flex items-center gap-1 text-[#C9A227] font-sans font-extrabold hover:text-white transition-colors cursor-pointer"
              >
                <span>在地图上探索该城市</span>
                <span className="text-xs">➔</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

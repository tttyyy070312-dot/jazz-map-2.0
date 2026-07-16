import React from "react";
import { motion } from "motion/react";
import { Users, Sparkles, User, RefreshCw, Disc, ArrowLeftRight, ChevronRight, Play, Pause, ListMusic, GitCommit } from "lucide-react";
import { Musician, musicians } from "../data/jazzData";

interface MusicianNetworkProps {
  selectedMusicianId: string;
  onSelectMusician: (id: string) => void;
  onPlayTrack?: (trackId: string) => void;
  currentPlayingTrackId?: string;
  isPlaying?: boolean;
}

interface PlaylistTrack {
  generationLabel: string;
  relationLabel: string;
  musician: Musician;
  trackId: string;
  trackTitle: string;
  trackChineseTitle: string;
  colorClass: string;
}

// Helper to get matching classic track for any musician
export const getMusicianTrackId = (musicianId: string): string => {
  switch (musicianId) {
    case "louis-armstrong":
    case "king-oliver":
    case "jelly-roll-morton":
    case "sidney-bechet":
      return "west-end-blues";
    case "duke-ellington":
    case "count-basie":
    case "coleman-hawkins":
      return "take-the-a-train";
    case "charlie-parker":
    case "dizzy-gillespie":
    case "thelonious-monk":
      return "ornithology";
    case "dave-brubeck":
    case "chet-baker":
    case "gerry-mulligan":
      return "take-five";
    case "miles-davis":
    case "john-coltrane":
    case "bill-evans":
      return "so-what";
    case "antonio-carlos-jobim":
    case "joao-gilberto":
    case "stan-getz":
      return "girl-from-ipanema";
    case "toshiko-akiyoshi":
    case "ryo-fukui":
      return "chameleon";
    case "shabaka-hutchings":
    case "courtney-pine":
    case "tubby-hayes":
    default:
      return "strasbourg-st-denis";
  }
};

const TRACK_DETAILS: Record<string, { title: string; chineseTitle: string }> = {
  "west-end-blues": { title: "West End Blues", chineseTitle: "西区布鲁斯" },
  "take-the-a-train": { title: "Take the 'A' Train", chineseTitle: "搭乘A号列车" },
  "ornithology": { title: "Ornithology", chineseTitle: "鸟类学" },
  "take-five": { title: "Take Five", chineseTitle: "休息五分钟" },
  "so-what": { title: "So What", chineseTitle: "那又怎样" },
  "girl-from-ipanema": { title: "The Girl from Ipanema", chineseTitle: "伊帕内玛姑娘" },
  "chameleon": { title: "Chameleon", chineseTitle: "变色龙" },
  "strasbourg-st-denis": { title: "Strasbourg / St. Denis", chineseTitle: "斯特拉斯堡-圣丹尼斯" },
};

export default function MusicianNetwork({
  selectedMusicianId,
  onSelectMusician,
  onPlayTrack,
  currentPlayingTrackId,
  isPlaying = false,
}: MusicianNetworkProps) {
  
  // Find the selected musician
  const currentArtist = musicians.find((m) => m.id === selectedMusicianId) || musicians[0];

  // 1. DYNAMIC GRAPH QUERY: Resolve related nodes
  // Predecessors: Artists currentArtist is influenced by
  const predecessors = musicians.filter((m) => currentArtist.influencedBy.includes(m.id));

  // Peers: Artists currentArtist collaborated with
  const peers = musicians.filter((m) => currentArtist.collaborators.includes(m.id));

  // Successors: Computed dynamically! Artists in database who are influenced by currentArtist
  const successors = musicians.filter((m) => m.influencedBy.includes(currentArtist.id));

  // Handle clicking a node to traverse the web
  const handleNodeClick = (id: string) => {
    onSelectMusician(id);
  };

  // 2. DYNAMIC GENERATIONAL LINEAGE PLAYLIST SOLVER
  const getLineagePlaylist = (): PlaylistTrack[] => {
    const list: PlaylistTrack[] = [];
    const usedTrackIds = new Set<string>();

    // A. Generation 1: Predecessor (师承先驱)
    let predObj = predecessors[0];
    if (!predObj) {
      predObj = musicians.find(m => m.id !== currentArtist.id && m.birthYear < currentArtist.birthYear) || musicians[0];
    }
    if (predObj && predObj.id !== currentArtist.id) {
      const trackId = getMusicianTrackId(predObj.id);
      const details = TRACK_DETAILS[trackId];
      list.push({
        generationLabel: "第一代 · 启蒙承继",
        relationLabel: "前驱指引",
        musician: predObj,
        trackId,
        trackTitle: details?.title || "Classic Track",
        trackChineseTitle: details?.chineseTitle || "经典先声",
        colorClass: "border-sky-500/20 text-sky-400 bg-sky-500/5 hover:border-sky-500/40"
      });
      usedTrackIds.add(trackId);
    }

    // B. Generation 2: Self (时代中坚)
    const selfTrackId = getMusicianTrackId(currentArtist.id);
    const selfDetails = TRACK_DETAILS[selfTrackId];
    list.push({
      generationLabel: "第二代 · 时代中坚",
      relationLabel: "核心代表作",
      musician: currentArtist,
      trackId: selfTrackId,
      trackTitle: selfDetails?.title || "Signature Standard",
      trackChineseTitle: selfDetails?.chineseTitle || "黄金丰碑",
      colorClass: "border-[#C9A227]/30 text-[#C9A227] bg-[#C9A227]/5 hover:border-[#C9A227]/50"
    });
    usedTrackIds.add(selfTrackId);

    // C. Generation 3: Peer/Collaborator (同侪共鸣)
    let peerObj = peers.find(p => !usedTrackIds.has(getMusicianTrackId(p.id)));
    if (!peerObj) {
      peerObj = peers[0];
    }
    if (!peerObj) {
      peerObj = musicians.find(m => m.id !== currentArtist.id && !usedTrackIds.has(getMusicianTrackId(m.id)) && Math.abs(m.birthYear - currentArtist.birthYear) <= 10);
    }
    if (peerObj && peerObj.id !== currentArtist.id) {
      const trackId = getMusicianTrackId(peerObj.id);
      const details = TRACK_DETAILS[trackId];
      list.push({
        generationLabel: "第三代 · 同侪共鸣",
        relationLabel: "并肩探索",
        musician: peerObj,
        trackId,
        trackTitle: details?.title || "Collaboration Jam",
        trackChineseTitle: details?.chineseTitle || "传奇合奏",
        colorClass: "border-amber-500/20 text-amber-500 bg-amber-500/5 hover:border-amber-500/40"
      });
      usedTrackIds.add(trackId);
    }

    // D. Generation 4: Successor (薪火延续)
    let succObj = successors.find(s => !usedTrackIds.has(getMusicianTrackId(s.id)));
    if (!succObj) {
      succObj = successors[0];
    }
    if (!succObj) {
      succObj = musicians.find(m => m.id !== currentArtist.id && !usedTrackIds.has(getMusicianTrackId(m.id)) && m.birthYear > currentArtist.birthYear);
    }
    if (succObj && succObj.id !== currentArtist.id && !list.some(item => item.musician.id === succObj!.id)) {
      const trackId = getMusicianTrackId(succObj.id);
      const details = TRACK_DETAILS[trackId];
      list.push({
        generationLabel: "第四代 · 薪火延续",
        relationLabel: "未来回响",
        musician: succObj,
        trackId,
        trackTitle: details?.title || "Modern Standard",
        trackChineseTitle: details?.chineseTitle || "后生致敬",
        colorClass: "border-rose-500/20 text-rose-400 bg-rose-500/5 hover:border-rose-500/40"
      });
    }

    return list;
  };

  return (
    <div className="w-full bg-[#121212] border border-[#C9A227]/20 rounded-xl p-5 md:p-6 shadow-2xl text-left relative overflow-hidden backdrop-blur-sm">
      
      {/* Decorative vinyl grooves on background */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-[#C9A227]/5 opacity-10 pointer-events-none"></div>
      <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full border border-[#C9A227]/5 opacity-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C9A227]/10 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C9A227]" />
            <span>Jazz Galaxy Genealogy</span>
          </span>
          <h3 className="text-xl serif font-bold text-[#E0E0E0] mt-1">
            {currentArtist.chineseName}的传承网络
          </h3>
        </div>
        <p className="text-xs text-[#C9A227]/60 font-mono hidden lg:block">
          点击周边节点可在爵士星系中自由漫游 ✦
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* INTERACTIVE SVG GRAPH VISUALIZATION (LEFT 7 COLS) */}
        <div className="lg:col-span-7 bg-[#0B0B0B] rounded-xl border border-[#C9A227]/10 p-4 relative aspect-square max-h-[460px] flex items-center justify-center shadow-lg">
          
          {/* Subtle concentric orbit circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[82%] h-[82%] rounded-full border border-dashed border-[#C9A227]/10 opacity-30"></div>
            <div className="w-[50%] h-[50%] rounded-full border border-dashed border-[#C9A227]/15 opacity-40"></div>
          </div>

          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {/* Connecting Lines for Predecessors (Left Orbit) */}
            {predecessors.map((_, index) => {
              const total = predecessors.length;
              const angle = Math.PI - (index + 0.5) * (Math.PI / (total || 1)) + 0.2; // Left semicircle
              const x = 50 + Math.cos(angle) * 32;
              const y = 50 + Math.sin(angle) * 32;
              return (
                <g key={`line-pred-${index}`}>
                  <line x1="50" y1="50" x2={x} y2={y} stroke="#457B9D" strokeWidth="0.35" opacity="0.4" />
                  {/* Small arrow heads pointing to center */}
                  <polygon points="50,50 51.5,47.5 48.5,47.5" fill="#457B9D" opacity="0.5" transform={`rotate(${(angle * 180 / Math.PI) + 90}, 50, 50)`} />
                </g>
              );
            })}

            {/* Connecting Lines for Collaborators (Bottom/Orbit) */}
            {peers.map((_, index) => {
              const total = peers.length;
              const angle = (Math.PI / 2) - (index - (total - 1) / 2) * (Math.PI / 6); // Bottom arc
              const x = 50 + Math.cos(angle) * 30;
              const y = 50 + Math.sin(angle) * 30;
              return (
                <line
                  key={`line-peer-${index}`}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="#C9A227"
                  strokeWidth="0.3"
                  strokeDasharray="1, 1"
                  opacity="0.5"
                />
              );
            })}

            {/* Connecting Lines for Successors (Right Orbit) */}
            {successors.map((_, index) => {
              const total = successors.length;
              const angle = (index + 0.5) * (Math.PI / (total || 1)) - 0.2; // Right semicircle
              const x = 50 + Math.cos(angle) * 32;
              const y = 50 + Math.sin(angle) * 32;
              return (
                <g key={`line-succ-${index}`}>
                  <line x1="50" y1="50" x2={x} y2={y} stroke="#E63946" strokeWidth="0.35" opacity="0.4" />
                  {/* Arrow heads pointing from center out */}
                  <polygon points={`${x},${y} ${x-1.5},${y+2.5} ${x+1.5},${y+2.5}`} fill="#E63946" opacity="0.5" transform={`rotate(${(angle * 180 / Math.PI) - 90}, ${x}, ${y})`} />
                </g>
              );
            })}
          </svg>

          {/* ABSOLUTE HTML OVERLAYS ON TOP OF SVG */}
          {/* Centered Node */}
          <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 text-center">
            <motion.div
              layoutId="activeNetworkCenter"
              className="w-22 h-22 rounded-full bg-gradient-to-br from-zinc-900 to-[#1e1a12] border-2 border-[#C9A227] flex items-center justify-center shadow-[0_0_20px_rgba(201,162,39,0.25)] relative group cursor-default"
            >
              <div className="absolute inset-1 rounded-full border border-dashed border-[#C9A227]/30 animate-spin-slow"></div>
              <div className="text-center p-1 px-1.5">
                <p className="text-[9px] font-mono text-[#C9A227] font-bold uppercase tracking-widest mb-0.5">
                  Center
                </p>
                <h4 className="text-[11px] font-sans font-black text-white truncate max-w-[76px]">
                  {currentArtist.chineseName}
                </h4>
                <p className="text-[7px] font-mono text-zinc-500 truncate max-w-[76px] mt-0.5">
                  {currentArtist.name.split(" ").pop()}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Predecessors ("Influenced By" - Cool Blue Nodes) */}
          {predecessors.map((pred, index) => {
            const total = predecessors.length;
            const angle = Math.PI - (index + 0.5) * (Math.PI / (total || 1)) + 0.2;
            const left = 50 + Math.cos(angle) * 32;
            const top = 50 + Math.sin(angle) * 32;

            return (
              <motion.button
                key={pred.id}
                onClick={() => handleNodeClick(pred.id)}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900 border border-sky-500/50 hover:border-sky-400 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer transition-colors hover:bg-sky-950/20"
              >
                <span className="text-[7px] font-mono text-sky-400 font-semibold uppercase tracking-tight scale-90 mb-0.5">
                  启蒙
                </span>
                <span className="text-[8.5px] font-sans font-bold text-zinc-200 truncate max-w-[38px]">
                  {pred.chineseName.split("·").pop()}
                </span>
              </motion.button>
            );
          })}

          {/* Peers ("Collaborators" - Warm Amber Nodes) */}
          {peers.map((peer, index) => {
            const total = peers.length;
            const angle = (Math.PI / 2) - (index - (total - 1) / 2) * (Math.PI / 6);
            const left = 50 + Math.cos(angle) * 30;
            const top = 50 + Math.sin(angle) * 30;

            return (
              <motion.button
                key={peer.id}
                onClick={() => handleNodeClick(peer.id)}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900 border border-amber-500/40 hover:border-amber-400 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer transition-colors hover:bg-amber-950/20"
              >
                <span className="text-[7px] font-mono text-amber-500/80 font-semibold uppercase tracking-tight scale-90 mb-0.5">
                  合作者
                </span>
                <span className="text-[8.5px] font-sans font-bold text-zinc-200 truncate max-w-[38px]">
                  {peer.chineseName.split("·").pop()}
                </span>
              </motion.button>
            );
          })}

          {/* Successors ("Inspired Successors" - Vivid Red/Pink Nodes) */}
          {successors.map((succ, index) => {
            const total = successors.length;
            const angle = (index + 0.5) * (Math.PI / (total || 1)) - 0.2;
            const left = 50 + Math.cos(angle) * 32;
            const top = 50 + Math.sin(angle) * 32;

            return (
              <motion.button
                key={succ.id}
                onClick={() => handleNodeClick(succ.id)}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900 border border-rose-500/50 hover:border-rose-400 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer transition-colors hover:bg-rose-950/20"
              >
                <span className="text-[7px] font-mono text-rose-400 font-semibold uppercase tracking-tight scale-90 mb-0.5">
                  继承者
                </span>
                <span className="text-[8.5px] font-sans font-bold text-zinc-200 truncate max-w-[38px]">
                  {succ.chineseName.split("·").pop()}
                </span>
              </motion.button>
            );
          })}

          {/* Guide Legend inside graph block */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[8px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-2 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>启蒙前辈 (Influenced By)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>密切合奏 (Peers)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>启发后辈 (Inspired)</span>
            </div>
          </div>
        </div>

        {/* BIOGRAPHICAL DETAILS CARD (RIGHT 5 COLS) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header info block */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#C9A227] font-mono font-bold tracking-wider">
                  {currentArtist.instrument}
                </span>
                <span className="text-[10px] font-mono text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded border border-[#C9A227]/20 font-bold uppercase">
                  {currentArtist.birthYear} – {currentArtist.deathYear}
                </span>
              </div>
              <h2 className="text-3xl serif font-bold text-[#E0E0E0] tracking-tight mt-2.5">
                {currentArtist.name}
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                出生地: <span className="text-[#C9A227]">{currentArtist.birthplace}</span> | 流派风格: <span className="text-zinc-200">{currentArtist.style}</span>
              </p>
            </div>

            {/* Short Bio with elegant left border */}
            <div className="border-l border-[#C9A227]/30 pl-3.5 py-1.5 flex flex-col gap-2.5">
              <p className="serif italic text-xs text-[#C9A227]/85 leading-relaxed">
                {currentArtist.shortBio}
              </p>
              
              {onPlayTrack && (() => {
                const trackId = getMusicianTrackId(currentArtist.id);
                const trackDetails = TRACK_DETAILS[trackId];
                const isCurrentPlaying = currentPlayingTrackId === trackId;
                return (
                  <button
                    onClick={() => onPlayTrack(trackId)}
                    className={`mt-1 py-2 px-3.5 rounded-lg border text-xs font-semibold tracking-wider font-sans transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isCurrentPlaying && isPlaying
                        ? "bg-[#C9A227]/15 text-[#C9A227] border-[#C9A227] shadow-[0_0_12px_rgba(201,162,39,0.2)] animate-pulse"
                        : "bg-[#1c1810]/60 text-[#C9A227] hover:text-zinc-950 border-[#C9A227]/30 hover:bg-[#C9A227] hover:border-[#C9A227] shadow-md"
                    }`}
                  >
                    {isCurrentPlaying && isPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                    ) : (
                      <Play className={`w-3.5 h-3.5 ${isCurrentPlaying ? "fill-[#C9A227]" : "fill-current"}`} />
                    )}
                    <span>
                      {isCurrentPlaying && isPlaying ? "正在放音代表作：" : "一键播放代表作："}
                      <span className="font-bold underline italic ml-0.5">
                        《{trackDetails?.chineseTitle || "未知"}》
                      </span>
                    </span>
                  </button>
                );
              })()}
            </div>

            {/* Key Albums with vinyl cover mock-up style */}
            <div className="space-y-2.5 pt-1.5">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>里程碑式名盘 (Iconic Records)</span>
              </h4>
              <div className="space-y-2">
                {currentArtist.keyAlbums.map((album, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 bg-[#0B0B0B] border border-[#C9A227]/10 p-2.5 rounded-lg group hover:border-[#C9A227]/30 transition-colors"
                  >
                    {/* Vinyl Mock Cover */}
                    <div className="w-10 h-10 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner group-hover:bg-black/40">
                      <div className="w-6 h-6 rounded-full border border-[#C9A227]/20 flex items-center justify-center animate-spin-slow">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-[#C9A227]/60"></div>
                      </div>
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h5 className="text-xs font-sans font-bold text-zinc-100 truncate">
                          {album.title}
                        </h5>
                        <span className="text-[9px] font-mono text-zinc-500 shrink-0">
                          ({album.year})
                        </span>
                      </div>
                      <p className="text-[10.5px] text-zinc-400 truncate leading-normal mt-0.5">
                        {album.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generational Lineage Playlist (谱系歌单) */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-900/60">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ListMusic className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>大师传承谱系歌单 (Lineage Playlist)</span>
                </span>
                <span className="text-[9px] text-[#C9A227]/70 font-sans normal-case">一代一首 ✦</span>
              </h4>
              <div className="bg-[#09090a] rounded-lg border border-[#C9A227]/10 p-2.5 space-y-2">
                {getLineagePlaylist().map((track, index) => {
                  const isCurrentPlaying = currentPlayingTrackId === track.trackId;
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-md border transition-all ${
                        isCurrentPlaying && isPlaying
                          ? "bg-[#C9A227]/10 border-[#C9A227]/30 shadow-inner"
                          : "bg-[#111]/40 border-zinc-900 hover:border-zinc-800"
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[9px] font-mono font-bold text-zinc-500 shrink-0">
                            {track.generationLabel.split(" · ")[0]}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-sans bg-zinc-900 border border-zinc-800 text-zinc-300">
                            {track.relationLabel}
                          </span>
                          <button
                            onClick={() => onSelectMusician(track.musician.id)}
                            className="text-[10px] font-sans font-bold text-sky-400 hover:text-sky-300 transition-colors truncate hover:underline"
                          >
                            {track.musician.chineseName.split("·").pop()}
                          </button>
                        </div>
                        <h5 className="text-[11px] font-sans font-semibold text-zinc-100 truncate flex items-center gap-1">
                          <span className="italic">《{track.trackChineseTitle}》</span>
                          <span className="text-[9px] font-mono text-zinc-500 font-normal">({track.trackTitle})</span>
                        </h5>
                      </div>

                      {onPlayTrack && (
                        <button
                          onClick={() => onPlayTrack(track.trackId)}
                          className={`p-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
                            isCurrentPlaying && isPlaying
                              ? "bg-[#C9A227] text-zinc-950 border-[#C9A227] shadow-[0_0_8px_rgba(201,162,39,0.3)]"
                              : "bg-zinc-900/80 text-[#C9A227] border-[#C9A227]/20 hover:border-[#C9A227]"
                          }`}
                        >
                          {isCurrentPlaying && isPlaying ? (
                            <Pause className="w-3 h-3 fill-current" />
                          ) : (
                            <Play className="w-3 h-3 fill-current ml-[1px]" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick instructions or helper tip */}
          <div className="mt-6 pt-4 border-t border-zinc-900/60 text-[11px] text-zinc-500 leading-relaxed flex items-start gap-1.5">
            <span className="text-[#C9A227] font-bold">ℹ</span>
            <span>
              这是爵士乐的地理谱系，所有连线音乐家均可在列表中点选查看，了解他们横跨新奥尔良、芝加哥、纽约与巴黎的生命奇迹与唱片共鸣。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

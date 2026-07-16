import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Sparkles, 
  User, 
  RefreshCw, 
  Disc, 
  ChevronRight, 
  Play, 
  Pause, 
  ListMusic, 
  Compass, 
  Landmark, 
  Globe, 
  Tags, 
  Eye, 
  Search,
  BookOpen
} from "lucide-react";
import { Musician, musicians, clubs, cities } from "../data/jazzData";

interface MusicianNetworkProps {
  selectedMusicianId: string;
  onSelectMusician: (id: string) => void;
  onPlayTrack?: (trackId: string) => void;
  currentPlayingTrackId?: string;
  isPlaying?: boolean;
  onSelectCity?: (cityId: string) => void;
  onSelectClub?: (clubId: string) => void;
  onSwitchTab?: (tab: string) => void;
}

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
    case "bill-evans":
    case "wayne-shorter":
    case "mccoy-tyner":
    case "elvin-jones":
      return "so-what";
    case "john-coltrane":
      return "my-favorite-things";
    case "antonio-carlos-jobim":
    case "joao-gilberto":
    case "stan-getz":
      return "girl-from-ipanema";
    case "toshiko-akiyoshi":
    case "ryo-fukui":
      return "chameleon";
    case "pharoah-sanders":
    case "kamasi-washington":
    case "ravi-coltrane":
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
  "my-favorite-things": { title: "My Favorite Things", chineseTitle: "我的至爱" },
  "girl-from-ipanema": { title: "The Girl from Ipanema", chineseTitle: "伊帕内玛姑娘" },
  "chameleon": { title: "Chameleon", chineseTitle: "变色龙" },
  "strasbourg-st-denis": { title: "Strasbourg / St. Denis", chineseTitle: "斯特拉斯堡-圣丹尼斯" },
};

// Types of nodes in our Jazz Constellation Graph
interface ConstellationNode {
  id: string;
  name: string;
  chineseName: string;
  type: "musician" | "city" | "club" | "label" | "style";
  relationType: string;
  relationChinese: string;
  description: string;
  color: string;
  borderColor: string;
  lineColor: string;
  lineDash?: string;
  trackId?: string;
}

export default function MusicianNetwork({
  selectedMusicianId,
  onSelectMusician,
  onPlayTrack,
  currentPlayingTrackId,
  isPlaying = false,
  onSelectCity,
  onSelectClub,
  onSwitchTab,
}: MusicianNetworkProps) {
  
  // Find the selected musician
  const currentArtist = useMemo(() => {
    return musicians.find((m) => m.id === selectedMusicianId) || musicians[0];
  }, [selectedMusicianId]);

  // Selected node in hover/details state inside the network view
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // 1. DYNAMIC JAZZ CONSTELLATION NODE RESOLVER
  const constellationNodes = useMemo(() => {
    const nodes: ConstellationNode[] = [];
    const addedIds = new Set<string>();

    // Fallback labels associated with artists
    const getArtistLabel = (id: string): string => {
      if (["miles-davis", "bill-evans", "dave-brubeck"].includes(id)) return "Columbia Records";
      if (["john-coltrane", "pharoah-sanders", "ravi-coltrane"].includes(id)) return "Impulse! Records";
      if (["mccoy-tyner", "elvin-jones", "wayne-shorter", "bobby-hutcherson", "andrew-hill", "thelonious-monk"].includes(id)) return "Blue Note Records";
      if (["louis-armstrong", "coleman-hawkins", "lester-young"].includes(id)) return "Decca / Savoy Records";
      if (["kamasi-washington"].includes(id)) return "Brainfeeder Records";
      return "Blue Note Records";
    };

    // A. Add Predecessors (Mentors / Inspirations)
    musicians
      .filter((m) => currentArtist.influencedBy.includes(m.id))
      .slice(0, 3)
      .forEach((m) => {
        if (addedIds.has(m.id)) return;
        addedIds.add(m.id);
        nodes.push({
          id: m.id,
          name: m.name,
          chineseName: m.chineseName,
          type: "musician",
          relationType: "mentor",
          relationChinese: "精神启蒙 / 导师",
          description: `作为前辈大师，在精神、技艺和创作上赋予了 ${currentArtist.chineseName} 终身受用的灵感启发。`,
          color: "from-sky-950 to-zinc-900",
          borderColor: "border-sky-500/50 hover:border-sky-400 text-sky-400",
          lineColor: "#38bdf8",
          trackId: getMusicianTrackId(m.id)
        });
      });

    // B. Add Peers (Collaborators / Bandmembers)
    musicians
      .filter((m) => currentArtist.collaborators.includes(m.id) || m.collaborators.includes(currentArtist.id))
      .slice(0, 3)
      .forEach((m) => {
        if (addedIds.has(m.id)) return;
        addedIds.add(m.id);
        nodes.push({
          id: m.id,
          name: m.name,
          chineseName: m.chineseName,
          type: "musician",
          relationType: "collaborator",
          relationChinese: "同侪共鸣 / 战友",
          description: `同代盟友，并肩见证了爵士乐史上的伟大现场，在录音室里共同写就了不朽篇章。`,
          color: "from-amber-950 to-zinc-900",
          borderColor: "border-amber-500/50 hover:border-amber-400 text-amber-400",
          lineColor: "#f59e0b",
          lineDash: "3, 3",
          trackId: getMusicianTrackId(m.id)
        });
      });

    // C. Add Successors (Inspired / Followers)
    musicians
      .filter((m) => m.influencedBy.includes(currentArtist.id))
      .slice(0, 2)
      .forEach((m) => {
        if (addedIds.has(m.id)) return;
        addedIds.add(m.id);
        nodes.push({
          id: m.id,
          name: m.name,
          chineseName: m.chineseName,
          type: "musician",
          relationType: "successor",
          relationChinese: "薪火延续 / 后生",
          description: `后世巨匠或晚生晚辈，深受其“声音之床”或调式即兴的强烈感召，将其火种带入全新纪元。`,
          color: "from-rose-950 to-zinc-900",
          borderColor: "border-rose-500/50 hover:border-rose-400 text-rose-400",
          lineColor: "#f43f5e",
          trackId: getMusicianTrackId(m.id)
        });
      });

    // D. Add City Context Node
    const matchedCity = cities.find(c => 
      currentArtist.birthplace.toLowerCase().includes(c.name.toLowerCase()) || 
      currentArtist.birthplace.toLowerCase().includes(c.id.replace("-", " "))
    ) || cities.find(c => c.keyFigures.includes(currentArtist.id)) || cities[0];

    if (matchedCity) {
      nodes.push({
        id: matchedCity.id,
        name: matchedCity.name,
        chineseName: matchedCity.chineseName,
        type: "city",
        relationType: "city",
        relationChinese: "孕育之都 / 场景",
        description: `这是孕育其音乐灵魂的黄金温床，也是其名震海内外的爵士大本营所在的地理据点。`,
        color: "from-emerald-950 to-zinc-900",
        borderColor: "border-emerald-500/50 hover:border-emerald-400 text-emerald-400",
        lineColor: "#10b981",
        lineDash: "1, 3"
      });
    }

    // E. Add Club Context Node
    const matchedClub = clubs.find(cl => 
      cl.famousPerformers.some(p => p.toLowerCase().includes(currentArtist.name.toLowerCase()) || currentArtist.name.toLowerCase().includes(p.toLowerCase()))
    ) || clubs.find(cl => cl.cityId === matchedCity.id) || clubs[0];

    if (matchedClub) {
      nodes.push({
        id: matchedClub.id,
        name: matchedClub.name,
        chineseName: matchedClub.chineseName,
        type: "club",
        relationType: "club",
        relationChinese: "传世地标 / 舞台",
        description: `在其黄金岁月多次登台献艺的传奇地下酒吧。这里的烟雾与声学空间见证了其实况录音的诞生。`,
        color: "from-indigo-950 to-zinc-900",
        borderColor: "border-indigo-500/50 hover:border-indigo-400 text-indigo-400",
        lineColor: "#6366f1",
        lineDash: "1, 2"
      });
    }

    // F. Add Record Label Node
    const labelName = getArtistLabel(currentArtist.id);
    nodes.push({
      id: `label-${labelName.toLowerCase().replace(/\s+/g, "-")}`,
      name: labelName,
      chineseName: labelName.includes("Blue Note") 
        ? "蓝调之音唱片" 
        : labelName.includes("Impulse") 
          ? "脉搏唱片" 
          : labelName.includes("Columbia") 
            ? "哥伦比亚唱片" 
            : "传奇爵士唱片",
      type: "label",
      relationType: "label",
      relationChinese: "传奇签约厂牌",
      description: `为其录制并发行里程碑名盘的重要唱片帝国，提供绝对的艺术探索自由与顶级录音棚水准。`,
      color: "from-fuchsia-950 to-zinc-900",
      borderColor: "border-fuchsia-500/50 hover:border-fuchsia-400 text-fuchsia-400",
      lineColor: "#d946ef",
      lineDash: "2, 4"
    });

    // G. Add Style Node
    nodes.push({
      id: `style-${currentArtist.style.split("/")[0].trim().toLowerCase().replace(/\s+/g, "-")}`,
      name: currentArtist.style.split("/")[0].trim(),
      chineseName: currentArtist.style.split("/")[0].trim() === "Bebop" ? "咆哮波普" : 
                   currentArtist.style.split("/")[0].trim() === "Cool Jazz" ? "酷派冷爵士" : 
                   currentArtist.style.split("/")[0].trim() === "Modal Jazz" ? "写意调式爵士" : 
                   currentArtist.style.split("/")[0].trim() === "Spiritual Jazz" ? "精神神圣爵士" : "经典摇摆乐",
      type: "style",
      relationType: "style",
      relationChinese: "主攻美学流派",
      description: `在其漫长的音乐求索生涯中，所代表或亲手开创、并倾注全部毕生心力提炼的核心美学体系。`,
      color: "from-orange-950 to-zinc-900",
      borderColor: "border-orange-500/50 hover:border-orange-400 text-orange-400",
      lineColor: "#f97316",
      lineDash: "1, 1"
    });

    return nodes;
  }, [currentArtist]);

  // Compute angles and radial positions for nodes to render in a gorgeous circular constellation
  const renderedNodesWithCoords = useMemo(() => {
    // Separate into Inner ring (musicians) and Outer ring (contexts)
    const innerNodes = constellationNodes.filter(n => n.type === "musician");
    const outerNodes = constellationNodes.filter(n => n.type !== "musician");

    const result = [];

    // Inner Ring: radius = 24
    innerNodes.forEach((node, idx) => {
      const angle = (idx * (2 * Math.PI) / (innerNodes.length || 1)) - Math.PI / 2;
      const x = 50 + Math.cos(angle) * 23;
      const y = 50 + Math.sin(angle) * 23;
      result.push({ ...node, x, y, ring: "inner" });
    });

    // Outer Ring: radius = 38
    outerNodes.forEach((node, idx) => {
      const angle = (idx * (2 * Math.PI) / (outerNodes.length || 1)) - Math.PI / 3;
      const x = 50 + Math.cos(angle) * 38;
      const y = 50 + Math.sin(angle) * 38;
      result.push({ ...node, x, y, ring: "outer" });
    });

    return result;
  }, [constellationNodes]);

  // 2. DYNAMIC PLAYLIST GENERATOR based on current constellation nodes
  const constellationPlaylist = useMemo(() => {
    const list = [];
    const usedIds = new Set<string>();

    // Self signature first
    const selfTrackId = getMusicianTrackId(currentArtist.id);
    const selfDetails = TRACK_DETAILS[selfTrackId];
    list.push({
      roleLabel: "中心主角",
      relationLabel: "核心黄金作",
      musician: currentArtist,
      trackId: selfTrackId,
      trackTitle: selfDetails?.title || "Signature",
      trackChineseTitle: selfDetails?.chineseTitle || "黄金丰碑",
      colorClass: "border-[#C9A227]/30 text-[#C9A227] bg-[#C9A227]/5"
    });
    usedIds.add(currentArtist.id);

    // Filter connected musicians
    const connectedMusicians = constellationNodes.filter(n => n.type === "musician");
    connectedMusicians.forEach(node => {
      if (usedIds.has(node.id)) return;
      usedIds.add(node.id);
      const mObj = musicians.find(m => m.id === node.id);
      if (!mObj) return;
      const trackId = node.trackId || getMusicianTrackId(node.id);
      const details = TRACK_DETAILS[trackId];
      
      let badgeColor = "border-sky-500/20 text-sky-400 bg-sky-500/5";
      if (node.relationType === "collaborator") badgeColor = "border-amber-500/20 text-amber-500 bg-amber-500/5";
      if (node.relationType === "successor") badgeColor = "border-rose-500/20 text-rose-400 bg-rose-500/5";

      list.push({
        roleLabel: node.relationChinese.split(" / ")[0],
        relationLabel: node.relationType === "mentor" ? "传授启发" : node.relationType === "collaborator" ? "合鸣共探" : "回响致敬",
        musician: mObj,
        trackId,
        trackTitle: details?.title || "Classic Track",
        trackChineseTitle: details?.chineseTitle || "名家名盘",
        colorClass: badgeColor
      });
    });

    return list;
  }, [currentArtist, constellationNodes]);

  // 3. INTENTIONALLY SURFACE "HIDDEN GEMS" (发掘隐藏珍宝)
  const hiddenGems = useMemo(() => {
    // Return up to 3 random/relevant hidden gems from our expanded database
    const allGems = musicians.filter(m => m.isHiddenGem === true && m.id !== currentArtist.id);
    // Sort slightly to favor matching style if possible
    return allGems
      .sort((a, b) => {
        const aStyleMatch = a.style.includes(currentArtist.style.split("/")[0]) ? 1 : 0;
        const bStyleMatch = b.style.includes(currentArtist.style.split("/")[0]) ? 1 : 0;
        return bStyleMatch - aStyleMatch;
      })
      .slice(0, 3);
  }, [currentArtist]);

  // Handle clicking on secondary context nodes (Cities/Clubs)
  const handleContextClick = (node: ConstellationNode) => {
    if (node.type === "city" && onSelectCity) {
      onSelectCity(node.id);
      if (onSwitchTab) onSwitchTab("city");
    } else if (node.type === "club" && onSelectClub) {
      onSelectClub(node.id);
      if (onSwitchTab) onSwitchTab("clubs");
    } else {
      // For label or style, just keep focus overlay
      setFocusedNodeId(node.id === focusedNodeId ? null : node.id);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "city": return <Globe className="w-3.5 h-3.5 shrink-0" />;
      case "club": return <Landmark className="w-3.5 h-3.5 shrink-0" />;
      case "label": return <Disc className="w-3.5 h-3.5 shrink-0" />;
      case "style": return <Tags className="w-3.5 h-3.5 shrink-0" />;
      default: return <User className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <div className="w-full bg-[#121212] border border-[#C9A227]/20 rounded-xl p-5 md:p-6 shadow-2xl text-left relative overflow-hidden backdrop-blur-sm">
      
      {/* Background celestial grid decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c160c_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C9A227]/10 pb-4 mb-6 relative z-10">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
            <span>Jazz Universe Constellation Map</span>
          </span>
          <h3 className="text-xl font-serif font-bold text-[#E0E0E0] mt-1">
            {currentArtist.chineseName}的“爵士宇宙星图”
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            超越单一的师承链条，为您解开横跨同侪、名店、厂牌与历史地理的网状知识图谱。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-1 rounded bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20 font-mono font-bold animate-pulse">
            ● 探索模式激活 (Exploratory Map Active)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* INTERACTIVE SVG GRAPH VISUALIZATION (LEFT 7 COLS) */}
        <div className="lg:col-span-7 bg-[#070709] rounded-xl border border-zinc-900 p-4 relative aspect-square max-h-[500px] flex items-center justify-center shadow-2xl overflow-hidden group">
          
          {/* Constellation grid glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none"></div>

          {/* Concentric orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer ring */}
            <div className="w-[76%] h-[76%] rounded-full border border-dashed border-[#C9A227]/5 opacity-40 animate-[spin_100s_linear_infinite]"></div>
            {/* Inner ring */}
            <div className="w-[46%] h-[46%] rounded-full border border-dashed border-[#C9A227]/10 opacity-60 animate-[spin_60s_linear_infinite_reverse]"></div>
          </div>

          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <defs>
              <linearGradient id="g-center-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A227" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Pulsing center shadow gradient */}
            <circle cx="50" cy="50" r="16" fill="url(#g-center-glow)" />

            {/* Constellation Lines */}
            {renderedNodesWithCoords.map((node) => {
              const isFocused = focusedNodeId === node.id;
              return (
                <line
                  key={`line-${node.id}`}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke={node.lineColor}
                  strokeWidth={isFocused ? "0.6" : "0.25"}
                  strokeDasharray={node.lineDash}
                  opacity={isFocused ? "0.9" : "0.45"}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* ABSOLUTE HTML OVERLAYS */}
          
          {/* Centered Golden Vinyl Sun */}
          <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-30 text-center select-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="w-22 h-22 rounded-full bg-black border-2 border-[#C9A227] flex items-center justify-center shadow-[0_0_25px_rgba(201,162,39,0.35)] relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setFocusedNodeId(null)}
            >
              {/* Vinyl groove lines */}
              <div className="absolute inset-1 rounded-full border border-zinc-900"></div>
              <div className="absolute inset-2 rounded-full border border-dashed border-zinc-800"></div>
              <div className="absolute inset-3 rounded-full border border-zinc-700"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-zinc-600"></div>
              <div className="absolute inset-6.5 rounded-full bg-[#C9A227] border border-zinc-950 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
              </div>
            </motion.div>
            
            {/* Display center text overlay */}
            <div className="absolute top-[102%] left-1/2 -translate-x-1/2 w-32 pointer-events-none">
              <span className="text-[10px] font-sans font-black text-[#C9A227] tracking-wide block leading-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {currentArtist.chineseName}
              </span>
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block scale-90 mt-0.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {currentArtist.name.split(" ").pop()}
              </span>
            </div>
          </div>

          {/* Constellation Orbiting Nodes */}
          {renderedNodesWithCoords.map((node) => {
            const isFocused = focusedNodeId === node.id;
            const sizeClass = node.type === "musician" ? "w-11 h-11" : "w-8.5 h-8.5";
            const fontClass = node.type === "musician" ? "text-[8px]" : "text-[7.5px]";
            const iconSize = node.type === "musician" ? "w-3 h-3" : "w-2.5 h-2.5";
            
            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <motion.button
                  onClick={() => {
                    if (node.type === "musician") {
                      onSelectMusician(node.id);
                    } else {
                      handleContextClick(node);
                    }
                  }}
                  onMouseEnter={() => setFocusedNodeId(node.id)}
                  onMouseLeave={() => setFocusedNodeId(null)}
                  whileHover={{ scale: 1.15, zIndex: 50 }}
                  className={`rounded-full bg-zinc-950 border ${node.borderColor} flex flex-col items-center justify-center text-center shadow-2xl cursor-pointer transition-all ${sizeClass} p-0.5 relative group`}
                >
                  {/* Subtle inner core matching color */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${node.color} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 text-inherit filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] scale-90">
                    {getIconForType(node.type)}
                  </div>
                  
                  {/* Node label */}
                  <span className={`relative z-10 font-sans font-bold text-zinc-200 truncate max-w-[95%] leading-none mt-0.5 ${fontClass} filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]`}>
                    {node.chineseName.split("·").pop()?.split("唱片")[0]?.split("爵士")[0] || node.chineseName}
                  </span>

                  {/* Pulsing glow ring on focus */}
                  {isFocused && (
                    <div className="absolute -inset-1 rounded-full border border-white/20 animate-ping pointer-events-none"></div>
                  )}
                </motion.button>
              </div>
            );
          })}

          {/* Hover Node Detailed Overlays */}
          <AnimatePresence>
            {focusedNodeId && (() => {
              const nodeObj = renderedNodesWithCoords.find(n => n.id === focusedNodeId);
              if (!nodeObj) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute bottom-12 left-4 right-4 bg-zinc-950/95 border border-zinc-900 rounded-lg p-3 text-left shadow-2xl z-40 backdrop-blur-md flex gap-2.5 items-start min-h-[72px]"
                >
                  <div className={`p-2 rounded-lg bg-zinc-900 border ${nodeObj.borderColor.split(" ")[0]} shrink-0 text-inherit mt-0.5`}>
                    {getIconForType(nodeObj.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-sans font-bold text-white leading-none">
                        {nodeObj.chineseName} <span className="text-[10px] font-mono text-zinc-500 font-normal">({nodeObj.name})</span>
                      </h5>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold tracking-widest font-mono bg-zinc-900 border border-zinc-800 text-[#C9A227] scale-95 shrink-0 uppercase">
                        {nodeObj.relationChinese}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed pr-6">
                      {nodeObj.description}
                      {nodeObj.type === "musician" && (
                        <span className="text-[#C9A227] font-semibold ml-1 block mt-0.5">✦ 点击该节点，瞬间穿梭到其所在的“爵士星系主星”</span>
                      )}
                      {(nodeObj.type === "city" || nodeObj.type === "club") && (
                        <span className="text-emerald-400 font-semibold ml-1 block mt-0.5">✦ 点击该节点，直接瞬移至“城市历史画卷/俱乐部地标”</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Guide Legend inside graph block */}
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[8.5px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-2 pointer-events-none">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>启蒙 (Mentor)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>合奏伙伴 (Peers)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              <span>薪传后生 (Successor)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>都市孕育</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>地标舞台</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
              <span>名厂牌</span>
            </div>
          </div>
        </div>

        {/* BIOGRAPHICAL DETAILS CARD (RIGHT 5 COLS) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between gap-6">
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
              <h2 className="text-3xl font-serif font-bold text-[#E0E0E0] tracking-tight mt-2.5">
                {currentArtist.name}
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                出生地: <span className="text-[#C9A227]">{currentArtist.birthplace}</span> | 流派风格: <span className="text-zinc-200">{currentArtist.style}</span>
              </p>
            </div>

            {/* Short Bio with elegant left border */}
            <div className="border-l border-[#C9A227]/30 pl-3.5 py-1.5 flex flex-col gap-2.5">
              <p className="serif italic text-xs text-zinc-300 leading-relaxed">
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

            {/* Dynamic Telemetry Connections list (星海连接详情) */}
            <div className="space-y-2.5 pt-1.5">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>知识图谱连接详情 (Constellation Connections)</span>
              </h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {renderedNodesWithCoords.map((node) => (
                  <button
                    key={`feed-${node.id}`}
                    onClick={() => {
                      if (node.type === "musician") {
                        onSelectMusician(node.id);
                      } else {
                        handleContextClick(node);
                      }
                    }}
                    className="w-full text-left bg-zinc-950/50 hover:bg-zinc-950 border border-zinc-900 hover:border-[#C9A227]/30 p-2 rounded flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer"
                  >
                    <div className="min-w-0 flex items-center gap-2">
                      <div className={`p-1 rounded bg-zinc-900 border ${node.borderColor.split(" ")[0]} text-inherit`}>
                        {getIconForType(node.type)}
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-zinc-200">{node.chineseName}</span>
                        <span className="text-[10px] text-zinc-500 font-mono ml-1.5">({node.relationChinese})</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive Playlist (大师传承宇宙歌单) */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-900/60">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ListMusic className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>星空回响联觉歌单 (Constellation Playlist)</span>
                </span>
                <span className="text-[9px] text-[#C9A227]/70 font-sans normal-case">联觉畅听 ✦</span>
              </h4>
              <div className="bg-[#09090a] rounded-lg border border-[#C9A227]/10 p-2.5 space-y-1.5">
                {constellationPlaylist.map((track, index) => {
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
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono font-bold text-zinc-500 shrink-0">
                            {track.roleLabel}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[7.5px] font-bold tracking-wider font-sans bg-zinc-900 border border-zinc-800 text-zinc-400">
                            {track.relationLabel}
                          </span>
                          <button
                            onClick={() => onSelectMusician(track.musician.id)}
                            className="text-[10px] font-sans font-bold text-sky-400 hover:text-sky-300 transition-colors truncate hover:underline text-left max-w-[80px]"
                          >
                            {track.musician.chineseName.split("·").pop()}
                          </button>
                        </div>
                        <h5 className="text-[10.5px] font-sans font-semibold text-zinc-200 truncate flex items-center gap-1">
                          <span className="italic text-zinc-100">《{track.trackChineseTitle}》</span>
                          <span className="text-[8.5px] font-mono text-zinc-500 font-normal truncate">({track.trackTitle})</span>
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

            {/* INTENTIONALLY SURFACE "HIDDEN GEMS" (发掘隐藏珍宝) */}
            {hiddenGems.length > 0 && (
              <div className="pt-3 border-t border-zinc-900/60 space-y-2">
                <h4 className="text-[10.5px] font-mono font-bold text-[#f59e0b] uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                  <Compass className="w-3.5 h-3.5" />
                  <span>发掘爵士深空遗珍 (Discover Hidden Gems)</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {hiddenGems.map((gem) => (
                    <div
                      key={gem.id}
                      onClick={() => onSelectMusician(gem.id)}
                      className="bg-zinc-950/80 hover:bg-[#C9A227]/5 border border-amber-950/20 hover:border-[#C9A227]/30 p-2.5 rounded-lg flex justify-between items-center cursor-pointer transition-all group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-sans font-black text-amber-500">
                            {gem.chineseName}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500">
                            ({gem.instrument.split(" (")[0]})
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-snug line-clamp-1 group-hover:text-zinc-200 transition-colors">
                          {gem.shortBio}
                        </p>
                      </div>
                      <div className="p-1 rounded-full bg-amber-950/20 group-hover:bg-[#C9A227] group-hover:text-zinc-950 text-amber-500/80 transition-all shrink-0">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Quick instructions or helper tip */}
          <div className="mt-4 pt-3 border-t border-zinc-900/60 text-[11px] text-zinc-500 leading-relaxed flex items-start gap-1.5">
            <span className="text-[#C9A227] font-bold">ℹ</span>
            <span>
              双击或悬停可查看星图连线含义。双击节点将重置星图中心，您可以沿着音乐家、都市与酒吧自由流浪。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

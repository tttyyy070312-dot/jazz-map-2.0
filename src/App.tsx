import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  MapPin,
  Compass,
  Search,
  BookOpen,
  Music,
  User,
  Heart,
  Sparkles,
  ArrowRight,
  Landmark,
  Layers,
  ChevronRight,
  History,
  X,
  Plus,
  Trash2
} from "lucide-react";
import { cities, musicians, clubs, genres, City, Musician, Club, Genre } from "./data/jazzData";
import { CITY_EXTENDED_DATABASE } from "./data/cityExtendedData";
import JazzMap from "./components/JazzMap";
import MusicianNetwork from "./components/MusicianNetwork";
import TimelineSlider from "./components/TimelineSlider";
import AudioPlayer from "./components/AudioPlayer";
import ClubExplorer from "./components/ClubExplorer";
import CityHistoryDetail from "./components/CityHistoryDetail";

export default function App() {
  const [isExploring, setIsExploring] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(1950); // Start in 1950s (Cool Jazz/Bossa Nova golden era)
  const [activeCityId, setActiveCityId] = useState<string | null>("new-york");
  const [selectedMusicianId, setSelectedMusicianId] = useState<string>("miles-davis");
  const [selectedClubId, setSelectedClubId] = useState<string>("village-vanguard");
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"city" | "network" | "clubs" | "journal">("city");
  const [activeCitySubTab, setActiveCitySubTab] = useState<"overview" | "history" | "acoustic" | "venues" | "tracks">("overview");

  // Reset city sub-tab on city switch
  useEffect(() => {
    setActiveCitySubTab("overview");
  }, [activeCityId]);

  // Shared global AudioPlayer states
  const [activeTrackId, setActiveTrackId] = useState<string>("take-five");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Favorites state backed by localStorage
  const [favorites, setFavorites] = useState<{
    cities: string[];
    musicians: string[];
    clubs: string[];
  }>(() => {
    const saved = localStorage.getItem("jazz_atlas_favorites");
    return saved ? JSON.parse(saved) : { cities: [], musicians: [], clubs: [] };
  });

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("jazz_atlas_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Sync default musician when city changes
  useEffect(() => {
    if (activeCityId) {
      const cityObj = cities.find((c) => c.id === activeCityId);
      if (cityObj && cityObj.keyFigures.length > 0) {
        // Only override if the currently selected musician is not in the new city
        // and the new city actually has figures
        if (!cityObj.keyFigures.includes(selectedMusicianId)) {
          setSelectedMusicianId(cityObj.keyFigures[0]);
        }
      }
    }
  }, [activeCityId]);

  // Toggle favorite helper
  const toggleFavorite = (type: "cities" | "musicians" | "clubs", id: string) => {
    setFavorites((prev) => {
      const list = prev[type];
      const isFav = list.includes(id);
      const updatedList = isFav ? list.filter((item) => item !== id) : [...list, id];
      return { ...prev, [type]: updatedList };
    });
  };

  const isFavorite = (type: "cities" | "musicians" | "clubs", id: string) => {
    return favorites[type].includes(id);
  };

  // 1. FILTER SEARCH SUGGESTIONS (Omni-search cities, musicians, clubs)
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    
    const matchedCities = cities
      .filter((c) => c.name.toLowerCase().includes(query) || c.chineseName.includes(query))
      .map((c) => ({ type: "city" as const, id: c.id, label: `${c.chineseName} (${c.name})`, sub: "城市 · 爵士中枢" }));
      
    const matchedMusicians = musicians
      .filter((m) => m.name.toLowerCase().includes(query) || m.chineseName.includes(query) || m.instrument.toLowerCase().includes(query))
      .map((m) => ({ type: "musician" as const, id: m.id, label: `${m.chineseName} (${m.name})`, sub: `音乐家 · ${m.instrument}` }));
      
    const matchedClubs = clubs
      .filter((cl) => cl.name.toLowerCase().includes(query) || cl.chineseName.includes(query))
      .map((cl) => ({ type: "club" as const, id: cl.id, label: `${cl.chineseName} (${cl.name})`, sub: "历史爵士会所" }));

    return [...matchedCities, ...matchedMusicians, ...matchedClubs].slice(0, 5);
  };

  const searchResults = getSearchResults();

  // Selected details
  const activeCity = cities.find((c) => c.id === activeCityId) || cities[2]; // fallback New York
  const currentMusician = musicians.find((m) => m.id === selectedMusicianId) || musicians[1]; // fallback Miles Davis

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#E0E0E0] font-sans selection:bg-[#C9A227]/30 selection:text-[#C9A227] flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Map Decoration (Editorial style) */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none overflow-hidden z-0">
        <svg width="100%" height="100%" className="w-full h-full min-h-screen" viewBox="0 0 1024 768" preserveAspectRatio="none">
          <path d="M150,300 Q300,100 500,250 T850,350" className="map-line" />
          <path d="M200,500 Q450,450 700,550" className="map-line" />
          <circle cx="220" cy="350" r="2.5" fill="#C9A227" className="animate-pulse-slow" />
          <circle cx="480" cy="280" r="2.5" fill="#C9A227" className="animate-pulse-slow" />
          <circle cx="810" cy="380" r="2.5" fill="#C9A227" className="animate-pulse-slow" />
        </svg>
      </div>

      {/* GLOBAL BACKGROUND NOISE FADE */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+Cjwvc3ZnPg==')] bg-repeat z-50"></div>

      {/* ANIME PRESENCE: LANDING PAGE vs CORE WORKSPACE */}
      <AnimatePresence mode="wait">
        {!isExploring ? (
          
          /* ---------------- PAGE 1: RETRO LANDING PAGE ---------------- */
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col justify-center items-center p-6 text-center max-w-5xl mx-auto min-h-[90vh]"
          >
            {/* Elegant Vintage Frame design */}
            <div className="absolute inset-4 md:inset-8 border border-[#231e15]/40 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>Digital Humanities</span>
                <span>Music Geography</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>Jazz Atlas © 2026</span>
                <span>Explore Space & Sound</span>
              </div>
            </div>

            {/* Glowing ambient light */}
            <div className="absolute w-[320px] h-[320px] rounded-full bg-[#C9A227]/5 blur-[120px] pointer-events-none top-1/4"></div>

            <div className="space-y-8 z-10">
              
              {/* Rotating Earth-Vinyl Disc Centerpiece */}
              <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto select-none">
                {/* Turntable Platter Outer ring */}
                <div className="absolute inset-0 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs shadow-2xl">
                  {/* Glowing amber perimeter ring */}
                  <div className="absolute inset-1.5 rounded-full border border-[#C9A227]/10 animate-pulse"></div>
                  
                  {/* Spinning gold and black vinyl Earth */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                    className="w-[88%] h-[88%] rounded-full relative flex items-center justify-center shadow-lg"
                    style={{
                      backgroundImage: "radial-gradient(circle, #221d17 4px, #100f0d 20%, #060606 100%)",
                    }}
                  >
                    {/* Vinyl grooves */}
                    <div className="absolute inset-3 rounded-full border border-zinc-800/20 opacity-60"></div>
                    <div className="absolute inset-6 rounded-full border border-zinc-800/15 opacity-60"></div>
                    <div className="absolute inset-10 rounded-full border border-zinc-800/25 opacity-40"></div>
                    <div className="absolute inset-14 rounded-full border border-[#C9A227]/5 opacity-30"></div>

                    {/* Stylized continent outline hints mapped to center */}
                    <Globe className="w-16 h-16 text-[#C9A227]/35 absolute animate-pulse-slow" />

                    {/* Gold center spindle label */}
                    <div className="w-9 h-9 rounded-full bg-[#C9A227] border border-zinc-950 flex items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-950"></div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Title & Subtitle in elegant vintage typography */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase">
                  Explore Jazz Through Time and Space
                </span>
                
                <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-white leading-none">
                  JAZZ ATLAS
                </h1>
                
                <p className="text-lg md:text-xl font-serif text-zinc-400 italic font-medium max-w-2xl mx-auto leading-relaxed">
                  “爵士乐不是一串冷冰冰的年份和人物，而是一种随着城市、空间、迁徙和文化交流不断生长的声音地图。”
                </p>
                
                <div className="w-12 h-[1px] bg-[#C9A227]/40 mx-auto my-4"></div>
                
                <p className="text-xs text-zinc-500 max-w-xl mx-auto leading-relaxed font-sans">
                  欢迎步入爵士之魂的地理编年史。在这里，您将跨越哈瓦那的鼓点、新奥尔良的红灯区、纽约52街的咆哮风暴和里约热内卢的沙滩，在世界地图上聆听不朽的爵士演进。
                </p>
              </div>

              {/* START EXPLORING ACTION BUTTON */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(201,162,39,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsExploring(true)}
                  className="bg-[#C9A227] hover:bg-[#b08e20] text-zinc-950 px-8 py-3.5 rounded-full text-xs font-mono font-black uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Start Exploring (开启探索)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          
          /* ---------------- PAGE 2: MAIN ATLAS INTERACTIVE WORKSPACE ---------------- */
          <motion.div
            key="atlas-workspace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 space-y-6 flex flex-col justify-between relative z-10"
          >
            {/* A. WORKSPACE OMNI-HEADER */}
            <header className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-[#C9A227]/20 pb-5">
              
              {/* Brand logo & mini descriptive */}
              <div className="flex items-center gap-3 self-start">
                <button
                  onClick={() => setIsExploring(false)}
                  className="p-2 rounded-full bg-[#121212] border border-[#C9A227]/20 hover:border-[#C9A227] text-zinc-400 hover:text-[#C9A227] transition-all cursor-pointer shadow-lg"
                  title="Return to cover"
                >
                  <Globe className="w-4 h-4 text-[#C9A227]" />
                </button>
                <div>
                  <h1 className="text-xl serif font-bold tracking-tight text-[#C9A227] flex items-center gap-2">
                    <span>JAZZ ATLAS</span>
                    <span className="text-[10px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30 font-bold uppercase scale-90">
                      爵士世界地图
                    </span>
                  </h1>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5 uppercase tracking-wider">
                    Explore Music History Through Geography and Genealogy
                  </p>
                </div>
              </div>

              {/* OMNI SEARCH & AUTO-COMPLETE BAR (PRD SECTION 8) */}
              <div className="w-full md:w-80 relative">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#C9A227]/70 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜城市、人物、俱乐部或流派..."
                    className="w-full bg-[#121212] text-xs border border-[#C9A227]/20 rounded-lg pl-9.5 pr-8 py-2.5 text-[#E0E0E0] placeholder-zinc-600 focus:outline-hidden focus:border-[#C9A227]/50 transition-all font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 p-0.5 rounded text-zinc-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Autocomplete dropdown fly-out container */}
                <AnimatePresence>
                  {searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full mt-1.5 inset-x-0 bg-[#121212] border border-[#C9A227]/30 rounded-lg shadow-2xl z-50 overflow-hidden text-left"
                    >
                      {searchResults.length > 0 ? (
                        <div className="divide-y divide-[#C9A227]/10">
                          {searchResults.map((res) => (
                            <button
                              key={`${res.type}-${res.id}`}
                              onClick={() => {
                                if (res.type === "city") {
                                  setActiveCityId(res.id);
                                  setActiveTab("city");
                                } else if (res.type === "musician") {
                                  setSelectedMusicianId(res.id);
                                  // Find if city has this figure
                                  const associatedCity = cities.find((c) => c.keyFigures.includes(res.id));
                                  if (associatedCity) setActiveCityId(associatedCity.id);
                                  setActiveTab("network");
                                } else if (res.type === "club") {
                                  const clubObj = clubs.find((c) => c.id === res.id);
                                  if (clubObj) {
                                    setActiveCityId(clubObj.cityId);
                                    setActiveTab("clubs");
                                  }
                                }
                                setSearchQuery("");
                              }}
                              className="w-full p-2.5 hover:bg-[#1c1810]/40 flex justify-between items-center text-left transition-colors cursor-pointer group"
                            >
                              <div>
                                <p className="text-xs font-sans font-bold text-zinc-100 group-hover:text-[#C9A227] transition-colors">
                                  {res.label}
                                </p>
                                <p className="text-[9px] font-mono text-zinc-500 mt-0.5 uppercase tracking-wide">
                                  {res.sub}
                                </p>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#C9A227]/40 group-hover:text-[#C9A227] transition-all transform group-hover:translate-x-0.5" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs font-mono text-zinc-600">
                          未找到相关历史痕迹 ✦
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </header>

            {/* B. MAIN WORKSPACE CONTENT CONTAINER WITH ASYMMETRIC SIDE METRIC RAIL */}
            <div className="flex gap-6 items-start relative">
              {/* Left Asymmetric Editorial Rail */}
              <aside className="hidden md:flex w-16 border-r border-[#C9A227]/10 flex-col items-center py-6 gap-10 sticky top-6 h-[calc(100vh-140px)] shrink-0 self-start z-10 text-zinc-500 font-mono">
                <div className="vertical-text text-[9px] tracking-[0.4em] uppercase text-zinc-600 font-bold select-none">
                  Coordinates
                </div>
                <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[#C9A227]/80">
                  <div className="font-semibold">{activeCity ? `${activeCity.latitude.toFixed(1)}° N` : "40.7° N"}</div>
                  <div className="font-semibold">{activeCity ? `${Math.abs(activeCity.longitude).toFixed(1)}° W` : "74.0° W"}</div>
                </div>

                <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent my-1"></div>

                <div className="vertical-text text-[9px] tracking-[0.4em] uppercase text-zinc-600 font-bold select-none">
                  Current Era
                </div>
                <div className="text-[10px] text-[#C9A227] font-bold tracking-wider">
                  {selectedDecade}s
                </div>

                <div className="flex-grow"></div>

                <div className="vertical-text text-[9px] tracking-[0.4em] uppercase text-[#C9A227]/40">
                  Volume 042
                </div>
              </aside>

              {/* RIGHT MAIN WORKSPACE CONTENT GRID */}
              <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* COLUMN BLOCK 1: DYNAMIC MAPS & GRAPH WORKSPACE (FULL 12 COLS) */}
                <div className="lg:col-span-12 space-y-6">
                  
                  {/* 1. Interactive World Map */}
                <JazzMap
                  selectedDecade={selectedDecade}
                  activeCityId={activeCityId}
                  setActiveCityId={setActiveCityId}
                  onSelectCity={(city) => {
                    setActiveCityId(city.id);
                    if (activeTab === "clubs" || activeTab === "journal") {
                      // Switch to city profile tab if clicked on map
                      setActiveTab("city");
                    }
                  }}
                />

                {/* 2. Vintage Decade Timeline Slider Console */}
                <TimelineSlider
                  selectedDecade={selectedDecade}
                  setSelectedDecade={setSelectedDecade}
                  isPlaying={isPlayingTimeline}
                  setIsPlaying={setIsPlayingTimeline}
                />

                {/* 3. TABS SELECTION STRATEGY FOR BIO, SOUND, CLUBS & JOURNAL */}
                <div className="space-y-4 pt-2">
                  
                  {/* Visual Tab Bar */}
                  <div className="flex border-b border-zinc-900 gap-4 overflow-x-auto scrollbar-none">
                    <button
                      onClick={() => setActiveTab("city")}
                      className={`pb-2.5 text-xs font-mono font-bold uppercase tracking-widest relative cursor-pointer whitespace-nowrap transition-colors ${
                        activeTab === "city" ? "text-[#C9A227] font-black" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>城市画卷与唱片 (City & Sounds)</span>
                      </span>
                      {activeTab === "city" && (
                        <motion.div layoutId="activeWorkspaceTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C9A227]"></motion.div>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab("network")}
                      className={`pb-2.5 text-xs font-mono font-bold uppercase tracking-widest relative cursor-pointer whitespace-nowrap transition-colors ${
                        activeTab === "network" ? "text-[#C9A227] font-black" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>爵士宇宙星图 (Jazz Universe)</span>
                      </span>
                      {activeTab === "network" && (
                        <motion.div layoutId="activeWorkspaceTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C9A227]"></motion.div>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab("clubs")}
                      className={`pb-2.5 text-xs font-mono font-bold uppercase tracking-widest relative cursor-pointer whitespace-nowrap transition-colors ${
                        activeTab === "clubs" ? "text-[#C9A227] font-black" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5" />
                        <span>传奇地标名店 (Historic Clubs)</span>
                      </span>
                      {activeTab === "clubs" && (
                        <motion.div layoutId="activeWorkspaceTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C9A227]"></motion.div>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab("journal")}
                      className={`pb-2.5 text-xs font-mono font-bold uppercase tracking-widest relative cursor-pointer whitespace-nowrap transition-colors ${
                        activeTab === "journal" ? "text-[#C9A227] font-black" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 flex-row">
                        <Heart className="w-3.5 h-3.5" />
                        <span>我的爵士手账 (Journal & Itinerary)</span>
                        {favorites.cities.length + favorites.musicians.length + favorites.clubs.length > 0 && (
                          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#C9A227] text-zinc-950 text-[9px] font-bold">
                            {favorites.cities.length + favorites.musicians.length + favorites.clubs.length}
                          </span>
                        )}
                      </span>
                      {activeTab === "journal" && (
                        <motion.div layoutId="activeWorkspaceTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C9A227]"></motion.div>
                      )}
                    </button>
                  </div>

                  {/* Tab Panes Switch */}
                  <AnimatePresence mode="wait">
                    
                    {/* TAB PANEL 1: CITY & AUDIO PROFILE */}
                    {activeTab === "city" && (
                      <motion.div
                        key="tab-city"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6"
                      >
                        {/* City text summary details (7 cols) */}
                        <div className="md:col-span-7 bg-[#121212] border border-[#C9A227]/20 rounded-xl p-5 md:p-6 text-left relative overflow-hidden flex flex-col justify-between shadow-2xl backdrop-blur-sm min-h-[500px]">
                          
                          {/* Favorite toggle for city */}
                          <button
                            onClick={() => toggleFavorite("cities", activeCity.id)}
                            className="absolute top-5 right-5 p-2 rounded-full bg-[#121212] border border-[#C9A227]/20 hover:border-[#C9A227] text-[#C9A227] hover:text-[#C9A227] transition-all cursor-pointer shadow-md z-10"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isFavorite("cities", activeCity.id) ? "fill-current text-[#C9A227]" : ""
                              }`}
                            />
                          </button>

                          <div className="space-y-4 w-full">
                            <div>
                              <span className="text-[10px] font-mono text-[#C9A227] tracking-widest uppercase font-bold mb-1 block">
                                {activeCity.period} · {activeCity.country}
                              </span>
                              <h2 className="text-3xl font-serif font-bold text-[#E0E0E0] mt-1 leading-tight pr-10">
                                {activeCity.name}
                              </h2>
                              <p className="text-xs text-[#C9A227]/70 font-mono italic mt-1 font-bold tracking-wide">
                                {activeCity.chineseName} · {activeCity.importance}
                              </p>
                            </div>

                            {/* Inner Sub-Tabs Navigation */}
                            <div className="flex border-b border-zinc-900/80 overflow-x-auto scrollbar-none gap-2 pb-1 text-[11px] font-mono">
                              <button
                                onClick={() => setActiveCitySubTab("overview")}
                                className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs ${
                                  activeCitySubTab === "overview"
                                    ? "text-[#C9A227] bg-[#C9A227]/10 font-bold border border-[#C9A227]/20 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }`}
                              >
                                城市名片
                              </button>
                              <button
                                onClick={() => setActiveCitySubTab("history")}
                                className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs ${
                                  activeCitySubTab === "history"
                                    ? "text-[#C9A227] bg-[#C9A227]/10 font-bold border border-[#C9A227]/20 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }`}
                              >
                                社会历史
                              </button>
                              <button
                                onClick={() => setActiveCitySubTab("acoustic")}
                                className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs ${
                                  activeCitySubTab === "acoustic"
                                    ? "text-[#C9A227] bg-[#C9A227]/10 font-bold border border-[#C9A227]/20 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }`}
                              >
                                声学DNA
                              </button>
                              <button
                                onClick={() => setActiveCitySubTab("venues")}
                                className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs ${
                                  activeCitySubTab === "venues"
                                    ? "text-[#C9A227] bg-[#C9A227]/10 font-bold border border-[#C9A227]/20 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }`}
                              >
                                传奇地标
                              </button>
                              <button
                                onClick={() => setActiveCitySubTab("tracks")}
                                className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap text-xs ${
                                  activeCitySubTab === "tracks"
                                    ? "text-[#C9A227] bg-[#C9A227]/10 font-bold border border-[#C9A227]/20 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }`}
                              >
                                诞生名盘
                              </button>
                            </div>

                            {/* Inner Tab Panels */}
                            <div className="min-h-[260px] max-h-[320px] overflow-y-auto pr-1">
                              {activeCitySubTab === "overview" && (
                                <div className="space-y-4">
                                  <p className="serif italic text-sm text-[#C9A227]/90 leading-relaxed border-l-2 border-[#C9A227]/40 pl-4 py-1">
                                    {activeCity.description}
                                  </p>

                                  {CITY_EXTENDED_DATABASE[activeCity.id] && (
                                    <div className="bg-zinc-950/60 rounded-lg p-3 border border-zinc-900/80 flex items-center gap-3">
                                      <Sparkles className="w-5 h-5 text-[#C9A227] shrink-0 animate-pulse" />
                                      <div>
                                        <h5 className="text-[10px] font-mono font-extrabold text-[#C9A227] uppercase tracking-wider">
                                          城市听觉主调 (Sonic Signature)
                                        </h5>
                                        <p className="text-xs text-zinc-300 font-sans mt-0.5 font-medium">
                                          {CITY_EXTENDED_DATABASE[activeCity.id].soundSignature}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Key genre tags */}
                                  <div className="space-y-1.5 pt-1">
                                    <h5 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                      <Layers className="w-3 h-3 text-[#C9A227]" />
                                      <span>孕育与活跃的爵士流派 (Aesthetic Styles)</span>
                                    </h5>
                                    <div className="flex flex-wrap gap-1.5">
                                      {activeCity.keyGenres.map((genreId) => {
                                        const genreObj = genres.find((g) => g.id === genreId);
                                        return (
                                          <span
                                            key={genreId}
                                            style={{ borderColor: `${genreObj?.color}30`, backgroundColor: `${genreObj?.color}08`, color: genreObj?.color }}
                                            className="text-[10px] font-sans font-extrabold border px-2.5 py-1 rounded-full uppercase"
                                          >
                                            {genreObj?.chineseName || genreId}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {activeCitySubTab === "history" && CITY_EXTENDED_DATABASE[activeCity.id] && (
                                <div className="space-y-4 text-zinc-300">
                                  <div className="space-y-1.5">
                                    <h5 className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider flex items-center gap-1.5">
                                      <History className="w-3.5 h-3.5" />
                                      <span>时代社会背景与历史切片 (Socio-Historical Context)</span>
                                    </h5>
                                    <p className="text-xs leading-relaxed font-sans text-zinc-400">
                                      {CITY_EXTENDED_DATABASE[activeCity.id].socialLandscape}
                                    </p>
                                  </div>

                                  {/* Quote card */}
                                  <div className="bg-black/40 border border-zinc-900/60 p-3 rounded-lg space-y-1.5 italic">
                                    <p className="text-xs text-[#C9A227]/90 font-serif leading-relaxed">
                                      &ldquo;{CITY_EXTENDED_DATABASE[activeCity.id].aestheticQuote.text}&rdquo;
                                    </p>
                                    <span className="block text-[10px] text-zinc-500 text-right font-mono">
                                      —— {CITY_EXTENDED_DATABASE[activeCity.id].aestheticQuote.author}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {activeCitySubTab === "acoustic" && CITY_EXTENDED_DATABASE[activeCity.id] && (
                                <div className="space-y-3.5">
                                  <h5 className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                    <Music className="w-3.5 h-3.5" />
                                    <span>声学 DNA 深度解构 (Acoustic DNA Elements)</span>
                                  </h5>
                                  <div className="space-y-2.5">
                                    {CITY_EXTENDED_DATABASE[activeCity.id].acousticDna.map((item, index) => (
                                      <div key={index} className="bg-zinc-950/50 border border-zinc-900 hover:border-[#C9A227]/20 transition-colors p-3 rounded-lg space-y-1">
                                        <h6 className="text-xs font-sans font-bold text-zinc-200 flex items-center gap-1.5">
                                          <span className="text-[10px] font-mono text-[#C9A227]">0{index + 1}.</span>
                                          {item.title}
                                        </h6>
                                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                                          {item.detail}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {activeCitySubTab === "venues" && CITY_EXTENDED_DATABASE[activeCity.id] && (
                                <div className="space-y-3.5">
                                  <h5 className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                    <Landmark className="w-3.5 h-3.5" />
                                    <span>标志性地标及历史殿堂 (Historic Venues)</span>
                                  </h5>
                                  <div className="space-y-2.5">
                                    {CITY_EXTENDED_DATABASE[activeCity.id].iconicVenues.map((venue, index) => (
                                      <div key={index} className="bg-zinc-950/50 border border-zinc-900 p-3 rounded-lg flex gap-3 items-start">
                                        <div className="p-1.5 rounded bg-[#C9A227]/5 border border-[#C9A227]/20 text-[#C9A227] shrink-0 mt-0.5 text-[10px] font-mono font-bold w-6 h-6 flex items-center justify-center">
                                          {index + 1}
                                        </div>
                                        <div className="space-y-1">
                                          <div className="flex items-baseline gap-1.5 flex-wrap">
                                            <h6 className="text-xs font-sans font-extrabold text-zinc-200">
                                              {venue.chineseName}
                                            </h6>
                                            <span className="text-[9px] font-mono text-zinc-500">
                                              ({venue.name})
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                                            {venue.description}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {activeCitySubTab === "tracks" && CITY_EXTENDED_DATABASE[activeCity.id] && (
                                <div className="space-y-3.5">
                                  <h5 className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>在此诞生/灌录的不朽名盘 (Legendary Records)</span>
                                  </h5>
                                  <div className="space-y-2.5">
                                    {CITY_EXTENDED_DATABASE[activeCity.id].historicMasterpieces.map((masterpiece, index) => (
                                      <div key={index} className="bg-zinc-950/50 border border-zinc-900 hover:border-zinc-800 p-3 rounded-lg space-y-1">
                                        <div className="flex items-center justify-between gap-2">
                                          <h6 className="text-xs font-sans font-extrabold text-zinc-100 flex items-center gap-1 truncate">
                                            <span className="text-[#C9A227] italic">《{masterpiece.chineseName}》</span>
                                            <span className="text-[9px] font-mono text-zinc-500 font-normal hidden sm:inline">({masterpiece.title})</span>
                                          </h6>
                                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-[#C9A227] shrink-0">
                                            {masterpiece.year}年
                                          </span>
                                        </div>
                                        <div className="text-[10px] font-sans text-sky-400 font-bold mb-1">
                                          艺术家：{masterpiece.artist}
                                        </div>
                                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                                          {masterpiece.description}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Quick details about native musicians */}
                          <div className="mt-4 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[11px] text-zinc-500 w-full">
                            <span className="font-mono">
                              活跃大师数：{activeCity.keyFigures.length}
                            </span>
                            
                            <div className="flex gap-2">
                              {activeCity.keyFigures.map((figId) => {
                                const figObj = musicians.find((m) => m.id === figId);
                                if (!figObj) return null;
                                return (
                                  <button
                                    key={figId}
                                    onClick={() => {
                                      setSelectedMusicianId(figId);
                                      setActiveTab("network");
                                    }}
                                    className="text-[10px] font-sans font-bold text-[#C9A227] hover:text-white transition-colors cursor-pointer bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800"
                                  >
                                    {figObj.chineseName.split("·").pop()} ➔
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Custom Web-Audio turntable synthesizer (5 cols) */}
                        <div className="md:col-span-5">
                          {/* Portal target root for persistent AudioPlayer full display */}
                          <div id="audio-player-portal-root" className="w-full h-full min-h-[380px]" />
                        </div>

                        {/* City detailed historical timeline and cultural characteristics (12 cols) */}
                        <div className="md:col-span-12">
                          <CityHistoryDetail
                            cityId={activeCity.id}
                            selectedDecade={selectedDecade}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* TAB PANEL 2: GENEALOGY NETWORK */}
                    {activeTab === "network" && (
                      <motion.div
                        key="tab-network"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MusicianNetwork
                          selectedMusicianId={selectedMusicianId}
                          onSelectMusician={setSelectedMusicianId}
                          onPlayTrack={(trackId) => {
                            if (activeTrackId === trackId) {
                              setIsPlayingAudio((prev) => !prev);
                            } else {
                              setActiveTrackId(trackId);
                              setIsPlayingAudio(true);
                            }
                          }}
                          currentPlayingTrackId={activeTrackId}
                          isPlaying={isPlayingAudio}
                          onSelectCity={setActiveCityId}
                          onSelectClub={setSelectedClubId}
                          onSwitchTab={setActiveTab}
                        />
                      </motion.div>
                    )}

                    {/* TAB PANEL 3: HISTORIC CLUBS LIST */}
                    {activeTab === "clubs" && (
                      <motion.div
                        key="tab-clubs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ClubExplorer
                          onSelectCityId={(id) => {
                            setActiveCityId(id);
                            setActiveTab("city");
                          }}
                          activeCityId={activeCityId}
                          selectedClubId={selectedClubId}
                          setSelectedClubId={setSelectedClubId}
                        />
                      </motion.div>
                    )}

                    {/* TAB PANEL 4: SAVED JOURNAL & TRAVEL ITINERARY */}
                    {activeTab === "journal" && (
                      <motion.div
                        key="tab-journal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#0a0a0c] border border-zinc-900 rounded-xl p-5 md:p-6 text-left relative overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-5 gap-3">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>My Personal Travelogue</span>
                            </span>
                            <h3 className="text-lg font-sans font-extrabold text-white mt-1">
                              我的爵士乐朝圣手账 (Saved Collections)
                            </h3>
                            <p className="text-xs text-zinc-400 mt-0.5">
                              收纳您在世界地图上标记的城市、大师和酒吧。我们将为您定制一条独家物理朝圣路线。
                            </p>
                          </div>

                          <button
                            onClick={() => setFavorites({ cities: [], musicians: [], clubs: [] })}
                            disabled={favorites.cities.length + favorites.musicians.length + favorites.clubs.length === 0}
                            className="bg-zinc-950 hover:bg-rose-950/20 border border-zinc-900 hover:border-rose-900 text-xs font-mono py-1.5 px-3 rounded-lg text-zinc-400 hover:text-rose-400 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>清空手账</span>
                          </button>
                        </div>

                        {favorites.cities.length + favorites.musicians.length + favorites.clubs.length === 0 ? (
                          
                          /* Empty journal view */
                          <div className="py-12 text-center space-y-3">
                            <Heart className="w-8 h-8 text-zinc-700 mx-auto animate-pulse" />
                            <h4 className="text-xs font-mono text-zinc-400">
                              您的手账目前空无一字 ✦
                            </h4>
                            <p className="text-[11px] text-zinc-600 max-w-sm mx-auto leading-normal">
                              在“城市画卷”或“传奇地标”选项卡中点击右上角的 🤍 桃心，即可在这里构建您专属的爵士足迹，并启动 AI Itinerary 智能路线绘制。
                            </p>
                          </div>
                        ) : (
                          
                          /* Populate lists */
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            
                            {/* Saved Cities */}
                            <div className="space-y-2 bg-[#060608] border border-zinc-950 p-3.5 rounded-lg h-56 overflow-y-auto">
                              <h4 className="text-xs font-mono font-extrabold text-[#C9A227] border-b border-zinc-900 pb-1.5 mb-2.5 flex justify-between items-center">
                                <span>收录城市 ({favorites.cities.length})</span>
                                <Globe className="w-3 h-3 text-[#C9A227]/70" />
                              </h4>
                              {favorites.cities.length === 0 ? (
                                <p className="text-[10px] font-mono text-zinc-600 py-4">无收录</p>
                              ) : (
                                <div className="space-y-1.5">
                                  {favorites.cities.map((cityId) => {
                                    const cityObj = cities.find((c) => c.id === cityId);
                                    if (!cityObj) return null;
                                    return (
                                      <div key={cityId} className="flex items-center justify-between bg-zinc-900/60 p-2 rounded text-xs">
                                        <button
                                          onClick={() => {
                                            setActiveCityId(cityId);
                                            setActiveTab("city");
                                          }}
                                          className="font-bold text-zinc-200 hover:text-[#C9A227] transition-all truncate text-left max-w-[130px]"
                                        >
                                          {cityObj.chineseName}
                                        </button>
                                        <button
                                          onClick={() => toggleFavorite("cities", cityId)}
                                          className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Saved Musicians */}
                            <div className="space-y-2 bg-[#060608] border border-zinc-950 p-3.5 rounded-lg h-56 overflow-y-auto">
                              <h4 className="text-xs font-mono font-extrabold text-sky-400 border-b border-zinc-900 pb-1.5 mb-2.5 flex justify-between items-center">
                                <span>传承大师 ({favorites.musicians.length})</span>
                                <User className="w-3 h-3 text-sky-400/70" />
                              </h4>
                              {favorites.musicians.length === 0 ? (
                                <p className="text-[10px] font-mono text-zinc-600 py-4">无收录</p>
                              ) : (
                                <div className="space-y-1.5">
                                  {favorites.musicians.map((musicianId) => {
                                    const musObj = musicians.find((m) => m.id === musicianId);
                                    if (!musObj) return null;
                                    return (
                                      <div key={musicianId} className="flex items-center justify-between bg-zinc-900/60 p-2 rounded text-xs">
                                        <button
                                          onClick={() => {
                                            setSelectedMusicianId(musicianId);
                                            setActiveTab("network");
                                          }}
                                          className="font-bold text-zinc-200 hover:text-sky-400 transition-all truncate text-left max-w-[130px]"
                                        >
                                          {musObj.chineseName.split("·").pop()}
                                        </button>
                                        <button
                                          onClick={() => toggleFavorite("musicians", musicianId)}
                                          className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Saved Clubs */}
                            <div className="space-y-2 bg-[#060608] border border-zinc-950 p-3.5 rounded-lg h-56 overflow-y-auto">
                              <h4 className="text-xs font-mono font-extrabold text-rose-400 border-b border-zinc-900 pb-1.5 mb-2.5 flex justify-between items-center">
                                <span>地标会所 ({favorites.clubs.length})</span>
                                <Landmark className="w-3 h-3 text-rose-400/70" />
                              </h4>
                              {favorites.clubs.length === 0 ? (
                                <p className="text-[10px] font-mono text-zinc-600 py-4">无收录</p>
                              ) : (
                                <div className="space-y-1.5">
                                  {favorites.clubs.map((clubId) => {
                                    const clubObj = clubs.find((c) => c.id === clubId);
                                    if (!clubObj) return null;
                                    return (
                                      <div key={clubId} className="flex items-center justify-between bg-zinc-900/60 p-2 rounded text-xs">
                                        <button
                                          onClick={() => {
                                            setActiveCityId(clubObj.cityId);
                                            setSelectedClubId(clubId);
                                            setActiveTab("clubs");
                                          }}
                                          className="font-bold text-zinc-200 hover:text-rose-400 transition-all truncate text-left max-w-[130px]"
                                        >
                                          {clubObj.chineseName}
                                        </button>
                                        <button
                                          onClick={() => toggleFavorite("clubs", clubId)}
                                          className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>


                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>


            </div>
          </div>

          {/* Persistent global AudioPlayer context */}
          <AudioPlayer
            preset={activeCity.audioPreset}
            cityName={activeCity.chineseName}
            selectedDecade={selectedDecade}
            activeTrackId={activeTrackId}
            onTrackChange={setActiveTrackId}
            isPlayingGlobal={isPlayingAudio}
            onIsPlayingChange={setIsPlayingAudio}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ArrowRight, Music, Info, Navigation, Globe } from "lucide-react";
import { City, MigrationFlow, cities, migrationFlows } from "../data/jazzData";

// Refined high-fidelity vector outlines of the world's continents for vintage cartography
const landmasses = [
  {
    name: "North America",
    d: "M 2,15 C 4,14 10,12 12,10 C 14,11 16,8 18,11 C 20,13 18,17 21,17 C 23,17 22,12 25,12 C 27,13 28,15 31,18 C 28,20 27,19 28,23 C 29,26 31,28 29,32 C 28,34 26,35 27.8,39 C 26,44 26,46 25,49 C 24,49 23,48 23.5,47.5 C 21.5,47.5 21,48 19.5,49 C 18,52 16.5,53.5 17,55 C 18,56.5 19,57 20,59 C 17,57 15.5,53 14.5,50 C 14.2,46 14.8,44 14,42 C 13,40 12,38 12.5,35 C 10,33 9,28 7,26 C 5,24 2.5,21 2,15 Z"
  },
  {
    name: "South America",
    d: "M 20,59 C 22,58 24,56 26,56 C 28,58 31,59 34,60 C 37,62 39,66 41,70 C 43,74 41,78 37,78.5 C 35,79 33,83 31,88 C 29.5,92 28.5,96 28,98 C 27.5,98 27,94 27,90 C 26,84 25,78 24,72 C 23.5,68 22.5,65 21,63 C 19,61 19,60 20,59 Z"
  },
  {
    name: "Eurasia",
    d: "M 41,40 C 40,38 41,36 43,36 C 44,35 44.5,33 46,33 C 47,33.5 48.5,33 49.5,32.5 C 49,30 48,27 48,24 C 49,19 51,15 54,14 C 55.5,15 55,20 56,23 C 57,25 58,26 60,25 C 63,22 66,20 70,18 C 75,17 80,15 85,15 C 89,16 93,18 95,21 C 96,24 93,28 92,30 C 90,32 88,30 87,33 C 86,35 85,38 84,40 C 83,42 81,41 80,43 C 78,45 78,48 76,51 C 75,53 74,56 74,58 C 72,58 71.5,56 71,54 C 70,51 69,53 68.5,55 C 68,57 66,59 65.5,57 C 65,54 64,52 63.5,50 C 62,49 60,52 59,54 C 58,55 56.5,55 55,52 C 54,49 51.5,47 50.5,45 C 49,44 47.5,44 46,42 C 44,41 42,41 41,40 Z"
  },
  {
    name: "Africa",
    d: "M 41,43 C 44,42.5 48,42.5 51,43 C 53,43.5 54,41.5 55,42 C 56,43 56.5,45.5 55.5,47 C 57.5,48 59,50 60,52 C 61.5,54 62.5,57 60,59 C 59,60 59,63 58,66 C 57,71 55,77 53.5,82 C 52.5,85 51,86 51,85 C 49,83 48,78 47.5,75 C 47,70 45,64 45.5,60 C 46,58.5 44,57 42.5,56 C 41,55 38.5,53 37.5,50 C 37,47 39.5,44 41,43 Z"
  },
  {
    name: "Greenland",
    d: "M 21,8 C 24,7 28,6 31,10 C 32,12 31,15 29,17 C 26,19 23,17 21.5,14 C 20,11 20,9 21,8 Z"
  },
  {
    name: "Iceland",
    d: "M 36,15 C 37,14 39,14 40,15 C 40,16 38,18 37,18 C 36,17 35,16 36,15 Z"
  },
  {
    // High-fidelity split of Great Britain & Ireland
    name: "United Kingdom & Ireland",
    d: "M 44,21 C 45,19 46.5,18 47.5,19 C 48.2,21 48,25 47.5,28.5 C 47,29.5 45.5,29.5 44.5,28 C 44,26 43.5,23 44,21 Z M 41,23 C 42,22 43,23 43.5,25 C 43,26.5 42,27 41.5,26.5 C 41,26 40.5,24.5 41,23 Z"
  },
  {
    name: "Madagascar",
    d: "M 57,70 Q 59,73 58,78 T 56,72 Z"
  },
  {
    // High-fidelity split of the Caribbean and Cuba island arc
    name: "Caribbean & Cuba Arc",
    d: "M 21,53 C 22.5,53.5 24.5,54.5 25.5,55 C 24.5,55.5 22.5,55 21.5,54.5 Z M 27,56 C 28,56.5 29,57 28.5,58 C 27.5,58 26.5,57.2 27,56 Z M 29,59 C 29.5,59.5 30.5,60 30,60.5 C 29,60.5 28.5,60 29,59 Z"
  },
  {
    // High-fidelity split of the Japanese archipelago (Hokkaido, Honshu, Kyushu/Shikoku)
    name: "Japan",
    d: "M 85,35 C 86,36 87.5,38 88.5,41 C 89,43 88.5,45 87.5,46 C 86,45 85,42 84.5,39 C 84,37 84.5,36 85,35 Z M 88,31 C 89,30 90,31 90.5,33 C 90,34 89,34 88.5,33.5 C 87.8,33 87.5,32 88,31 Z M 84,47 C 84.5,47 85,48 84.8,49 C 84.3,49.5 83.5,49 83.5,48 C 83.5,47.5 83.8,47 84,47 Z"
  },
  {
    name: "Australia",
    d: "M 73,73 C 76,71 80,72 84,72 C 87,73 89,75 89.5,78 C 90,81 87,83 87.5,86 C 85,88 81,89 79,89 C 76,87 73,85 73.5,81 C 74,78 72,75 73,73 Z"
  }
];

interface JazzMapProps {
  selectedDecade: number;
  activeCityId: string | null;
  setActiveCityId: (id: string | null) => void;
  onSelectCity: (city: City) => void;
}

export default function JazzMap({
  selectedDecade,
  activeCityId,
  setActiveCityId,
  onSelectCity,
}: JazzMapProps) {
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  // Helper to determine if a city is active in the selected decade
  const isCityActiveInDecade = (city: City, decade: number) => {
    // Period ranges are like "1890s - 1920s" or "1920s - Present"
    const periodStr = city.period.toLowerCase();
    
    // Parse years from period string
    const years = periodStr.match(/\d{4}/g);
    if (!years || years.length === 0) return true;
    
    const startYear = parseInt(years[0]);
    let endYear = 2026; // Default to present
    
    if (years.length > 1) {
      endYear = parseInt(years[1]);
    } else if (periodStr.includes("present")) {
      endYear = 2026;
    } else if (periodStr.includes("1890s")) {
      startYear === 1890;
      endYear = 1915;
    }
    
    // Check if the selected decade is within the range
    // Give a buffer of +/- 10 years to smooth transition
    return decade >= startYear - 10 && decade <= endYear + 10;
  };

  // Filter flows active in this decade
  const getActiveFlows = (): MigrationFlow[] => {
    return migrationFlows.filter((flow) => {
      const eraStr = flow.era;
      const years = eraStr.match(/\d{4}/g);
      if (!years) return false;
      const startYear = parseInt(years[0]);
      let endYear = startYear + 10;
      if (years.length > 1) {
        endYear = parseInt(years[1]);
      }
      return selectedDecade >= startYear && selectedDecade <= endYear + 5;
    });
  };

  const activeFlows = getActiveFlows();

  return (
    <div id="jazz-atlas-map" className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#0B0B0B] border border-[#C9A227]/20 rounded-xl overflow-hidden shadow-2xl group">
      
      {/* 1. MAP BACKGROUND STYLING (VINTAGE SHIPS GRID & COORDINATE GRATICULES) */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Compass rose or vintage metadata box in margin */}
      <div className="absolute bottom-4 left-4 pointer-events-none hidden md:block border border-[#C9A227]/20 p-2 rounded bg-[#121212]/80 backdrop-blur-xs font-mono text-[9px] text-[#C9A227]/60">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#C9A227]">
          <Globe className="w-3 h-3 animate-spin-slow" />
          <span>Jazz Cartography v1.0</span>
        </div>
        <div>MERCATOR PROJECTION</div>
        <div>CENTER: 20°N / 12°W</div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none bg-[#121212]/80 border border-[#C9A227]/20 px-2.5 py-1 rounded backdrop-blur-xs text-[10px] font-mono text-zinc-400">
        <span className="text-[#C9A227] font-semibold">Decade Filter:</span> {selectedDecade}s
      </div>

      {/* SVG Container for the custom styled world outline and active nodes */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full select-none"
      >
        <defs>
          {/* Dynamic ocean gradient glow */}
          <radialGradient id="ocean-gradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#111116" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="1" />
          </radialGradient>

          {/* Elegant Linear Gradient for high-fidelity dual-tone landmass pixel dots (Gold to Blue/Teal) */}
          <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A227" /> {/* Jazz Gold */}
            <stop offset="35%" stopColor="#E5A93B" /> {/* Warm Amber */}
            <stop offset="70%" stopColor="#0EA5E9" /> {/* Celestial Ocean Blue */}
            <stop offset="100%" stopColor="#0D9488" /> {/* High-fidelity Teal-Cyan */}
          </linearGradient>

          {/* Faint Digital Grid Dot Pattern for background water areas */}
          <pattern id="grid-dots" width="0.75" height="0.75" patternUnits="userSpaceOnUse">
            <circle cx="0.375" cy="0.375" r="0.08" fill="#C9A227" opacity="0.12" />
          </pattern>
          
          {/* High-Fidelity Mask Pattern for crisp, non-clipping continuous digital pixel dots */}
          <pattern id="dot-mask-pattern" width="0.75" height="0.75" patternUnits="userSpaceOnUse">
            <circle cx="0.375" cy="0.375" r="0.25" fill="white" />
          </pattern>
          
          <mask id="dot-matrix-mask">
            <rect x="0" y="0" width="100" height="100" fill="black" />
            <rect x="0" y="0" width="100" height="100" fill="url(#dot-mask-pattern)" />
          </mask>
        </defs>

        {/* Subtle grid latitude / longitude lines */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        
        <line x1="20" y1="0" x2="20" y2="100" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        <line x1="40" y1="0" x2="40" y2="100" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        <line x1="60" y1="0" x2="60" y2="100" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />
        <line x1="80" y1="0" x2="80" y2="100" stroke="#C9A227" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.15" />

        {/* Archival Double-Border Frame */}
        <rect x="0.5" y="0.5" width="99" height="99" fill="none" stroke="#C9A227" strokeWidth="0.12" opacity="0.25" />
        <rect x="1.2" y="1.2" width="97.6" height="97.6" fill="none" stroke="#C9A227" strokeWidth="0.05" opacity="0.15" />

        {/* Border Ticks for Vintage Atlas Feel */}
        {Array.from({ length: 21 }).map((_, i) => {
          const pos = i * 5;
          return (
            <g key={`tick-${i}`}>
              {/* Top edge */}
              <line x1={pos} y1={0.5} x2={pos} y2={pos % 10 === 0 ? 1.8 : 1.2} stroke="#C9A227" strokeWidth="0.08" opacity="0.3" />
              {/* Bottom edge */}
              <line x1={pos} y1={99.5} x2={pos} y2={pos % 10 === 0 ? 98.2 : 98.8} stroke="#C9A227" strokeWidth="0.08" opacity="0.3" />
              {/* Left edge */}
              <line x1={0.5} y1={pos} x2={pos % 10 === 0 ? 1.8 : 1.2} y2={pos} stroke="#C9A227" strokeWidth="0.08" opacity="0.3" />
              {/* Right edge */}
              <line x1={99.5} y1={pos} x2={pos % 10 === 0 ? 98.2 : 98.8} y2={pos} stroke="#C9A227" strokeWidth="0.08" opacity="0.3" />
            </g>
          );
        })}

        {/* Latitude Labels */}
        <text x="2" y="19.2" fill="#C9A227" fontSize="0.75" fontFamily="monospace" opacity="0.25">20°N</text>
        <text x="2" y="39.2" fill="#C9A227" fontSize="0.75" fontFamily="monospace" opacity="0.25">40°N</text>
        <text x="2" y="59.2" fill="#C9A227" fontSize="0.75" fontFamily="monospace" opacity="0.25">60°N</text>
        <text x="2" y="79.2" fill="#C9A227" fontSize="0.75" fontFamily="monospace" opacity="0.25">80°N</text>

        {/* Longitude Labels */}
        <text x="40" y="2.5" fill="#C9A227" fontSize="0.75" fontFamily="monospace" textAnchor="middle" opacity="0.25">40°W</text>
        <text x="60" y="2.5" fill="#C9A227" fontSize="0.75" fontFamily="monospace" textAnchor="middle" opacity="0.25">0°</text>
        <text x="80" y="2.5" fill="#C9A227" fontSize="0.75" fontFamily="monospace" textAnchor="middle" opacity="0.25">40°E</text>

        {/* Ocean Labels */}
        <text x="36" y="38" fill="#C9A227" fontSize="1" fontFamily="serif" fontStyle="italic" letterSpacing="0.2" opacity="0.25" textAnchor="middle">North Atlantic</text>
        <text x="38" y="66" fill="#C9A227" fontSize="1" fontFamily="serif" fontStyle="italic" letterSpacing="0.2" opacity="0.2" textAnchor="middle">South Atlantic</text>
        <text x="65" y="68" fill="#C9A227" fontSize="0.9" fontFamily="serif" fontStyle="italic" letterSpacing="0.15" opacity="0.2" textAnchor="middle">Indian Ocean</text>
        <text x="10" y="58" fill="#C9A227" fontSize="0.9" fontFamily="serif" fontStyle="italic" letterSpacing="0.2" opacity="0.15" textAnchor="middle">Pacific Ocean</text>

        {/* Elegant Compass Rose */}
        <g opacity="0.6">
          <circle cx="88" cy="20" r="4" fill="none" stroke="#C9A227" strokeWidth="0.08" opacity="0.3" strokeDasharray="0.5, 0.5" />
          <circle cx="88" cy="20" r="4.5" fill="none" stroke="#C9A227" strokeWidth="0.05" opacity="0.2" />
          {/* Compass Points */}
          <path d="M 88,15 L 88.5,20 L 88,20 Z" fill="#C9A227" />
          <path d="M 88,15 L 87.5,20 L 88,20 Z" fill="#8E701C" />
          <path d="M 88,25 L 88.5,20 L 88,20 Z" fill="#8E701C" />
          <path d="M 88,25 L 87.5,20 L 88,20 Z" fill="#C9A227" />
          <path d="M 93,20 L 88,20.5 L 88,20 Z" fill="#C9A227" />
          <path d="M 93,20 L 88,19.5 L 88,20 Z" fill="#8E701C" />
          <path d="M 83,20 L 88,20.5 L 88,20 Z" fill="#8E701C" />
          <path d="M 83,20 L 88,19.5 L 88,20 Z" fill="#C9A227" />
          {/* Compass sub-points */}
          <path d="M 84.46,16.46 L 88,20 L 88,19.5 Z" fill="#8E701C" opacity="0.6" />
          <path d="M 84.46,16.46 L 88,20 L 87.5,20 Z" fill="#C9A227" opacity="0.6" />
          <path d="M 91.54,23.54 L 88,20 L 88,20.5 Z" fill="#C9A227" opacity="0.6" />
          <path d="M 91.54,23.54 L 88,20 L 88.5,20 Z" fill="#8E701C" opacity="0.6" />
          <path d="M 91.54,16.46 L 88,20 L 88,19.5 Z" fill="#C9A227" opacity="0.6" />
          <path d="M 91.54,16.46 L 88,20 L 88.5,20 Z" fill="#8E701C" opacity="0.6" />
          <path d="M 84.46,23.54 L 88,20 L 88,20.5 Z" fill="#8E701C" opacity="0.6" />
          <path d="M 84.46,23.54 L 88,20 L 87.5,20 Z" fill="#C9A227" opacity="0.6" />
          
          <circle cx="88" cy="20" r="0.6" fill="#0B0B0B" stroke="#C9A227" strokeWidth="0.15" />
          <text x="88" y="14" fill="#C9A227" fontSize="1.2" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
          <text x="88" y="26.6" fill="#C9A227" fontSize="1.2" fontFamily="monospace" textAnchor="middle" fontWeight="bold">S</text>
        </g>

        {/* Faint overall digital grid dots establishing background pixel structure */}
        <rect width="100" height="100" fill="url(#grid-dots)" pointerEvents="none" />

        {/* High-Fidelity Dotted World Landmasses with Dynamic Gold-to-Teal-Blue Gradient */}
        <g mask="url(#dot-matrix-mask)">
          {landmasses.map((land) => (
            <path
              key={land.name}
              d={land.d}
              fill="url(#land-gradient)"
              opacity="0.95"
            />
          ))}

          {/* Southeast Asia Islands & extra Pacific details mapped dynamically in the dot-grid */}
          <path
            d="M 78,50 Q 82,54 84,60 T 78,65"
            fill="none"
            stroke="url(#land-gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
        <circle cx="75" cy="55" r="0.4" fill="#C9A227" opacity="0.35" />
        <circle cx="80" cy="58" r="0.4" fill="#C9A227" opacity="0.35" />
        <circle cx="82" cy="62" r="0.4" fill="#C9A227" opacity="0.35" />

        {/* 2. GEOGRAPHICAL WATERWAYS VITAL TO JAZZ DEVELOPMENT */}
        {/* Mississippi River System - 'The Main Highway of the Great Migration' */}
        <g opacity="0.75" id="mississippi-river-route">
          <path
            d="M 24.2,38.5 Q 22.0,41.0 23.5,48.0"
            fill="none"
            stroke="#204050"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 24.2,38.5 Q 22.0,41.0 23.5,48.0"
            fill="none"
            stroke="#C9A227"
            strokeWidth="0.12"
            strokeDasharray="0.8, 1.2"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Subtle elegant label oriented along the river flow */}
          <text
            x="21.5"
            y="43.5"
            fill="#C9A227"
            fontSize="0.65"
            fontFamily="serif"
            fontStyle="italic"
            letterSpacing="0.05"
            opacity="0.6"
            transform="rotate(-72, 21.5, 43.5)"
          >
            Mississippi River
          </text>
        </g>

        {/* Great Lakes Detail - Anchoring Chicago's geography */}
        <g opacity="0.6" id="great-lakes-geography">
          <path
            d="M 23.8,36.2 C 24.1,35.8 24.7,35.9 25.1,36.1 C 25.4,36.5 24.8,37.2 24.3,37.0 C 23.9,36.8 23.6,36.4 23.8,36.2 Z"
            fill="#122530"
            stroke="#C9A227"
            strokeWidth="0.1"
            strokeOpacity="0.3"
          />
          <text x="25.5" y="35.5" fill="#C9A227" fontSize="0.5" fontFamily="monospace" opacity="0.4">Great Lakes</text>
        </g>

        {/* Dynamic labels for high-importance space associations */}
        <g opacity="0.45" pointerEvents="none">
          <text x="21.0" y="52.2" fill="#C9A227" fontSize="0.6" fontFamily="monospace" letterSpacing="0.1" textAnchor="middle">GULF OF MEXICO</text>
          <text x="18.5" y="47.5" fill="#C9A227" fontSize="0.55" fontFamily="serif" fontStyle="italic" opacity="0.7" textAnchor="end">West Coast Route</text>
          <text x="36.5" y="33.0" fill="#C9A227" fontSize="0.55" fontFamily="serif" fontStyle="italic" opacity="0.7">Transatlantic Passage</text>
          <text x="36.0" y="79.5" fill="#C9A227" fontSize="0.55" fontFamily="serif" fontStyle="italic" opacity="0.7">Bossa Nova Coast</text>
        </g>

        {/* 3. DRAWING JAZZ MIGRATION CHANNELS (ANIMATED FLOW LINES) */}
        {activeFlows.map((flow) => {
          // Construct Bezier Path
          const coords = flow.coordinates;
          if (coords.length < 2) return null;
          
          let pathD = `M ${coords[0].x} ${coords[0].y}`;
          if (coords.length === 2) {
            pathD += ` L ${coords[1].x} ${coords[1].y}`;
          } else if (coords.length === 3) {
            pathD += ` Q ${coords[1].x} ${coords[1].y} ${coords[2].x} ${coords[2].y}`;
          } else {
            pathD += ` C ${coords[1].x} ${coords[1].y} ${coords[2].x} ${coords[2].y} ${coords[3].x} ${coords[3].y}`;
          }

          return (
            <g key={flow.id}>
              {/* Glow background line */}
              <path
                d={pathD}
                fill="none"
                stroke="#C9A227"
                strokeWidth="0.4"
                strokeLinecap="round"
                opacity="0.2"
              />
              {/* Main dashed active flow line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#C9A227"
                strokeWidth="0.25"
                strokeDasharray="1.5, 1.5"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
                opacity="0.8"
              />
            </g>
          );
        })}
      </svg>

      {/* 4. HTML OVERLAY FOR INTERACTIVE CITY NODE MARKERS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {cities.map((city) => {
          const isActive = isCityActiveInDecade(city, selectedDecade);
          const isCurrentlySelected = activeCityId === city.id;
          const isHovered = hoveredCityId === city.id;

          return (
            <div
              key={city.id}
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              {/* Click target wrapper */}
              <button
                onClick={() => {
                  setActiveCityId(isCurrentlySelected ? null : city.id);
                  onSelectCity(city);
                }}
                onMouseEnter={() => setHoveredCityId(city.id)}
                onMouseLeave={() => setHoveredCityId(null)}
                className="relative flex items-center justify-center p-3 focus:outline-hidden"
              >
                {/* Visual Ring Animation for Active Era Nodes */}
                {isActive && (
                  <>
                    <span className="absolute w-6 h-6 rounded-full bg-[#C9A227]/20 animate-ping opacity-60"></span>
                    <span className="absolute w-9 h-9 rounded-full bg-[#C9A227]/10 animate-pulse opacity-40"></span>
                  </>
                )}

                {/* Inner Pin Point */}
                <div
                  className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isCurrentlySelected
                      ? "bg-[#C9A227] scale-150 ring-4 ring-[#C9A227]/30"
                      : isActive
                      ? "bg-[#C9A227] ring-2 ring-amber-500/20 group-hover:scale-125"
                      : "bg-zinc-700 hover:bg-zinc-500 scale-90"
                  }`}
                />

                {/* City Label floating text */}
                <div
                  className={`absolute top-full mt-1 px-1.5 py-0.5 rounded text-[9px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 ${
                    isCurrentlySelected
                      ? "bg-[#C9A227] text-[#08080a] font-bold z-30 opacity-100 scale-105 shadow-md"
                      : isHovered
                      ? "bg-zinc-800 text-white z-30 opacity-100 scale-100"
                      : isActive
                      ? "text-zinc-200 opacity-80"
                      : "text-zinc-500 opacity-40"
                  }`}
                >
                  {city.chineseName}
                </div>
              </button>

              {/* Dynamic Popup Hover Card */}
              <AnimatePresence>
                {isHovered && !isCurrentlySelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-[#121212]/95 border border-[#C9A227]/30 p-3.5 rounded-lg shadow-2xl backdrop-blur-md z-40 text-left pointer-events-none"
                  >
                    {/* Golden decorative accent line */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent rounded-t-lg"></div>

                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h4 className="text-sm serif font-bold text-[#E0E0E0]">
                          {city.name}
                        </h4>
                        <p className="text-[10px] font-mono text-[#C9A227] tracking-wider uppercase font-bold">
                          {city.chineseName} · {city.country}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20 font-semibold">
                        {city.period}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-2 line-clamp-2 font-sans">
                      {city.description}
                    </p>

                    <div className="border-t border-[#C9A227]/10 pt-1.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
                        <Music className="w-2.5 h-2.5 text-[#C9A227]/75 shrink-0" />
                        <span className="truncate">
                          <strong className="text-zinc-300">代表流派:</strong>{" "}
                          {city.keyGenres.join(", ")}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-center text-[9px] font-mono text-zinc-500 animate-pulse">
                      点击城市节点查看历史全景与音乐家谱系 ✦
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 5. ACTIVE MIGRATION ERA HIGHLIGHT NOTIFICATION */}
      <div className="absolute bottom-3 right-3 bg-[#121212]/90 border border-[#C9A227]/30 p-2.5 rounded-lg max-w-[280px] backdrop-blur-md pointer-events-none hidden md:block shadow-2xl">
        <h5 className="text-[10px] font-bold tracking-wider text-[#C9A227] uppercase font-mono mb-1 flex items-center gap-1">
          <Navigation className="w-3 h-3 animate-pulse" />
          <span>Active Sounds ({selectedDecade}s)</span>
        </h5>
        <p className="text-[10px] text-zinc-400 leading-normal line-clamp-2 font-sans">
          {selectedDecade === 1890 && "Ragtime 钢琴切分音正在新奥尔良刚果广场与酒馆中汇聚，孕育早期摇摆。"}
          {selectedDecade === 1900 && "Dixieland 传统爵士开始在新奥尔良成形，集体即兴的号角在此吹响。"}
          {selectedDecade === 1910 && "大迁徙（Great Migration）的序幕揭开，音乐家乘密西西比河轮船沿江北上芝加哥。"}
          {selectedDecade === 1920 && "哈林文艺复兴爆发，摇摆大乐团（Swing Big Band）在纽约棉花俱乐部点燃黑夜。"}
          {selectedDecade === 1930 && "堪萨斯城夜间即兴对抗赛空前激烈，摇摆乐成为全美大萧条时期的精神避难所。"}
          {selectedDecade === 1940 && "52街夜总会爆发波普（Bebop）革命，拉丁非裔古巴爵士（Afro-Cuban）热烈碰撞。"}
          {selectedDecade === 1950 && "冷爵士（Cool Jazz）在西海岸流淌，优雅的 Bossa Nova 在里约热内卢海滩破晓。"}
          {selectedDecade === 1960 && "调式爵士（Modal Jazz）的静谧深邃，自由爵士（Free Jazz）咆咆，突破传统和声禁区。"}
          {selectedDecade === 1970 && "插电融合爵士（Fusion）大放异彩。Miles Davis 开启电气迷幻乐章。"}
          {selectedDecade === 1980 && "Blue Note 俱乐部等新殿堂重燃现场热火，传统硬波普与新古典爵士在世界交汇。"}
          {selectedDecade >= 1990 && "当代爵士进入多元电子、北欧极简、伦敦新非洲融合的跨界无疆探索时代。"}
        </p>
      </div>
    </div>
  );
}

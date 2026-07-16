import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, Disc, Volume2, VolumeX, Music, Sliders, ListMusic, Sparkles, Flame, History, Award } from "lucide-react";
import ListeningAnchor from "./ListeningAnchor";

interface AudioPlayerProps {
  preset: string; // "traditional" | "classic-swing" | "modal-blue" | "bossa-breeze" | "fusion-odyssey" etc.
  cityName: string;
  selectedDecade?: number;
  activeTrackId?: string;
  onTrackChange?: (trackId: string) => void;
  isPlayingGlobal?: boolean;
  onIsPlayingChange?: (isPlaying: boolean) => void;
  activeTab?: string;
  setActiveTab?: (tab: "city" | "network" | "clubs" | "journal") => void;
}

// COMPLETE HISTORICAL JAZZ FREQUENCY TABLE (Accidental-robust, high and low ranges)
const NOTES: Record<string, number> = {
  // Octave 1
  "Bb1": 58.27, "B1": 61.74,
  // Octave 2
  "C2": 65.41, "C#2": 69.30, "Db2": 69.30, "D2": 73.42, "D#2": 77.78, "Eb2": 77.78, "E2": 82.41, "F2": 87.31, "F#2": 92.50, "Gb2": 92.50, "G2": 98.00, "G#2": 103.83, "Ab2": 103.83, "A2": 110.00, "A#2": 116.54, "Bb2": 116.54, "B2": 123.47,
  // Octave 3
  "C3": 130.81, "C#3": 138.59, "Db3": 138.59, "D3": 146.83, "D#3": 155.56, "Eb3": 155.56, "E3": 164.81, "F3": 174.61, "F#3": 185.00, "Gb3": 185.00, "G3": 196.00, "G#3": 207.65, "Ab3": 207.65, "A3": 220.00, "A#3": 233.08, "Bb3": 233.08, "B3": 246.94,
  // Octave 4
  "C4": 261.63, "C#4": 277.18, "Db4": 277.18, "D4": 293.66, "D#4": 311.13, "Eb4": 311.13, "E4": 329.63, "F4": 349.23, "F#4": 369.99, "Gb4": 369.99, "G4": 392.00, "G#4": 415.30, "Ab4": 415.30, "A4": 440.00, "A#4": 466.16, "Bb4": 466.16, "B4": 493.88,
  // Octave 5
  "C5": 523.25, "C#5": 554.37, "Db5": 554.37, "D5": 587.33, "D#5": 622.25, "Eb5": 622.25, "E5": 659.25, "F5": 698.46, "F#5": 739.99, "Gb5": 739.99, "G5": 783.99, "G#5": 830.61, "Ab5": 830.61, "A5": 880.00, "A#5": 932.33, "Bb5": 932.33, "B5": 987.77,
  // Octave 6
  "C6": 1046.50, "C#6": 1108.73, "Db6": 1108.73, "D6": 1174.66, "E6": 1318.51, "F6": 1396.91, "G6": 1567.98
};

// PRESET AMBIENT JAZZ CHORD PROGRESSIONS
const PROGRESSIONS: Record<string, { chords: string[][]; bass: string[]; tempo: number }> = {
  "traditional": {
    chords: [
      ["C4", "E4", "G4", "Bb4"], // C7
      ["F4", "A4", "C5", "Eb5"], // F7
      ["C4", "E4", "G4", "Bb4"], // C7
      ["G4", "B4", "D5", "F5"]   // G7
    ],
    bass: ["C2", "G2", "F2", "C3", "C2", "E2", "G2", "B2"],
    tempo: 140
  },
  "classic-swing": {
    chords: [
      ["C4", "Eb4", "G4", "A4"],  // Cmin6
      ["F4", "Ab4", "C5", "D5"],  // F7
      ["C4", "Eb4", "G4", "A4"],  // Cmin6
      ["G4", "B4", "D5", "F5"]    // G7
    ],
    bass: ["C3", "G2", "F2", "A2", "C3", "Eb3", "D3", "G3"],
    tempo: 120
  },
  "modal-blue": {
    chords: [
      ["D4", "F4", "A4", "C5", "E5"],  // Dmin9 (smoky, gorgeous modal chord)
      ["G4", "B4", "F5", "A5", "E5"],  // G13
      ["C4", "E4", "G4", "B4", "D5"],  // Cmaj9
      ["Bb4", "D5", "F5", "A5", "C6"]  // Bbmaj9
    ],
    bass: ["D2", "A2", "G2", "D3", "C2", "G2", "Bb2", "F3"],
    tempo: 80
  },
  "bossa-breeze": {
    chords: [
      ["D4", "F#4", "A4", "C#5", "E5"], // Dmaj9
      ["B3", "D#4", "F#4", "A4", "C#5"], // B7(9)
      ["E4", "G4", "B4", "D5", "F#5"],  // Emin9
      ["A3", "C#4", "G4", "B4", "E5"]   // A9
    ],
    bass: ["D2", "A2", "B2", "F#2", "E2", "B2", "A2", "E2"],
    tempo: 96
  },
  "west-coast": {
    chords: [
      ["F4", "A4", "C5", "E5"], // Fmaj7
      ["G4", "B4", "D5", "F#5"], // Gmaj7
      ["E4", "G4", "B4", "D5"],  // Emin7
      ["A4", "C#5", "E5", "G5"]  // A7
    ],
    bass: ["F2", "C3", "G2", "D3", "E2", "B2", "A2", "E3"],
    tempo: 84
  },
  "gypsy-waltz": {
    chords: [
      ["A3", "C4", "E4", "G4"], // Amin7
      ["D4", "F#4", "A4", "C5"], // D7
      ["G3", "B3", "D4", "F#4"], // Gmaj7
      ["C4", "E4", "G4", "B4"]  // Cmaj7
    ],
    bass: ["A2", "E2", "D2", "A2", "G2", "D2", "C2", "G2"],
    tempo: 110
  },
  "tokyo-bop": {
    chords: [
      ["C4", "Eb4", "G4", "Bb4", "D5"], // Cmin9
      ["F4", "A4", "Eb5", "G5", "D5"],  // F9
      ["Bb3", "D4", "F4", "A4", "C5"],  // Bbmaj9
      ["Db4", "F4", "Ab4", "C5"]        // Dbmaj7
    ],
    bass: ["C3", "C3", "F2", "F2", "Bb2", "Bb2", "Db2", "Db2"],
    tempo: 130
  },
  "cuban-fire": {
    chords: [
      ["G4", "B4", "D5", "F5", "Ab5"], // G7(b9)
      ["C4", "Eb4", "G4", "Bb4", "D5"], // Cmin9
      ["D4", "F#4", "C5", "Eb5", "Ab5"], // D7(b9)
      ["G4", "Bb4", "D5", "F5"]         // Gmin7
    ],
    bass: ["G2", "D3", "C3", "G3", "D2", "A2", "G2", "D3"],
    tempo: 132
  },
  "london-groove": {
    chords: [
      ["A3", "C4", "F4", "G4", "C5"], // Fadd9/A
      ["Bb3", "D4", "F4", "G4", "C5"], // Bb6/9
      ["G3", "C4", "Eb4", "G4", "Bb4"], // Cmin7/G
      ["A3", "C#4", "E4", "G4", "B4"]  // A7(9)
    ],
    bass: ["A2", "Bb2", "G2", "A2", "A2", "Bb2", "G2", "A2"],
    tempo: 105
  }
};

// INTERACTIVE HISTORICAL MASTERPIECES DATABASE
interface ClassicTrack {
  id: string;
  title: string;
  chineseTitle: string;
  artist: string;
  chineseArtist: string;
  decade: number;
  style: string;
  styleChinese: string;
  tempo: number;
  description: string;
  chords: Record<number, string[]>;
  bassNotes: Record<number, string>;
  melodyNotes: Record<number, string>;
  patternLength: number;
  audioUrl: string;
  album: string;
  recordingYear: number;
  recordLabel: string;
  sourcePlatform: string;
  signatureExcerpt: string;
}

const CLASSIC_TRACKS: ClassicTrack[] = [
  {
    id: "west-end-blues",
    title: "West End Blues",
    chineseTitle: "西区布鲁斯",
    artist: "Louis Armstrong",
    chineseArtist: "路易斯·阿姆斯特朗",
    decade: 1920,
    style: "Dixieland / Traditional",
    styleChinese: "新奥尔良传统爵士",
    tempo: 82,
    description: "1928年录音，将爵士乐确立为突出个人即兴灵魂的Solo艺术。慢速抒情的忧郁小号，开创不朽的爵士黑胶先河。",
    audioUrl: "https://archive.org/download/78_west-end-blues_louis-armstrong-and-his-hot-five_gbia0004975a/78_west-end-blues_louis-armstrong-and-his-hot-five_gbia0004975a_vbr.mp3",
    chords: {
      0: ["Eb3", "G3", "Bb3", "Db4"],
      4: ["Ab3", "C4", "Eb4", "Gb4"],
      8: ["Eb3", "G3", "Bb3", "Db4"],
      12: ["Bb3", "D4", "F4", "Ab4"]
    },
    bassNotes: {
      0: "Eb2", 4: "Ab2", 8: "Eb2", 12: "Bb2"
    },
    melodyNotes: {
      0: "Bb4", 2: "G4", 4: "Ab4", 6: "Bb4", 8: "C5", 10: "Bb4", 12: "G4", 14: "Eb4"
    },
    patternLength: 16,
    album: "West End Blues (Single)",
    recordingYear: 1928,
    recordLabel: "Okeh Records (Decca)",
    sourcePlatform: "Internet Archive (78 RPM Digital Archive)",
    signatureExcerpt: "开场惊世骇俗的无伴奏小号Solo独奏引子 (Opening Virtuoso Trumpet Cadenza)"
  },
  {
    id: "take-the-a-train",
    title: "Take the 'A' Train",
    chineseTitle: "搭乘A号列车",
    artist: "Duke Ellington",
    chineseArtist: "艾灵顿公爵与乐团",
    decade: 1930,
    style: "Swing / Big Band",
    styleChinese: "大乐团摇摆乐",
    tempo: 126,
    description: "大乐团摇摆时代的终极代表作，模仿纽约地铁路线上行奔驰的切分律动，流淌着大都会的自信与浪漫。",
    audioUrl: "https://archive.org/download/78_take-the-a-train_duke-ellington-and-his-famous-orchestra-billy-strayhorn_gbia0005720b/78_take-the-a-train_duke-ellington-and-his-famous-orchestra-billy-strayhorn_gbia0005720b_vbr.mp3",
    chords: {
      0: ["C4", "E4", "G4", "B4"],
      8: ["D4", "F#4", "Ab4", "C5"]
    },
    bassNotes: {
      0: "C2", 2: "E2", 4: "G2", 6: "A2", 8: "D2", 10: "F#2", 12: "Ab2", 14: "C3"
    },
    melodyNotes: {
      0: "G4", 2: "E5", 3: "D5", 5: "C5", 8: "A4", 10: "F#5", 11: "E5", 13: "D5"
    },
    patternLength: 16,
    album: "Take the 'A' Train (Single)",
    recordingYear: 1941,
    recordLabel: "Victor Records",
    sourcePlatform: "Internet Archive (78 RPM Preservation Project)",
    signatureExcerpt: "经典且广为人知的“大乐团铜管切分与萨克斯声部齐奏主题”"
  },
  {
    id: "ornithology",
    title: "Ornithology",
    chineseTitle: "鸟类学",
    artist: "Charlie Parker",
    chineseArtist: "查利·帕克",
    decade: 1940,
    style: "Bebop",
    styleChinese: "波普爵士 (Bebop)",
    tempo: 160,
    description: "52街咆哮波普革命的圣经。极速狂飙的半音阶跑句和大胆切分，将爵士乐推进为高深严谨的现代器乐艺术。",
    audioUrl: "https://archive.org/download/78_ornithology_charlie-parker-septet-charlie-parker-miles-davis-lucky-thompson-dodo_gbia0011504a/78_ornithology_charlie-parker-septet-charlie-parker-miles-davis-lucky-thompson-dodo_gbia0011504a_vbr.mp3",
    chords: {
      0: ["G3", "B3", "D4", "F#4"],
      8: ["G3", "Bb3", "D4", "F4"]
    },
    bassNotes: {
      0: "G2", 2: "B2", 4: "D3", 6: "F#3", 8: "G2", 10: "Bb2", 12: "D3", 14: "F3"
    },
    melodyNotes: {
      0: "G4", 1: "F#4", 2: "G4", 3: "A4", 4: "Bb4", 5: "A4", 6: "Bb4", 7: "C5", 8: "D5", 9: "C5", 10: "Bb4", 11: "A4", 12: "G4", 13: "F4", 14: "E4", 15: "D4"
    },
    patternLength: 16,
    album: "Ornithology (Single)",
    recordingYear: 1946,
    recordLabel: "Dial Records",
    sourcePlatform: "Internet Archive (Classic 78 RPM Sessions)",
    signatureExcerpt: "查利·帕克与迈尔斯·戴维斯标志性的“极速波普不协和齐奏跑音主题”"
  },
  {
    id: "take-five",
    title: "Take Five",
    chineseTitle: "休息五分钟",
    artist: "Dave Brubeck",
    chineseArtist: "戴夫·布鲁贝克",
    decade: 1950,
    style: "Cool Jazz",
    styleChinese: "西海岸冷爵士",
    tempo: 116,
    description: "突破传统的4/4拍禁区，使用异国情调的5/4奇拍。优雅淡薄的学院风骨与迷人跳脱的萨克斯主题完美结合。",
    audioUrl: "https://ireadwell.com/media/Take%20Five.mp3",
    chords: {
      0: ["Eb4", "Gb4", "Bb4", "Db5"],
      4: ["Bb3", "Db4", "F4", "Ab4"],
      8: ["Eb4", "Gb4", "Bb4", "Db5"]
    },
    bassNotes: {
      0: "Eb2", 2: "Bb2", 4: "Db3", 6: "Eb2", 8: "Bb2"
    },
    melodyNotes: {
      0: "Bb4", 2: "Gb4", 3: "Ab4", 4: "Bb4", 6: "Ab4", 8: "Gb4"
    },
    patternLength: 10,
    album: "Time Out",
    recordingYear: 1959,
    recordLabel: "Columbia Records",
    sourcePlatform: "Spotify Preview / Official Audio Feed",
    signatureExcerpt: "标志性的 5/4 奇数拍爵士钢琴低沉和声循环与轻盈鼓点律动"
  },
  {
    id: "so-what",
    title: "So What",
    chineseTitle: "那又怎样",
    artist: "Miles Davis",
    chineseArtist: "迈尔斯·戴维斯",
    decade: 1960,
    style: "Modal Jazz",
    styleChinese: "调式爵士 (Modal)",
    tempo: 130,
    description: "划时代巨作《Kind of Blue》开篇曲。低音大提琴先发出疑问，钢琴弹出温润如玉的‘So What’两声回应。",
    audioUrl: "https://archive.org/download/KindofBlue_201610/01%20-%20So%20What.mp3",
    chords: {
      13: ["E4", "G4", "A4", "D5", "G5"],
      15: ["D4", "F4", "G4", "C5", "F5"]
    },
    bassNotes: {
      0: "D2", 1: "E2", 2: "F2", 3: "G2", 4: "A2", 6: "D3", 7: "C3", 8: "A2", 9: "C3", 10: "B2", 11: "G2", 12: "A2"
    },
    melodyNotes: {},
    patternLength: 16,
    album: "Kind of Blue",
    recordingYear: 1959,
    recordLabel: "Columbia Records",
    sourcePlatform: "Spotify Preview / Official Audio Feed",
    signatureExcerpt: "开头最著名的“低音大提琴Solo发问 + 钢琴两声和声‘So What’回应 + 迈尔斯·戴维斯第一句号角”"
  },
  {
    id: "my-favorite-things",
    title: "My Favorite Things",
    chineseTitle: "我的至爱",
    artist: "John Coltrane",
    chineseArtist: "约翰·柯川",
    decade: 1960,
    style: "Modal Jazz",
    styleChinese: "前卫调式爵士",
    tempo: 138,
    description: "1960年录制，柯川在考珀（Soprano）萨克斯上的旷世炫技。将百老汇通俗插曲重构为充满宗教神圣感的东方色彩调式冥想。",
    audioUrl: "https://archive.org/download/lp_my-favorite-things_john-coltrane/lp_my-favorite-things_john-coltrane_vbr.mp3",
    chords: {
      0: ["E4", "G4", "B4", "D5"],
      4: ["C4", "E4", "G4", "B4"],
      8: ["A3", "C4", "E4", "G4"],
      12: ["F#4", "A4", "C5", "E5"]
    },
    bassNotes: {
      0: "E2", 4: "C2", 8: "A2", 12: "F#2"
    },
    melodyNotes: {
      0: "B4", 2: "E5", 4: "B4", 6: "E5", 8: "F#5", 10: "E5", 12: "D#5", 14: "B4"
    },
    patternLength: 16,
    album: "My Favorite Things",
    recordingYear: 1960,
    recordLabel: "Atlantic Records",
    sourcePlatform: "Atlantic Records Official Audio",
    signatureExcerpt: "高音萨克斯以 3/4 拍华丽盘旋，在狂风骤雨的和弦铺垫中吹出经典主旋律段落"
  },
  {
    id: "girl-from-ipanema",
    title: "The Girl from Ipanema",
    chineseTitle: "伊帕内玛姑娘",
    artist: "A.C. Jobim",
    chineseArtist: "安东尼奥·卡洛斯·乔宾",
    decade: 1960,
    style: "Bossa Nova",
    styleChinese: "波萨诺瓦",
    tempo: 110,
    description: "里约热内卢海风在键盘与尼龙弦吉他上的流淌。桑巴切分去粗存精，染上西海岸酷爵士的优雅，慵懒而感性。",
    audioUrl: "https://archive.org/download/stan-getz-joao-gilberto-the-girl-from-ipanema-1964/stan-getz-joao-gilberto-the-girl-from-ipanema-1964.mp3",
    chords: {
      1: ["F3", "A3", "C4", "E4"],
      5: ["F3", "A3", "C4", "E4"],
      9: ["G3", "B3", "D4", "F4"],
      13: ["G3", "B3", "D4", "F4"]
    },
    bassNotes: {
      0: "F2", 2: "C3", 4: "F2", 6: "C3", 8: "G2", 10: "D3", 12: "G2", 14: "D3"
    },
    melodyNotes: {
      0: "G4", 2: "F4", 4: "G4", 6: "F4", 8: "G4", 10: "F4", 12: "D4"
    },
    patternLength: 16,
    album: "Getz/Gilberto",
    recordingYear: 1963,
    recordLabel: "Verve Records",
    sourcePlatform: "Verve Records Official Audio / Spotify Preview",
    signatureExcerpt: "温暖慵懒的古典吉他切分前奏与João Gilberto经典的首句葡萄牙语温和低吟"
  },
  {
    id: "chameleon",
    title: "Chameleon",
    chineseTitle: "变色龙",
    artist: "Herbie Hancock",
    chineseArtist: "赫比·汉考克",
    decade: 1970,
    style: "Jazz Fusion",
    styleChinese: "插电融合爵士 / Funk",
    tempo: 94,
    description: "1973年融合重磅。迷幻、极其上头、沉重有力的模拟合成器贝斯，配合放克鼓点，打破了爵士与摇滚的隔阂。",
    audioUrl: "https://archive.org/download/HerbieHancockChameleon/Chameleon.mp3",
    chords: {
      2: ["Bb3", "Db4", "F4", "Ab4"],
      10: ["Eb4", "G4", "Bb4", "Db5"]
    },
    bassNotes: {
      0: "Bb1", 2: "Bb1", 4: "Db2", 5: "Eb2", 6: "F2", 8: "Eb2", 10: "Db2", 12: "Bb1", 14: "F2"
    },
    melodyNotes: {
      3: "F4", 5: "Ab4", 6: "Bb4", 8: "Ab4", 11: "F4", 13: "Eb4"
    },
    patternLength: 16,
    album: "Head Hunters",
    recordingYear: 1973,
    recordLabel: "Columbia Records",
    sourcePlatform: "Columbia Legacy Official Audio",
    signatureExcerpt: "经典的 ARP Odyssey 模拟合成器肥厚贝斯Loop，一听即入迷的太空放克律动"
  },
  {
    id: "strasbourg-st-denis",
    title: "Strasbourg / St. Denis",
    chineseTitle: "斯特拉斯堡-圣丹尼斯",
    artist: "Roy Hargrove",
    chineseArtist: "罗伊·哈格罗夫",
    decade: 2000,
    style: "Modern Hard Bop",
    styleChinese: "当代新硬波普",
    tempo: 98,
    description: "21世纪吹响的最让人上瘾的爵士旋律。冷峻、洒脱而温暖的都市律动，将新硬波普与灵魂放克完美融合。",
    audioUrl: "https://archive.org/download/RoyHargroveStrasbourgStDenis/StrasbourgStDenis.mp3",
    chords: {
      0: ["Ab3", "C4", "Eb4", "G4"],
      4: ["Bb3", "D4", "F4", "Ab4"],
      8: ["G3", "Bb3", "D4", "F4"],
      12: ["C4", "Eb4", "G4", "Bb4"]
    },
    bassNotes: {
      0: "Ab2", 2: "Ab2", 4: "Bb2", 6: "Bb2", 8: "G2", 10: "G2", 12: "C3", 14: "Bb2"
    },
    melodyNotes: {
      0: "C5", 2: "Bb4", 4: "G4", 6: "F4", 8: "G4", 10: "F4", 12: "Eb4", 14: "C4"
    },
    patternLength: 16,
    album: "Earfood",
    recordingYear: 2008,
    recordLabel: "Emarcy Records / Universal Music",
    sourcePlatform: "Spotify Preview / Licensed Official Audio Feed",
    signatureExcerpt: "当代极具传染性的冷峻、洒脱而温暖的小号与萨克斯精妙齐奏主题"
  }
];

export default function AudioPlayer({
  preset,
  cityName,
  selectedDecade = 1950,
  activeTrackId: propActiveTrackId,
  onTrackChange,
  isPlayingGlobal,
  onIsPlayingChange,
  activeTab = "city",
  setActiveTab,
}: AudioPlayerProps) {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const isPlaying = isPlayingGlobal !== undefined ? isPlayingGlobal : localIsPlaying;
  const setIsPlaying = (val: boolean | ((p: boolean) => boolean)) => {
    const nextVal = typeof val === "function" ? val(isPlaying) : val;
    if (onIsPlayingChange) onIsPlayingChange(nextVal);
    else setLocalIsPlaying(nextVal);
  };

  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBassStep, setCurrentBassStep] = useState(0);
  const [synthType, setSynthType] = useState<"triangle" | "sine" | "sawtooth">("triangle");
  const [playerMode, setPlayerMode] = useState<"classic" | "preset">("classic");
  
  // Choose the first track as default
  const [localActiveTrackId, setLocalActiveTrackId] = useState<string>("take-five");
  const activeTrackId = propActiveTrackId !== undefined ? propActiveTrackId : localActiveTrackId;
  const setActiveTrackId = (val: string) => {
    if (onTrackChange) onTrackChange(val);
    else setLocalActiveTrackId(val);
  };

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterVolumeRef = useRef<GainNode | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const html5AudioRef = useRef<HTMLAudioElement | null>(null);

  // Synchronous Web Audio Context activation to satisfy user gesture browser policy
  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      masterVolumeRef.current = audioCtxRef.current.createGain();
      masterVolumeRef.current.gain.value = isMuted ? 0 : 0.16; // Keep ambient smooth
      masterVolumeRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const handlePlayToggle = () => {
    ensureAudioContext();
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (html5AudioRef.current) {
      if (nextPlaying && playerMode === "classic") {
        html5AudioRef.current.play().catch((err) => {
          console.warn("Direct HTML5 Audio play failed:", err);
        });
      } else {
        html5AudioRef.current.pause();
      }
    }
  };

  // Background visualizer bar heights
  const [visHeights, setVisHeights] = useState<number[]>([15, 20, 25, 30, 25, 20, 15, 10]);

  // Retrieve matching active track object
  const activeTrack = CLASSIC_TRACKS.find(t => t.id === activeTrackId) || CLASSIC_TRACKS[3];

  // HTML5 audio synchronization for classic masterpieces
  useEffect(() => {
    if (!html5AudioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      html5AudioRef.current = audio;
    }

    const audio = html5AudioRef.current;

    if (playerMode === "classic" && activeTrack?.audioUrl) {
      if (audio.src !== activeTrack.audioUrl) {
        audio.src = activeTrack.audioUrl;
        audio.load();
      }

      audio.muted = isMuted;

      if (isPlaying) {
        audio.play().catch((err) => {
          console.warn("HTML5 Audio play failed (requires user gesture interaction):", err);
        });
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, activeTrack?.audioUrl, playerMode, isMuted]);

  // Clean up HTML5 audio on unmount
  useEffect(() => {
    return () => {
      if (html5AudioRef.current) {
        html5AudioRef.current.pause();
        html5AudioRef.current = null;
      }
    };
  }, []);

  // Auto-highlight track based on selectedDecade
  useEffect(() => {
    // Look up if any track matches current timeline decade selection
    const matchingTrack = CLASSIC_TRACKS.find(t => t.decade === selectedDecade);
    if (matchingTrack) {
      setActiveTrackId(matchingTrack.id);
    } else if (selectedDecade < 1930) {
      setActiveTrackId("west-end-blues");
    } else if (selectedDecade >= 1990) {
      setActiveTrackId("strasbourg-st-denis");
    }
  }, [selectedDecade]);

  // Keep a safe track of current city preset on render
  const safePreset = PROGRESSIONS[preset] ? preset : "modal-blue";

  // Trigger procedural sequencer loop
  useEffect(() => {
    if (isPlaying) {
      // 1. Initialize Audio Context lazily on user play interaction
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        masterVolumeRef.current = audioCtxRef.current.createGain();
        masterVolumeRef.current.gain.value = isMuted ? 0 : 0.16; // Keep ambient smooth
        masterVolumeRef.current.connect(audioCtxRef.current.destination);
      }

      // Resume context if suspended
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // 2. Start Sequencer interval based on BPM tempo and play mode
      let stepIntervalMs = 250;

      if (playerMode === "classic" && activeTrack) {
        const bpm = activeTrack.tempo;
        // Each step is an eighth note
        stepIntervalMs = (60 / bpm) * 1000 / 2;
      } else {
        const bpm = PROGRESSIONS[safePreset].tempo;
        // Chord shifts every 2 beats
        stepIntervalMs = (60 / bpm) * 1000 * 2;
      }

      let stepIdx = 0;
      let chordIdx = 0;
      let bassIdx = 0;

      // Reset steps
      setCurrentStep(0);
      setCurrentBassStep(0);

      const playSequence = () => {
        if (!audioCtxRef.current || !masterVolumeRef.current) return;
        const ctx = audioCtxRef.current;
        const volume = masterVolumeRef.current;

        if (playerMode === "classic" && activeTrack) {
          const currentStep = stepIdx % activeTrack.patternLength;

          // A. CHORD SYNTHESIS (FOR CLASSIC TRACK)
          const chordNotes = activeTrack.chords[currentStep];
          if (chordNotes && chordNotes.length > 0) {
            chordNotes.forEach((noteName) => {
              const freq = NOTES[noteName];
              if (!freq) return;

              const osc = ctx.createOscillator();
              const gainNode = ctx.createGain();
              
              osc.type = synthType;
              osc.frequency.value = freq;

              const now = ctx.currentTime;
              gainNode.gain.setValueAtTime(0, now);
              gainNode.gain.linearRampToValueAtTime(0.06, now + 0.1);
              gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

              osc.connect(gainNode);
              gainNode.connect(volume);
              
              osc.start(now);
              osc.stop(now + 2.2);
            });
          }

          // B. BASS SYNTHESIS (FOR CLASSIC TRACK)
          const bassNote = activeTrack.bassNotes[currentStep];
          if (bassNote) {
            const bassFreq = NOTES[bassNote];
            if (bassFreq) {
              const bassOsc = ctx.createOscillator();
              const bassGain = ctx.createGain();

              bassOsc.type = "sine";
              bassOsc.frequency.value = bassFreq;

              const playTime = ctx.currentTime;
              bassGain.gain.setValueAtTime(0, playTime);
              bassGain.gain.linearRampToValueAtTime(0.22, playTime + 0.05);
              bassGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.8);

              const filter = ctx.createBiquadFilter();
              filter.type = "lowpass";
              filter.frequency.value = 180;

              bassOsc.connect(filter);
              filter.connect(bassGain);
              bassGain.connect(volume);

              bassOsc.start(playTime);
              bassOsc.stop(playTime + 0.9);
            }
          }

          // C. MELODY SYNTHESIS (FOR CLASSIC TRACK)
          const melodyNote = activeTrack.melodyNotes[currentStep];
          if (melodyNote) {
            const melodyFreq = NOTES[melodyNote];
            if (melodyFreq) {
              const melOsc = ctx.createOscillator();
              const melGain = ctx.createGain();

              melOsc.type = synthType === "sawtooth" ? "sawtooth" : "triangle";
              melOsc.frequency.value = melodyFreq;

              const playTime = ctx.currentTime;
              melGain.gain.setValueAtTime(0, playTime);
              melGain.gain.linearRampToValueAtTime(0.12, playTime + 0.03);
              melGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.6);

              // Subtly highpass the melody to sound clean
              const melFilter = ctx.createBiquadFilter();
              melFilter.type = "highpass";
              melFilter.frequency.value = 200;

              melOsc.connect(melFilter);
              melFilter.connect(melGain);
              melGain.connect(volume);

              melOsc.start(playTime);
              melOsc.stop(playTime + 0.7);
            }
          }

          // Update step state for visuals
          setCurrentStep(currentStep);
          setCurrentBassStep(currentStep);

          stepIdx = (stepIdx + 1) % activeTrack.patternLength;

        } else {
          // Play generic city chord loop
          const currentStep = chordIdx % PROGRESSIONS[safePreset].chords.length;

          // A. CHORD
          const chordNotes = PROGRESSIONS[safePreset].chords[currentStep];
          chordNotes.forEach((noteName) => {
            const freq = NOTES[noteName];
            if (!freq) return;

            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = synthType;
            osc.frequency.value = freq;

            const now = ctx.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.08, now + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

            osc.connect(gainNode);
            gainNode.connect(volume);
            
            osc.start(now);
            osc.stop(now + 2.8);
          });

          // B. PLUCK BASS
          const bassNotes = PROGRESSIONS[safePreset].bass;
          const pluckBass = (idx: number, delaySec: number) => {
            const bassNote = bassNotes[idx % bassNotes.length];
            const bassFreq = NOTES[bassNote];
            if (!bassFreq) return;

            const bassOsc = ctx.createOscillator();
            const bassGain = ctx.createGain();

            bassOsc.type = "sine";
            bassOsc.frequency.value = bassFreq;

            const playTime = ctx.currentTime + delaySec;
            bassGain.gain.setValueAtTime(0, playTime);
            bassGain.gain.linearRampToValueAtTime(0.35, playTime + 0.05);
            bassGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.9);

            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 180;

            bassOsc.connect(filter);
            filter.connect(bassGain);
            bassGain.connect(volume);

            bassOsc.start(playTime);
            bassOsc.stop(playTime + 1.0);
          };

          // Pluck two bass notes in sequence (walking rhythm!)
          pluckBass(bassIdx, 0);
          pluckBass(bassIdx + 1, stepIntervalMs / 2000);

          setCurrentStep(currentStep);
          setCurrentBassStep(bassIdx);

          chordIdx = (chordIdx + 1) % PROGRESSIONS[safePreset].chords.length;
          bassIdx = (bassIdx + 2) % PROGRESSIONS[safePreset].bass.length;
        }

        // Bounce visualizer columns
        setVisHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 26) + 8));
      };

      // Play initial beat
      playSequence();

      // Trigger looping interval
      synthTimerRef.current = window.setInterval(playSequence, stepIntervalMs);

    } else {
      // Pause/Stop active synth sequencers
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      setVisHeights([15, 20, 25, 30, 25, 20, 15, 10]);
    }

    return () => {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
      }
    };
  }, [isPlaying, safePreset, synthType, playerMode, activeTrackId]);

  // Handle Mute changes
  useEffect(() => {
    if (masterVolumeRef.current) {
      masterVolumeRef.current.gain.value = isMuted ? 0 : 0.16;
    }
  }, [isMuted]);

  // Setup state to hold portal target DOM node
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (activeTab === "city") {
      const el = document.getElementById("audio-player-portal-root");
      setPortalTarget(el);
    } else {
      setPortalTarget(null);
    }
  }, [activeTab]);

  // Render Mini Pill on other tabs
  if (activeTab !== "city") {
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-[#121212]/95 border border-[#C9A227]/30 rounded-full py-2.5 pl-3 pr-4 flex items-center gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-md hover:border-[#C9A227] transition-all">
        {/* Little decorative gold rim border */}
        <div className="absolute inset-[1px] border border-[#C9A227]/10 rounded-full pointer-events-none"></div>

        {/* Mini Spinning Vinyl Disc */}
        <button 
          onClick={() => setActiveTab && setActiveTab("city")}
          className="relative w-9 h-9 bg-zinc-950 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 shadow-lg cursor-pointer group"
          title="返回留声机面板 (Back to Turntable)"
        >
          <div className={`w-7 h-7 rounded-full border border-[#C9A227]/20 flex items-center justify-center ${isPlaying ? "animate-spin-slow" : ""}`}>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-[#C9A227]/60 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#C9A227]"></div>
            </div>
          </div>
          <Disc className="w-3.5 h-3.5 text-[#C9A227]/40 group-hover:text-[#C9A227] absolute transition-colors" />
        </button>

        {/* Text Details */}
        <div className="min-w-0 flex flex-col leading-tight pr-1.5 cursor-pointer" onClick={() => setActiveTab && setActiveTab("city")}>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>NOW PLAYING</span>
          </div>
          <h5 className="text-[11.5px] font-sans font-bold text-zinc-100 truncate mt-0.5 max-w-[150px]">
            {playerMode === "classic" ? activeTrack.chineseTitle : `${cityName}即兴录音`}
          </h5>
          <span className="text-[9px] font-mono text-zinc-400 mt-0.2 truncate max-w-[150px]">
            {playerMode === "classic" ? activeTrack.chineseArtist : "Procedural Synth"}
          </span>
        </div>

        {/* Playing/Visualizer/Pause Controls */}
        <div className="flex items-center gap-2 border-l border-[#C9A227]/20 pl-3">
          {/* Wave visualizer */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4 w-5 px-1.5 shrink-0 select-none">
              {visHeights.slice(0, 4).map((h, i) => (
                <span 
                  key={i} 
                  style={{ height: `${(h / 30) * 100}%` }} 
                  className="w-[1.5px] bg-[#C9A227] rounded-full transition-all duration-150"
                />
              ))}
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={() => handlePlayToggle()}
            className="w-7 h-7 rounded-full bg-zinc-900 hover:bg-[#C9A227] text-[#C9A227] hover:text-zinc-950 border border-[#C9A227]/20 hover:border-[#C9A227] flex items-center justify-center cursor-pointer transition-all shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>
    );
  }

  const fullPlayerContent = (
    <div className="w-full bg-[#121212] border border-[#C9A227]/20 rounded-xl p-5 shadow-2xl relative overflow-hidden text-left text-[#E0E0E0] backdrop-blur-sm flex flex-col gap-5">
      
      {/* Editorial delicate golden inner borders */}
      <div className="absolute inset-1 border border-[#C9A227]/10 rounded-lg pointer-events-none"></div>

      {/* TOP HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C9A227]/15 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-[#C9A227]" />
          <h3 className="text-sm font-serif font-bold text-white tracking-tight">
            百年爵士留声机 · {playerMode === "classic" ? "经典金曲" : `${cityName}即兴`}
          </h3>
        </div>

        {/* MODE SELECTOR */}
        <div className="flex bg-[#0B0B0B] border border-[#C9A227]/20 rounded p-0.5 text-[10px] font-mono self-start sm:self-auto">
          <button
            onClick={() => setPlayerMode("classic")}
            className={`px-2 py-1 rounded transition-all cursor-pointer font-bold uppercase tracking-wide flex items-center gap-1 ${
              playerMode === "classic" ? "bg-[#C9A227] text-zinc-950" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Award className="w-3 h-3" />
            <span>历史名盘 (Classics)</span>
          </button>
          <button
            onClick={() => setPlayerMode("preset")}
            className={`px-2 py-1 rounded transition-all cursor-pointer font-bold uppercase tracking-wide flex items-center gap-1 ${
              playerMode === "preset" ? "bg-[#C9A227] text-zinc-950" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>即兴合成 (Live Jam)</span>
          </button>
        </div>
      </div>

      {/* MID CONTROLLER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* ROTATING VINYL DECK (5 COLS) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Platter Shadow */}
          <div className="w-36 h-36 md:w-38 md:h-38 rounded-full bg-zinc-950/95 border-4 border-zinc-900 shadow-inner flex items-center justify-center relative shadow-2xl">
            
            {/* The vinyl record itself */}
            <div
              className={`w-[92%] h-[92%] rounded-full bg-zinc-900 border border-zinc-950 flex items-center justify-center relative cursor-pointer shadow-lg overflow-hidden ${
                isPlaying ? "animate-spin-slow" : ""
              }`}
              style={{
                backgroundImage: "radial-gradient(circle, #2d2a29 2px, #181515 4px, #0e0c0c 100%)",
                animationDuration: "4s"
              }}
              onClick={() => handlePlayToggle()}
            >
              {/* Record grooves */}
              <div className="absolute inset-2 rounded-full border border-zinc-800/10 opacity-60"></div>
              <div className="absolute inset-4 rounded-full border border-zinc-800/20 opacity-60"></div>
              <div className="absolute inset-6 rounded-full border border-zinc-800/10 opacity-60"></div>
              <div className="absolute inset-9 rounded-full border border-zinc-800/30 opacity-60"></div>
              <div className="absolute inset-12 rounded-full border border-zinc-800/20 opacity-40"></div>

              {/* Record Label Center */}
              <div className="w-12 h-12 rounded-full bg-[#C9A227] border-2 border-zinc-950 flex items-center justify-center relative z-10 shadow-md">
                <div className="text-center max-w-[42px] truncate px-0.5">
                  <span className="block text-[4.5px] font-mono font-black text-zinc-950 leading-none tracking-tight uppercase">
                    {playerMode === "classic" ? activeTrack.artist.split(" ").pop() : "JAZZ"}
                  </span>
                  <span className="block text-[4px] font-sans text-zinc-900 tracking-tighter uppercase font-extrabold scale-90 mt-0.5 truncate">
                    {playerMode === "classic" ? activeTrack.title : `${cityName}`}
                  </span>
                </div>
                {/* Spindle hole */}
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 absolute inset-[19px]"></div>
              </div>
            </div>

            {/* Tonearm */}
            <div
              className={`absolute top-0 right-4 w-4 h-18 origin-top transition-transform duration-700 z-20 pointer-events-none ${
                isPlaying ? "rotate-[18deg]" : "rotate-0"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-amber-700 border-2 border-[#C9A227] shadow-md absolute -top-1 right-0"></div>
              <div className="w-[1px] h-14 bg-gradient-to-b from-[#C9A227] to-zinc-400 absolute left-[6px] top-[8px]"></div>
              <div className="w-2.5 h-3.5 bg-zinc-800 border border-zinc-700 absolute bottom-0 left-[2px] rounded-xs shadow-md"></div>
            </div>
          </div>
        </div>

        {/* METADATA & PLAYER CONTROL HUB (7 COLS) */}
        <div className="md:col-span-7 flex flex-col justify-between h-full gap-3">
          
          {/* TRACK METADATA BOX */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/20 px-2 py-0.5 rounded">
                {playerMode === "classic" ? `${activeTrack.decade}s · ${activeTrack.style}` : `Live Preset · ${cityName}`}
              </span>
              {playerMode === "classic" && activeTrack.decade === selectedDecade && (
                <span className="text-[8px] font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded uppercase animate-pulse flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" />
                  <span>Era Recommend</span>
                </span>
              )}
            </div>

            <h4 className="text-base font-serif font-black text-white tracking-tight mt-1">
              {playerMode === "classic" ? (
                <span>{activeTrack.chineseTitle} <span className="text-zinc-500 font-sans text-xs">({activeTrack.title})</span></span>
              ) : (
                <span>{cityName}即兴和弦律动</span>
              )}
            </h4>
            
            <p className="text-[10.5px] text-zinc-300 leading-normal">
              {playerMode === "classic" ? activeTrack.description : `根据当前选定城市的新浪潮与乐理演化，实时合成 ${preset === "modal-blue" ? "纽约冷调式 9/11级进" : preset === "bossa-breeze" ? "里约波萨诺瓦桑巴" : preset === "traditional" ? "传统新奥尔良拉格泰姆" : "经典黑胶摇摆乐"}。`}
            </p>

            {/* HIGH-FIDELITY HISTORICAL METADATA CARD */}
            {playerMode === "classic" && (
              <div className="bg-zinc-950/70 border border-[#C9A227]/15 p-3 rounded-lg space-y-2 text-[10.5px] leading-relaxed shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-zinc-500 font-medium shrink-0">演奏家:</span>
                    <span className="text-zinc-100 font-bold truncate">{activeTrack.chineseArtist}</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-zinc-500 font-medium shrink-0">年份:</span>
                    <span className="text-[#C9A227] font-mono font-bold">{activeTrack.recordingYear}年</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0 sm:col-span-2">
                    <span className="text-zinc-500 font-medium shrink-0">专辑:</span>
                    <span className="text-zinc-100 font-medium italic truncate">《{activeTrack.album}》</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-zinc-500 font-medium shrink-0">厂牌:</span>
                    <span className="text-zinc-300 truncate">{activeTrack.recordLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-zinc-500 font-medium shrink-0">平台:</span>
                    <span className="text-zinc-300 truncate font-mono text-[9px]">{activeTrack.sourcePlatform}</span>
                  </div>
                </div>

                {/* SIGNATURE EXCERPT DESIGN */}
                <div className="border-t border-[#C9A227]/10 pt-2 mt-1 flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-extrabold text-[#C9A227] tracking-widest uppercase flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                    <span>招牌金句乐段 (Signature Excerpt)</span>
                  </span>
                  <p className="text-[10px] text-zinc-400 italic bg-black/30 px-2 py-1.5 rounded border-l-2 border-[#C9A227]/60 leading-relaxed">
                    “{activeTrack.signatureExcerpt}”
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SEQUENCER LIGHTS & VISUALIZERS */}
          <div className="flex items-center justify-between bg-black/40 border border-[#C9A227]/10 p-1.5 rounded">
            <div className="flex gap-2 items-center">
              <span className="text-[8px] font-mono text-zinc-500 uppercase font-bold">Sequencer:</span>
              <div className="flex gap-1">
                {(playerMode === "classic" && activeTrack && activeTrack.patternLength === 10 ? [0, 2, 4, 6, 8] : [0, 2, 4, 6, 8, 10, 12, 14]).map((step) => {
                  const isActive = isPlaying && (playerMode === "classic" ? currentStep === step || currentStep === step + 1 : currentStep === Math.floor(step / 4));
                  return (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-[#C9A227] shadow-[0_0_6px_#C9A227] scale-110"
                          : "bg-zinc-800"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* EQ bouncing bar visualizer */}
            <div className="flex items-end gap-0.5 h-4">
              {visHeights.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h * 0.6}px` }}
                  className="w-[1.5px] bg-gradient-to-t from-zinc-800 to-[#C9A227] transition-all duration-150 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* PLAYER CONTROLS HUB */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#C9A227]/5 pt-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePlayToggle()}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded text-[10px] font-mono font-bold tracking-wide transition-all duration-300 border cursor-pointer ${
                  isPlaying
                    ? "bg-transparent text-zinc-200 border-zinc-800 hover:border-zinc-700"
                    : "bg-[#C9A227] text-zinc-950 border-[#C9A227] hover:bg-[#b08e20]"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>STOP NEEDLE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                    <span>PLAY VINYL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded bg-zinc-950 border border-zinc-900 hover:border-[#C9A227]/30 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#C9A227]" />
                )}
              </button>
            </div>

            {/* Synthesizer Selector */}
            <div className="flex items-center gap-1 font-sans text-[9px] text-zinc-500">
              <Sliders className="w-3 h-3 text-zinc-600 shrink-0" />
              <select
                value={synthType}
                onChange={(e) => setSynthType(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-900 text-[9px] font-mono rounded px-1.5 py-0.5 focus:outline-hidden text-zinc-400 hover:text-white cursor-pointer"
              >
                <option value="triangle">Electric Rhodes</option>
                <option value="sine">Flute (Sine)</option>
                <option value="sawtooth">Retro Sax Lead</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* CLASSIC SONGS SHELF / SELECTOR SECTION */}
      {playerMode === "classic" && (
        <div className="bg-zinc-950/50 border border-[#C9A227]/10 rounded-lg p-2.5 mt-1 space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-mono text-[#C9A227] font-bold uppercase tracking-wider flex items-center gap-1">
              <ListMusic className="w-3.5 h-3.5" />
              <span>百年名盘黑胶货架 (Legendary Vinyl Catalog)</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-500">
              时代联动 · 点击即可切换
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CLASSIC_TRACKS.map((track) => {
              const isSelected = activeTrackId === track.id;
              const isMatchEra = track.decade === selectedDecade;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setActiveTrackId(track.id);
                    ensureAudioContext();
                    setIsPlaying(true);
                    
                    // Direct HTML5 play on select if in classic mode
                    if (html5AudioRef.current) {
                      const targetUrl = track.audioUrl;
                      if (html5AudioRef.current.src !== targetUrl) {
                        html5AudioRef.current.src = targetUrl;
                        html5AudioRef.current.load();
                      }
                      html5AudioRef.current.play().catch((err) => {
                        console.warn("Direct HTML5 play on select failed:", err);
                      });
                    }
                  }}
                  className={`relative p-2 rounded border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-[58px] overflow-hidden ${
                    isSelected
                      ? "bg-[#C9A227]/15 border-[#C9A227] shadow-inner"
                      : isMatchEra
                      ? "bg-amber-500/5 border-amber-500/40 hover:border-amber-500 hover:bg-amber-500/10"
                      : "bg-[#0B0B0B] border-zinc-900 hover:border-[#C9A227]/40 hover:bg-zinc-900/40"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-1 leading-none">
                      <span className="text-[9px] font-bold text-[#E0E0E0] truncate max-w-[80%]">
                        {track.chineseTitle}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500 scale-90 select-none">
                        {track.decade}s
                      </span>
                    </div>
                    <span className="block text-[8px] text-zinc-500 font-sans mt-0.5 truncate">
                      {track.artist}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1.5 border-t border-zinc-900/40 pt-1">
                    <span className="text-[7.5px] font-mono text-[#C9A227] uppercase tracking-tighter truncate max-w-[65%]">
                      {track.style}
                    </span>
                    {isSelected && isPlaying ? (
                      <span className="flex items-center gap-0.5 h-2">
                        <span className="w-0.5 h-full bg-[#C9A227] animate-pulse-slow"></span>
                        <span className="w-0.5 h-3/4 bg-[#C9A227] animate-pulse"></span>
                        <span className="w-0.5 h-1/2 bg-[#C9A227] animate-pulse-fast"></span>
                      </span>
                    ) : (
                      <span className="text-[7.5px] font-mono text-zinc-600 uppercase">
                        {isSelected ? "PAUSED" : "LOAD"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ERA RECOMMENDATION ALERT FOOTER */}
      {playerMode === "classic" && (
        <div className="bg-[#0B0B0B] border border-[#C9A227]/10 p-2 rounded text-[9.5px] font-sans flex items-center justify-between text-zinc-400 gap-2">
          <div className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="leading-tight">
              当前星系年份 <span className="text-[#C9A227] font-bold">{selectedDecade}s</span> 推荐曲目：
              <span className="text-[#E0E0E0] font-bold">
                {CLASSIC_TRACKS.find(t => t.decade === selectedDecade)?.chineseTitle || "无特定匹配，推荐漫游聆听"}
              </span>
            </span>
          </div>
          <span className="text-[8px] text-zinc-600 font-mono hidden sm:block">
            STATION ID: GA.PLAY.042
          </span>
        </div>
      )}

      {/* JAZZ ERA TUNER: SENSORY/LISTENING ANCHOR (听感锚点) */}
      <ListeningAnchor selectedDecade={selectedDecade} />
      
    </div>
  );

  if (portalTarget) {
    return createPortal(fullPlayerContent, portalTarget);
  }

  return fullPlayerContent;
}

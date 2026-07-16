import React, { useState, useEffect, useRef } from "react";
import { Music, Sliders, Play, Pause, Compass, Layers, Sparkles, Volume2, HelpCircle } from "lucide-react";

export interface InstrumentItem {
  name: string;
  icon: string;
  desc: string;
}

export interface EraAnchorData {
  title: string;
  eraName: string;
  instruments: InstrumentItem[];
  rhythm: {
    meter: string;
    patternName: string;
    sequence: number[]; // Binary pattern for rhythm lights
    description: string;
  };
  harmony: {
    progression: string;
    desc: string;
  };
  listeningTips: string;
}

const ERA_ANCHORS: Record<number, EraAnchorData> = {
  1890: {
    title: "拉格泰姆 (Ragtime)",
    eraName: "切分节奏与刚果广场的余音",
    instruments: [
      { name: "原声钢琴", icon: "🎹", desc: "承担了全部织体：左手弹低音，右手弹切分" },
      { name: "班卓琴", icon: "🪕", desc: "带来早期民间弹拨乐器独特的清脆颗粒感" },
      { name: "短号", icon: "🎺", desc: "吹奏高亢的进行曲旋律，爵士小号的前身" }
    ],
    rhythm: {
      meter: "2/4 拍",
      patternName: "双拍拉格 (Two-Beat Rag)",
      sequence: [1, 0, 1, 0, 1, 0, 1, 0],
      description: "继承自欧洲军乐和进行曲。底鼓严格在一、三拍重击（双拍子），军鼓在弱拍切分切入，整体规整且充满向前的推进力。"
    },
    harmony: {
      progression: "I - IV - V7 - I 经典大调进行",
      desc: "右手弹奏极度密集的切分音（Syncopation），左手则以沉稳的双拍交替低音（Stride Prototype）支撑，形成奇妙的错位节奏感。"
    },
    listeningTips: "注意听左手‘蹦嚓、蹦嚓’极度规律的低音交替，与右手跳跃、不守规矩的旋律之间形成的张力。"
  },
  1900: {
    title: "传统新奥尔良爵士 (Traditional)",
    eraName: "红灯区Storyville的集体呼喊",
    instruments: [
      { name: "短号/小号", icon: "🎺", desc: "主导核心旋律，吹出明亮野性的乐句" },
      { name: "长号", icon: "📢", desc: "使用滑音（Glissando）在低音区做滑行呼应" },
      { name: "单簧管", icon: "🎷", desc: "在高音区编织如流水般华丽的复调装饰音" },
      { name: "大号 (Tuba)", icon: "🎺", desc: "提供最底层的庞大、深沉的双拍低音" }
    ],
    rhythm: {
      meter: "4/4 或 2/4 拍",
      patternName: "平底四拍 (Four-on-the-Floor Dixie)",
      sequence: [1, 0, 1, 1, 1, 0, 1, 0],
      description: "鼓手主要使用木鱼、小鼓和踩镲。小鼓常用碎击滚奏（Press Roll）填充空隙，底鼓保持轻盈敲击，节奏极为跳跃活泼。"
    },
    harmony: {
      progression: "布鲁斯级进与进行曲段式叠合",
      desc: "乐器之间没有固定的伴奏线，而是通过小号、长号、单簧管三管齐下的“集体即兴”（Collective Improvisation）编织出多声部复调。"
    },
    listeningTips: "闭上眼，感受三管集体即兴时的热闹繁复，像是在街头喧闹却彼此默契地对话。"
  },
  1910: {
    title: "大迁徙时期 (The Great Migration)",
    eraName: "密西西比河北上的火车轮轨",
    instruments: [
      { name: "早期爵士鼓套件", icon: "🥁", desc: "木鱼、牛铃、边框开始整合到简易架子鼓中" },
      { name: "单簧管", icon: "🎷", desc: "吹奏高歌的急奏，模拟火车鸣笛与气阀声" },
      { name: "小号", icon: "🎺", desc: "引入弱音器，吹出呜咽的“哇哇”（Wah-wah）效果" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "双倍速火车律动 (Double-Time March)",
      sequence: [1, 1, 0, 1, 1, 1, 0, 1],
      description: "由于迁徙途中的蒸汽火车记忆，鼓手常在弱拍用木鱼敲出均匀的马蹄般碎点，底鼓重重落在一三拍，充满奔驰的速度感。"
    },
    harmony: {
      progression: "12小节经典布鲁斯和弦框架",
      desc: "音乐中正式融入大量的“蓝调音符”（Blue Notes，降3度、降7度音），乐曲增添了忧郁、宣泄的黑人草根情感。"
    },
    listeningTips: "注意听鼓手敲击木鱼或鼓圈边框的声音，那种急促、像火车轨道震动的行进声。"
  },
  1920: {
    title: "摇摆乐破晓 (Early Swing)",
    eraName: "哈林文艺复兴与大乐团的黎明",
    instruments: [
      { name: "萨克斯风组", icon: "🎷", desc: "开始作为独立的排炮声部加入，音色柔美" },
      { name: "低音提琴 (Double Bass)", icon: "🎻", desc: "逐渐取代大号，提供更有弹性的步行低音" },
      { name: "原声吉他", icon: "🎸", desc: "取代班卓琴，每拍均匀扫弦，像精密钟摆" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "查尔斯顿跳跃 (Charleston Pulse)",
      sequence: [1, 0, 1, 0, 0, 1, 0, 0],
      description: "著名的Charleston节奏型（附点前切分）响彻舞厅。底鼓开始做每拍均匀的平踩（Four-on-the-Floor），推动成千上百人在舞池摇摆。"
    },
    harmony: {
      progression: "呼叫与应答 (Call & Response)",
      desc: "铜管声部（小号/长号）与木管声部（萨克斯/单簧管）交替对答，和声由编曲家精心写作，庞大而整齐。"
    },
    listeningTips: "寻找铜管乐器和萨克斯组之间‘你唱我和’的对答呼应，以及吉他每拍一下、像心跳般规整的伴奏。"
  },
  1930: {
    title: "摇摆乐黄金时代 (Golden Swing)",
    eraName: "堪萨斯城的深夜即兴与高超独奏",
    instruments: [
      { name: "次中音萨克斯", icon: "🎷", desc: "诞生了如Lester Young般浪漫、丝滑的即兴大师" },
      { name: "踩镲 (Hi-Hat)", icon: "🥁", desc: "鼓手解放底鼓，将整首歌的摇摆脉搏寄托在镲片上" },
      { name: "爵士大钢琴", icon: "🎹", desc: "以Count Basie为代表的极简、点描式伴奏" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "经典镲片摇摆 (Classic Swing Ride)",
      sequence: [1, 0, 1, 1, 1, 0, 1, 1],
      description: "传奇鼓手Jo Jones将节奏中心从底鼓和军鼓彻底移到了踩镲。踩镲发出‘叮-哒-叮-哒’（Ding-ding-a-ding）的弹性空气感，轻盈柔顺。"
    },
    harmony: {
      progression: "即兴连祷 (Riff-based Head Arrangement)",
      desc: "乐手不看谱，而是靠脑海中互相叠加的简单旋律小短句（Riffs）进行轮番轰炸，和声走向宽广流畅，极其上头。"
    },
    listeningTips: "将注意力集中在最上层的镲片敲击声，那种犹如细沙落下的‘叮-哒-叮’沙沙声，是摇摆乐的灵魂核心。"
  },
  1940: {
    title: "咆哮波普革命 (Bebop)",
    eraName: "52街地下酒馆的超高速智力狂飙",
    instruments: [
      { name: "中音萨克斯 (Alto Sax)", icon: "🎷", desc: "Charlie Parker的圣器，吹出极速、令人瞠目结舌的音流" },
      { name: "咆哮小号", icon: "🎺", desc: "Dizzy Gillespie的标志，超高音区的半音阶跑句" },
      { name: "原声架子鼓", icon: "🥁", desc: "彻底变为即兴对话乐器，不再单纯负责打拍子" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "底鼓丢炸弹 (Dropping Bombs)",
      sequence: [1, 0, 1, 1, 0, 1, 1, 1],
      description: "速度狂飙至200+ BPM！右手在叮叮镲上敲出飞一样的Swing。左手和右脚完全解放，在底鼓和军鼓上随机敲出猛烈的无规律重音（Dropping Bombs）用以刺激独奏手。"
    },
    harmony: {
      progression: "超密替代 ii-V-I 与降五度音 (Flat 5ths)",
      desc: "使用极其高深的和弦外音、替代和声（Tritone Substitution）和高难度的半音阶级进，旋律不再优美可唱，而是充满智力对抗。"
    },
    listeningTips: "跟着萨克斯像过山车一样的音符。同时，警惕和欣赏鼓底鼓突然炸响的‘砰！’的一声（炸弹底鼓），那是鼓手在和乐手抬杠。"
  },
  1950: {
    title: "冷爵士与波萨诺瓦 (Cool & Bossa)",
    eraName: "西海岸的理性克制与依帕内玛的海浪",
    instruments: [
      { name: "次中音萨克斯/次中音号", icon: "🎷", desc: "吹奏柔和、不带颤音、冷静如水的线条" },
      { name: "钢丝刷 (Brushes)", icon: "🥁", desc: "在军鼓上画圈摩擦，发出如海风拂沙的细密声响" },
      { name: "尼龙弦吉他", icon: "🎸", desc: "波萨诺瓦的骨架，弹奏慵懒、富有切分性的和弦" },
      { name: "颤音琴 (Vibraphone)", icon: "🎹", desc: "敲击出水滴般波光粼粼的空灵回响" }
    ],
    rhythm: {
      meter: "4/4 或 5/4 奇拍",
      patternName: "慵懒鼓边切分 (Bossa Syncopation)",
      sequence: [1, 0, 0, 1, 0, 0, 1, 0],
      description: "鼓手放下大鼓槌，用钢丝刷在军鼓盘旋。在Bossa Nova中，左手使用鼓边横击（Cross-Stick）敲出恒定、慵懒、迷人的两小节切分切击，底鼓模拟巴西Surdo大鼓轻点弱拍。"
    },
    harmony: {
      progression: "大七/大九和弦与变音级进",
      desc: "极其优雅温润。避开激烈的解决，使用大量的平行大九和弦，和声色彩像莫奈的印象派画作，慵懒、略带感伤。"
    },
    listeningTips: "寻找那一声声清脆的鼓边敲击声（Cross-Stick），以及军鼓上极其微弱、沙沙作响的钢丝刷摩擦声。"
  },
  1960: {
    title: "调式与自由爵士 (Modal & Free)",
    eraName: "打破和弦壁垒的精神求道",
    instruments: [
      { name: "高音萨克斯 (Soprano)", icon: "🎷", desc: "John Coltrane的精神图腾，吹奏圣洁、尖锐的超长冥想跑句" },
      { name: "无约束双鼓手/自由打击", icon: "🥁", desc: "打破固定节奏，像海浪和暴风雨一般铺天盖地" },
      { name: "原声双贝斯", icon: "🎻", desc: "摆脱Walking Bass，拉奏出粗粝的弓音或多声部对位" }
    ],
    rhythm: {
      meter: "自由拍 / 多重律动 (Free/Polyrhythmic)",
      patternName: "多重律动流沙 (Metric Dissolution)",
      sequence: [1, 1, 1, 0, 1, 1, 0, 1],
      description: "Elvin Jones 等大师引入多重节奏（Polyrhythm）。不再有简单重复的拍子，鼓点变成了如同瀑布和流水般的能量包围，四肢分别演奏不同拍频，彻底融化小节线。"
    },
    harmony: {
      progression: "单调式冥想 (Dorian Modal Drone)",
      desc: "摒弃了咆哮乐疯狂的和弦级进。整首曲子可能长达十几分钟只有一个和弦/调式（如Dorian），让乐手在单一色彩空间内向深度掘进，或完全摒弃音高（Free Atonal）。"
    },
    listeningTips: "不要试图在歌里找‘动次打次’的规律。把它当成一幅抽象表现主义画作，去感受萨克斯嚎叫和鼓点风暴带来的纯粹能量。"
  },
  1970: {
    title: "插电融合爵士 (Electric Fusion)",
    eraName: "迷幻插电，爵士与放克摇滚跨界",
    instruments: [
      { name: "模拟合成器 (Moog)", icon: "🎹", desc: "发出迷幻、带有科幻色彩的空间滤波器扫频音" },
      { name: "电钢琴 (Fender Rhodes)", icon: "🎹", desc: "带有标志性铃铛般颤音，音色温暖、迷离" },
      { name: "电贝斯 (Electric Bass)", icon: "🎸", desc: "提供沉重、极其下沉、抓人的Slap或指弹Funk Groove" },
      { name: "康加鼓/非洲打击乐", icon: "🥁", desc: "增加异国情调的丛林打击质感" }
    ],
    rhythm: {
      meter: "4/4 拍 直落节奏",
      patternName: "直落八分放克 (Funk Straight-Eighths)",
      sequence: [1, 1, 0, 1, 1, 0, 1, 0],
      description: "节奏不再‘摇摆’（Swing），而是变成了摇滚和Funk式的直落八分音符（Straight-Eighths）。底鼓踩得很重、极沉，配合强力的军鼓2、4拍，极为催眠上头。"
    },
    harmony: {
      progression: "静态长音与强力 Groove 循环",
      desc: "和弦变化变得极慢，常常在长达几分钟的合成器铺垫（Drones）和电贝斯低音Groove上进行即兴，强调音色、效果器和电声氛围。"
    },
    listeningTips: "感受电贝斯富有弹性、极其沉稳的Groove，以及键盘手给电钢琴加了合唱（Chorus）或颤音效果器后那种亮晶晶、颤巍巍的质感。"
  },
  1980: {
    title: "新古典传统复燃 (Neo-Traditional)",
    eraName: "纯粹主义与 Blue Note 原声现场",
    instruments: [
      { name: "原声小号", icon: "🎺", desc: "追求金黄、通透、不带任何效果器修饰的纯粹音色" },
      { name: "原声三角钢琴", icon: "🎹", desc: "颗粒感极强、触键晶莹，极富动态范围" },
      { name: "原声提琴贝斯", icon: "🎻", desc: "回归纯净的木质共鸣，音色醇厚" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "微米级硬咆哮 (Refined Neo-Bop Ride)",
      sequence: [1, 0, 1, 1, 1, 0, 1, 0],
      description: "排斥电声，重归原声爵士。鼓手展现出极其精细、学院派般严谨高超的传统Swing叮叮镲控制，动态对比大，既有传统的根基又带现代技巧的冷峻。"
    },
    harmony: {
      progression: "高度精密的学院派现代复调",
      desc: "在传统的ii-V-I和咆哮框架上，融入了极其复杂但规整的现代调式调性转换，多声部咬合极其紧密，如同精密的瑞士钟表。"
    },
    listeningTips: "注意听钢琴触键时水晶般的清脆质感，和乐手之间高难度、但控制得极其干净优雅的对话。"
  },
  1990: {
    title: "酸爵士与电子跨界 (Acid Jazz & Crossover)",
    eraName: "采样刮碟与地下俱乐部舞池",
    instruments: [
      { name: "黑胶唱机 (Turntable)", icon: "💿", desc: "DJ通过刮碟（Scratch）将老爵士乐黑胶融入节奏" },
      { name: "MPC 采样机/鼓机", icon: "🎹", desc: "把50年代名盘的和声切片（Chop）重新排列" },
      { name: "次中音萨克斯", icon: "🎷", desc: "在Loop中吹出慵懒、富有灵魂感（Soulful）的即兴" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "酸性循环 (Acid Loop Trip-Hop)",
      sequence: [1, 0, 0, 1, 1, 0, 0, 1],
      description: "将真实的爵士鼓点与电子鼓机节奏混合。通常带有一种被称为‘微摇摆’（Shuffle/Quantize Swing）的数字偏差，鼓点松垮，有极强的舞动感和街头感。"
    },
    harmony: {
      progression: "切片采样循环 (Chopped Chord Loops)",
      desc: "不再由现场乐手实时弹奏复杂的和弦进行，而是将经典的旧黑胶唱片中的两小节精妙和弦采样下来，作为循环音轨（Loop）在底层播放。"
    },
    listeningTips: "仔细听音乐底层那种黑胶唱片特有的‘炒豆声’（微弱噼啪声），以及DJ刮碟声与现场吹奏萨克斯的现代对话。"
  },
  2000: {
    title: "全球先锋与电影感 (Cinematic Global)",
    eraName: "北欧极简冰川与世界多重根源",
    instruments: [
      { name: "原声弦乐/大提琴", icon: "🎻", desc: "加入室内乐般的优雅、哀伤与电影叙事质感" },
      { name: "手提电脑/现场实时效果", icon: "💻", desc: "将现场乐器声做延迟、颗粒合成等数字渲染" },
      { name: "塔布拉鼓 (Tabla)", icon: "🥁", desc: "引入印度等东方古老打击乐，构建奇特声场" }
    ],
    rhythm: {
      meter: "奇数拍 (7/8拍, 11/8拍 等)",
      patternName: "非对称不对称拍 (Polymetric Odd-Time)",
      sequence: [1, 0, 1, 0, 1, 1, 0, 1],
      description: "大量使用复杂的非对称节奏，打破传统的四拍子。鼓点呈现出一种奇数不对称的美感，时而像微风拂过叶片般琐碎，时而突然重击。"
    },
    harmony: {
      progression: "北欧极简色彩与氛围和声",
      desc: "带有一种冷冽、空旷、如冰川般的深邃空间感。摒弃炫技，使用极其简单却深邃的复调，营造出强烈的画面感和电影叙事性。"
    },
    listeningTips: "感受音乐中极大的留白（Negative Space）。音符和音符之间有很长的静默，乐器的回音在宽广的数字空间里回荡。"
  },
  2010: {
    title: "伦敦爵士新浪潮 (London Wave)",
    eraName: "Afrobeats、雷鬼与南伦敦夜生活",
    instruments: [
      { name: "次中音萨克斯", icon: "🎷", desc: "音色极其狂野、高亢、带有撕裂般的啸叫与原始能量" },
      { name: "电贝斯", icon: "🎸", desc: "深受英国夜店文化（Grime/Dubstep）影响，低音极重" },
      { name: "牛铃与非洲打击乐", icon: "🔔", desc: "提供贯穿始终的强烈非洲切分重音" }
    ],
    rhythm: {
      meter: "4/4 拍",
      patternName: "非洲脉搏同步 (Afro-Beat Sync)",
      sequence: [1, 1, 0, 1, 0, 1, 1, 0],
      description: "伦敦街头文化大融合。将Afrobeats的狂热切分、加勒比雷鬼的反拍敲击（Skank）与现代架子鼓融合，节奏感极强，不再是为坐着欣赏，而是为跳舞而生。"
    },
    harmony: {
      progression: "重力低音与行进切分 Groove",
      desc: "和弦进行通常较为简明，将所有的音乐能量全部压在极重的低音线条（Basslines）和打击乐器编织的超强Groove上，充满都市荷尔蒙。"
    },
    listeningTips: "注意听萨克斯吹奏时那种带着沙哑、破音的狂野啸叫，以及牛铃和极重贝斯带来的跳舞冲动。"
  },
  2020: {
    title: "未来无疆界 (Modern Future)",
    eraName: "Neo-Soul 暖意与醉酒鼓点的慵懒美学",
    instruments: [
      { name: "人声音轨 (Vocals)", icon: "🎤", desc: "配合变调、多轨和音（Vocoder）编织出迷幻人声墙" },
      { name: "暖意电钢琴 (Rhodes)", icon: "🎹", desc: "铺底弹奏充满Lo-Fi复古滤镜感的温暖和弦" },
      { name: "混血架子鼓 (Hybrid Kit)", icon: "🥁", desc: "真实原声鼓加装电子打击垫，声学与数字融合" }
    ],
    rhythm: {
      meter: "4/4 拍 醉酒微摆",
      patternName: "推迟醉酒律动 (Laid-Back Future Soul)",
      sequence: [1, 0, 0, 1, 0, 1, 0, 1],
      description: "受传奇制作人J Dilla启发的‘Drunk Beat’。鼓手故意不打在节拍器上，而是将小鼓和底鼓有意推迟或提前微秒，产生一种醉酒蹒跚、极度慵懒放松的前卫‘推后’（Behind the beat）律动。"
    },
    harmony: {
      progression: "Neo-Soul 大十一/十三和弦群与平移滑奏",
      desc: "极其浪漫奢华。使用大量的半音阶向下平行平移滑奏（Chromatic slipping），和弦色彩极其丰满、温暖，带有浓郁的现代都市卧室电子和爵士说唱色彩。"
    },
    listeningTips: "跟着音乐晃动，你会发现鼓点好像总是比你的预想慢了半拍，有一种卡在拍子后面、极致慵懒的舒服感觉。"
  }
};

interface ListeningAnchorProps {
  selectedDecade: number;
}

export default function ListeningAnchor({ selectedDecade }: ListeningAnchorProps) {
  // Grab current era data based on selectedDecade.
  // Since selectedDecade could be e.g. 1953, map to nearest decade key.
  const nearestDecade = Math.floor(selectedDecade / 10) * 10;
  // Ensure the fallback defaults to a nice decade
  const data: EraAnchorData = ERA_ANCHORS[nearestDecade] || ERA_ANCHORS[1950];

  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [beatIdx, setBeatIdx] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Map tempo to milliseconds per step. 
  // Let's assume a nice standard tempo around 120bpm, making 8 steps run smoothly
  const stepDuration = 220; // ms

  // Reset beat index on era change
  useEffect(() => {
    setBeatIdx(0);
  }, [selectedDecade]);

  // Rhythmic light ticker simulation
  useEffect(() => {
    let timerId: any;
    if (isPlayingBeat) {
      timerId = setInterval(() => {
        setBeatIdx((prev) => (prev + 1) % 8);
      }, stepDuration);
    } else {
      setBeatIdx(0);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isPlayingBeat]);

  return (
    <div className="bg-[#161619] border border-[#C9A227]/30 rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-4 text-left">
      {/* Decorative Golden Corner lines */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C9A227]/25 pointer-events-none rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C9A227]/25 pointer-events-none rounded-bl-xl"></div>

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-[#C9A227]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227]">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-black text-[#C9A227] uppercase tracking-widest flex items-center gap-1.5">
              <span>{nearestDecade}s 听感锚点</span>
              <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-normal">
                Sensory Anchor
              </span>
            </h4>
            <p className="text-[10px] text-zinc-500 font-sans mt-0.5 font-medium leading-none">
              听懂这个时代爵士乐的“长相”与骨架
            </p>
          </div>
        </div>

        {/* Decorative badge */}
        <span className="text-[10px] font-mono text-zinc-600 font-bold tracking-widest select-none">
          ERA.{nearestDecade}
        </span>
      </div>

      {/* TITLE & DESCRIPTION */}
      <div className="space-y-1">
        <h5 className="text-sm font-serif font-black text-white flex items-center gap-2">
          <span>{data.title}</span>
          <span className="text-[10px] font-mono font-bold text-zinc-500 px-1.5 py-0.5 rounded bg-[#0b0b0d] border border-zinc-900">
            {data.rhythm.meter}
          </span>
        </h5>
        <p className="text-xs text-amber-500/80 font-sans italic font-medium leading-relaxed">
          “{data.eraName}”
        </p>
      </div>

      {/* DRUMMER SECTION: RHYTHM SEQUENCE PULSER */}
      <div className="bg-[#0c0c0e] border border-zinc-900/80 rounded-lg p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
              鼓手节拍律动 (Rhythm Pattern):
            </span>
            <span className="text-[9px] font-mono font-bold text-[#C9A227] bg-[#C9A227]/10 px-1.5 py-0.2 rounded">
              {data.rhythm.patternName}
            </span>
          </div>

          {/* Pulse Live Animation Toggle */}
          <button
            onClick={() => setIsPlayingBeat(!isPlayingBeat)}
            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer border ${
              isPlayingBeat 
                ? "bg-amber-500 text-zinc-950 border-amber-500 font-black animate-pulse" 
                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {isPlayingBeat ? (
              <>
                <span className="inline-block w-1 h-1 rounded-full bg-zinc-950 animate-ping"></span>
                <span>PULSING</span>
              </>
            ) : (
              <>
                <Play className="w-2 h-2 fill-current" />
                <span>TAP BEAT</span>
              </>
            )}
          </button>
        </div>

        {/* Visualizer Pulsing Nodes */}
        <div className="flex items-center gap-1.5 py-1 justify-center">
          {data.rhythm.sequence.map((bit, idx) => {
            const isCurrent = isPlayingBeat && beatIdx === idx;
            const isHit = bit === 1;
            
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 border text-[10px] font-mono font-bold ${
                    isCurrent
                      ? isHit
                        ? "bg-[#C9A227] text-zinc-950 border-[#C9A227] scale-110 shadow-[0_0_8px_#C9A227]"
                        : "bg-zinc-700 text-zinc-100 border-zinc-600 scale-105"
                      : isHit
                      ? "bg-amber-500/10 text-amber-500/80 border-amber-500/20"
                      : "bg-[#111114] text-zinc-700 border-zinc-900"
                  }`}
                >
                  {isHit ? "🥁" : "•"}
                </div>
                <span className="text-[7.5px] font-mono text-zinc-600 scale-90">
                  {idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rhythm Explainer */}
        <p className="text-[10.5px] text-zinc-400 leading-normal font-sans border-l-2 border-amber-500/40 pl-2.5 py-0.5">
          <span className="font-bold text-zinc-300">鼓手视角：</span>
          {data.rhythm.description}
        </p>
      </div>

      {/* RACK OF FEATURED INSTRUMENTS */}
      <div className="space-y-2">
        <h6 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
          <Sliders className="w-3 h-3 text-[#C9A227]" />
          <span>核心声部编制 (Featured Instruments)</span>
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {data.instruments.map((inst, idx) => (
            <div
              key={idx}
              className="bg-black/20 hover:bg-black/35 border border-zinc-900 rounded-lg p-2 flex items-start gap-2 transition-all group"
            >
              <span className="text-base shrink-0 group-hover:scale-110 transition-transform">
                {inst.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-sans font-bold text-zinc-200 group-hover:text-[#C9A227] transition-colors leading-none">
                  {inst.name}
                </p>
                <p className="text-[9px] text-zinc-500 leading-normal mt-0.5">
                  {inst.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HARMONIC BLUEPRINT */}
      <div className="bg-[#0d0d10] border border-[#C9A227]/10 rounded-lg p-3 space-y-1.5">
        <h6 className="text-[9.5px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
          <Layers className="w-3 h-3 text-emerald-500" />
          <span>和声调式走向 (Harmonic blueprint)</span>
        </h6>
        <div className="flex items-start gap-2.5">
          <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold shrink-0">
            CHORD
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[11px] font-sans font-black text-zinc-200 truncate">
              {data.harmony.progression}
            </p>
            <p className="text-[10px] text-zinc-400 leading-normal font-sans">
              {data.harmony.desc}
            </p>
          </div>
        </div>
      </div>

      {/* LISTENING GUIDANCE TIPS */}
      <div className="bg-[#1c1810]/40 border border-[#C9A227]/20 p-3 rounded-lg flex gap-2.5">
        <Sparkles className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5 animate-pulse" />
        <div className="min-w-0">
          <h6 className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-wider">
            聆听秘诀 (Listening Key):
          </h6>
          <p className="text-[10.5px] text-zinc-300 leading-normal font-sans mt-0.5">
            {data.listeningTips}
          </p>
        </div>
      </div>
    </div>
  );
}

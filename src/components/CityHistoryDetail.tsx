import React from "react";
import { motion } from "motion/react";
import {
  History,
  Calendar,
  Flame,
  TrendingUp,
  Quote,
  Music,
  Award,
  Compass,
  Hourglass,
  Layers,
  Sparkles,
  BookOpen
} from "lucide-react";

interface Milestone {
  year: string;
  decade: number;
  title: string;
  description: string;
}

interface Characteristic {
  title: string;
  englishTitle: string;
  description: string;
  icon: React.ReactNode;
}

interface HistoryData {
  cityId: string;
  timelineTitle: string;
  cultureTitle: string;
  milestones: Milestone[];
  characteristics: Characteristic[];
  anecdoteQuote: string;
  anecdoteAuthor: string;
  spiritSummary: string;
}

const HISTORICAL_DATABASE: Record<string, HistoryData> = {
  "new-orleans": {
    cityId: "new-orleans",
    timelineTitle: "新奥尔良爵士发展编年史 (The Cradle of Birth)",
    cultureTitle: "克里奥尔与刚果广场的声响美学",
    milestones: [
      {
        year: "1890s",
        decade: 1890,
        title: "刚果广场的野性先声",
        description: "刚果广场（Congo Square）成为黑人奴隶合法聚集并保留西非节奏的唯一圣地。非洲部落鼓点与欧洲铜管乐器、Ragtime 切分音在此发生历史性相撞。"
      },
      {
        year: "1910s",
        decade: 1910,
        title: "红灯区 Storyville 的爵士对位",
        description: "传奇短号手 Buddy Bolden 与 King Oliver 开始在 Storyville 的娱乐场所演奏。小号主旋律、单簧管华彩与长号滑音相互交织，形成了最初的传统新奥尔良对位法。"
      },
      {
        year: "1917",
        decade: 1910,
        title: "Storyville 关闭与大北迁的前奏",
        description: "美军下令强行关闭 Storyville 娱乐区，大批优秀的爵士乐手失去生计。他们沿着密西西比河，乘坐轮船将爵士之火带向芝加哥与纽约。"
      }
    ],
    characteristics: [
      {
        title: "多声部集体即兴对位",
        englishTitle: "Collective Improvisation",
        description: "铜管乐器不分先后，在固定的和弦框架内同时进行即兴对话，声部饱满生动、层叠交织，散发着无拘无束的平民生命力。",
        icon: <Layers className="w-4 h-4" />
      },
      {
        title: "刚果广场切分律动",
        englishTitle: "Congo Square Pulse",
        description: "保留西非宗教仪式中神圣的切分重音与三连音过渡，彻底瓦解了欧洲进行曲和民歌的死板节拍，赋予乐句弹性的呼吸感。",
        icon: <Sparkles className="w-4 h-4" />
      },
      {
        title: "Second Line 街头欢葬",
        englishTitle: "Second Line Traditions",
        description: "起源于新奥尔良独特的爵士葬礼文化。前半段庄严肃穆，后半段小号喇叭一响，全城围观群众化身‘第二纵队’共舞，悲歌欢奏、化哀为狂。",
        icon: <Flame className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "在新奥尔良，我们不为死亡哭泣。我们用最热烈的小号和最摇摆的鼓点，送别一个不屈灵魂重回刚果家园。",
    anecdoteAuthor: "传统行进乐鼓手口述",
    spiritSummary: "黑人、克里奥尔人与欧洲殖民遗风，在这座潮湿的密西西比三角洲城市中碰撞，铸就了人类历史上最斑斓的音符摇篮。"
  },
  "chicago": {
    cityId: "chicago",
    timelineTitle: "芝加哥大迁徙与经典灌录时代 (The Northern Expansion)",
    cultureTitle: "独奏巨星的崛起与电声化序曲",
    milestones: [
      {
        year: "1910s末",
        decade: 1910,
        title: "密西西比河北上大迁徙",
        description: "随着一战爆发和南方种族歧视加剧，成千上万非裔劳工乘火车北上芝加哥谋生，带来了南方最纯正、最热烈的灵歌与爵士乐种。"
      },
      {
        year: "1923",
        decade: 1920,
        title: "Creole 乐队与录音工业首创",
        description: "King Oliver's Creole Jazz Band 在芝加哥录制了首批不朽的黑胶唱片，年轻的路易斯·阿姆斯特朗在此担任第二小号，其穿透性的音色震惊芝加哥乐界。"
      },
      {
        year: "1925 - 1927",
        decade: 1920,
        title: "《Hot Five & Seven》神话诞生",
        description: "路易斯·阿姆斯特朗在此录制了奠定爵士即兴基础的伟大作品，彻底用‘个人即兴独奏’代替了早期的‘集体齐奏’，正式开创了大师独奏时代。"
      }
    ],
    characteristics: [
      {
        title: "独奏巨星 Soloist 确立",
        englishTitle: "Emergence of individual Solos",
        description: "打破了新奥尔良式的多人大合奏，将聚光灯彻底留给单独的即兴者。乐手高超的即兴技巧与个人灵魂表达成为了爵士乐的核心。",
        icon: <Award className="w-4 h-4" />
      },
      {
        title: "芝加哥白人爵士浪潮",
        englishTitle: "Chicago Style School",
        description: "在芝加哥南区俱乐部熏陶下，大批本地白人青年（如 Bix Beiderbecke）开始模仿黑人唱片，融入了更多古典室内乐的精致编曲与克制色彩。",
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        title: "节奏刚猛与萨克斯的崛起",
        englishTitle: "Rhythm Drive & Sax Dominance",
        description: "萨克斯风逐渐取代单簧管成为核心吹奏声部，音量更洪亮、速度更快、节奏组切分更粗犷，为后续大乐团时代作好了乐器准备。",
        icon: <Music className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "路易斯在芝加哥一吹小号，整条52街的窗户都开始颤抖。每个人都明白，那个属于集体大合奏的旧时代结束了，一个全新的独奏英雄时代已经降临。",
    anecdoteAuthor: "芝加哥《Defender》乐评周报 (1926)",
    spiritSummary: "在喧嚣、工业化的风城，爵士乐脱下了南方泥泞的泥土气，套上了大都市精致的黑西装，变得雷厉风行、震耳欲聋。"
  },
  "new-york": {
    cityId: "new-york",
    timelineTitle: "纽约爵士乐百年中枢画卷 (The Undisputed Capital)",
    cultureTitle: "52街的技艺试炼与大都市交响",
    milestones: [
      {
        year: "1920s",
        decade: 1920,
        title: "哈林文艺复兴与跨步钢琴",
        description: "哈林区黑人文化觉醒。跨步钢琴（Stride Piano）在深夜沙龙斗琴比赛（Cutting Contests）中飞速演进，将爵士键盘发展为能够抗衡交响乐的独奏乐器。"
      },
      {
        year: "1930s",
        decade: 1930,
        title: "棉花俱乐部与大乐团摇摆盛世",
        description: "艾灵顿公爵（Duke Ellington）入驻哈林棉花俱乐部。他将黑人怨曲与极其深邃的西方古典管弦乐编曲融合，创造出高雅华丽、精细绝伦的大乐团摇摆乐（Swing）。"
      },
      {
        year: "1940s",
        decade: 1940,
        title: "52街的咆哮波普（Bebop）革命",
        description: "查利·帕克与迪齐·葛莱斯比在 Minton's 俱乐部终结了‘摇摆乐’用于跳舞的娱乐属性。他们用极速的跑句、古怪的半音阶和复杂的切分音，将爵士乐升华为一门严谨的高深器乐艺术。"
      },
      {
        year: "1950s - 1960s",
        decade: 1950,
        title: "《Kind of Blue》调式革命与自由探索",
        description: "迈尔斯·戴维斯在此录制了音乐史上最畅销的爵士名盘《Kind of Blue》，用中世纪教会调式代替复杂的和弦进行。随后，科川与格林威治村夜店掀起了探索灵魂边界的自由爵士运动。"
      }
    ],
    characteristics: [
      {
        title: "全球最顶尖的技艺修罗场",
        englishTitle: "The Crucible of Cutting Contests",
        description: "在52街、格林威治村的俱乐部里，大师彻夜拼琴（Jam Session）。乐理不精、速度跟不上的乐手会被当场哄下台。这里是爵士极限技巧的孵化器。",
        icon: <Flame className="w-4 h-4" />
      },
      {
        title: "高深复杂的学院派编曲",
        englishTitle: "Sophisticated Orchestration",
        description: "从艾灵顿公爵的管弦交响到吉尔·埃文斯（Gil Evans）的和声织体，纽约爵士充满高度知识分子化、注重和声色彩对比的深邃美学。",
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        title: "包容万有的先锋心脏",
        englishTitle: "Crucible of Evolution",
        description: "从跨步钢琴、大乐团，到 Bebop、冷爵士、调式爵士、自由爵士和融合爵士，人类爵士史上几乎所有重要流派都在纽约繁育并被推向全球。",
        icon: <Compass className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "纽约是无可争辩的爵士地核。在这里，你每晚跨进任意一家地下俱乐部的门槛，都可能亲眼目睹未来二十年人类音乐史的发展动向。",
    anecdoteAuthor: "约翰·科川 (John Coltrane)",
    spiritSummary: "作为不夜之城与资本、文化的熔炉，纽约既给艺术家带来了最高强度的技艺折磨，也赋予了他们改变整个人类现代音乐格局的不竭动力。"
  },
  "kansas-city": {
    cityId: "kansas-city",
    timelineTitle: "堪萨斯城蓝调摇摆与竞技神话 (The Jam Arena)",
    cultureTitle: "政客庇护下的深夜喧嚣与即兴协奏",
    milestones: [
      {
        year: "1920s - 1930s",
        decade: 1920,
        title: "禁酒令法外之地的繁华夜市",
        description: "在贪腐政治巨头 Pendergast 庇护下，堪萨斯城不受禁酒令限制。五十多家俱乐部彻夜不眠，源源不断的劳工和赌场顾客为爵士乐创造了全美最狂热的生计温床。"
      },
      {
        year: "1935",
        decade: 1930,
        title: "贝西伯爵大乐团重组摇摆",
        description: "贝西伯爵（Count Basie）重组他的顶级爵士大乐团，将深厚滚烫的 12 小节布鲁斯骨架与松弛平稳、如钢铁火车般驶过的四拍摇摆节奏带向纽约，名震天下。"
      },
      {
        year: "1930s末",
        decade: 1930,
        title: "查利·帕克‘丢铜钹’闭关奇迹",
        description: "16岁的少年查利·帕克在 Reno 俱乐部即兴斗琴时由于抢拍，被著名鼓手 Jo Jones 将一面铜钹狠狠砸在脚下当众羞辱。备受打击的帕克回乡闭关，疯狂苦练，最终涅槃诞生为一代波普乐主宰。"
      }
    ],
    characteristics: [
      {
        title: "12小节布鲁斯钢铁骨架",
        englishTitle: "Uncompromising Blues Roots",
        description: "堪萨斯风格深深扎根于密苏里乡村布鲁斯。无论编制多大，音乐始终围绕饱含泥土、宣泄痛快、极具肉体冲击力的蓝调和弦进行。",
        icon: <Layers className="w-4 h-4" />
      },
      {
        title: "现场即兴口头协奏 (Riffs)",
        englishTitle: "Head Arrangements",
        description: "由于多数草根乐手不识五线谱，乐团演奏不依赖乐谱。萨克斯组和小号组现场通过人声哼唱对齐音调，即兴编出副旋律层层叠加，一呼一应、越摇摆越狂热。",
        icon: <Music className="w-4 h-4" />
      },
      {
        title: "平稳四拍子无情摇摆",
        englishTitle: "Steady 4/4 Propulsion",
        description: "彻底摒弃了新奥尔良带有进行曲色彩的强弱拍，首创了四拍完全均匀、极其松弛且充满强劲内聚力的 4/4 拍‘堪萨斯火车头律动’。",
        icon: <TrendingUp className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "我们不看谱，因为乐谱只会挡住我们的视线。我们在台上看着对方的眼睛，萨克斯组哼出一个乐句，小号组马上用咆哮回应，这就是堪萨斯城即兴的魅力。",
    anecdoteAuthor: "贝西伯爵 (Count Basie)",
    spiritSummary: "在黑帮、赌场与通宵酒精包围的荒野绿洲，堪萨斯爵士乐带着最粗犷的布鲁斯野性与最松弛的火车律动，让摇摆乐真正具有了令人起舞的肉身诱惑。"
  },
  "los-angeles": {
    cityId: "los-angeles",
    timelineTitle: "西海岸冷爵士与好莱坞录音室传奇 (The Cool West Coast)",
    cultureTitle: "海风、无钢琴复调与学院派理性",
    milestones: [
      {
        year: "1940s",
        decade: 1940,
        title: "中央大道的黑人爵士黄金街",
        description: "洛杉矶中央大道（Central Avenue）两旁林立着数十家非裔俱乐部，成为西海岸 Bebop 和早期节奏蓝调的交汇核心，好莱坞名流流连忘返。"
      },
      {
        year: "1952",
        decade: 1950,
        title: "杰里·穆里根无钢琴四重奏",
        description: "杰里·穆里根（Gerry Mulligan）在海滩边的 Lighthouse Cafe 组建了不设钢琴、仅由小号与中音萨克斯交织对位的传奇四重奏，宣告‘西海岸冷爵士（Cool Jazz）’正式诞生。"
      },
      {
        year: "1959",
        decade: 1950,
        title: "《Take Five》奇拍名震天下",
        description: "戴夫·布鲁贝克（Dave Brubeck）四重奏推出黄金名盘《Time Out》，主打曲《Take Five》打破 4/4 拍宿命，优雅轻盈的 5/4 奇拍流淌着浓郁的西海岸学院气质。"
      }
    ],
    characteristics: [
      {
        title: "清凉、克制的和声织体",
        englishTitle: "Cerebral, Air-conditioned Sound",
        description: "不同于纽约 Bebop 炽热爆裂的高速跑句，冷爵士节奏舒缓、速度平稳。管乐音色沙哑、圆润，带有极其清凉、不急不躁的中产阶级知识分子格调。",
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        title: "去钢琴的纯管乐复调交织",
        englishTitle: "Piano-less Counterpoint",
        description: "摒弃了钢琴的和弦铺垫，用低音大提琴拉出骨架，两支管乐（如 Chet Baker 的小号与 Mulligan 的萨克斯）进行类似巴赫复调般的互相咬合与即兴穿插。",
        icon: <Layers className="w-4 h-4" />
      },
      {
        title: "好莱坞录音室的专业血统",
        englishTitle: "Studio Profession & Film Score",
        description: "由于好莱坞电影工业与广播电台极度繁荣，洛杉矶乐手大多具备古典音乐底子与极高水准的识谱编曲能力，让西海岸爵士乐充满精巧如画的叙事性。",
        icon: <Award className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "纽约的爵士乐像一杯滚烫、高浓度的双倍意式浓缩，而加利福尼亚的爵士乐则像是在午后海滩吹着咸咸凉风的一杯冰镇薄荷苏打。",
    anecdoteAuthor: "切特·贝克 (Chet Baker)",
    spiritSummary: "在阳光明媚、海浪拍岸的南加州，冷爵士乐用精密的学院乐理与慵懒的音色过滤了咆哮乐的焦虑，将爵士洗练成了一首理智与情感平衡的优雅十四行诗。"
  },
  "paris": {
    cityId: "paris",
    timelineTitle: "巴黎：欧洲避风港与吉普赛热弦 (The European Sanctuary)",
    cultureTitle: "圣日耳曼的存在主义地下酒窖与摇摆弦乐",
    milestones: [
      {
        year: "1920s",
        decade: 1920,
        title: "Sidney Bechet 与无歧视乐土",
        description: "一战后，大批优秀的非裔美籍音乐家（如 Sidney Bechet）在巴黎发现这里没有严重的种族隔离，受到了法国沙龙和知识分子崇高礼遇，巴黎爵士狂热（Jazz Age）拉开序幕。"
      },
      {
        year: "1934",
        decade: 1930,
        title: "法国热力俱乐部五重奏成立",
        description: "罗姆吉他之神 Django Reinhardt 与法国古典小提琴手 Stéphane Grappelli 组建纯弦乐乐团，将传统的吉普赛流动音阶与爵士摇摆乐融为一炉，诞生了欧洲本土首个原创流派：吉普赛爵士。"
      },
      {
        year: "1957",
        decade: 1950,
        title: "迈尔斯·戴维斯与新浪潮配乐神话",
        description: "迈尔斯·戴维斯（Miles Davis）流连于巴黎左岸，在一间暗室里看着法国新浪潮导演路易·马勒的默片画面，完全即兴吹奏出了《死刑台与电梯》的凄迷配乐，名震影史。"
      }
    ],
    characteristics: [
      {
        title: "纯弦乐吉普赛热浪摇摆",
        englishTitle: "Gypsy Swing / Hot Club Sound",
        description: "不设架子鼓与铜管。由木吉他猛烈的‘泵式扫弦（La Pompe）’提供打击乐动力，小提琴与指尖飞速爬坡的吉普赛音阶交错，华丽、野性而优雅。",
        icon: <Music className="w-4 h-4" />
      },
      {
        title: "左岸存在主义沙龙文化",
        englishTitle: "Existentialist Caves",
        description: "二战后，圣日耳曼德佩区（Saint-Germain-des-Prés）的地下酒窖（Caves）里，爵士乐与萨特的存在主义哲学、让·科克托的文学诗意及左岸香颂水乳交融。",
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        title: "艺术尊严与跨界自由",
        englishTitle: "Dignity & Avant-Garde Haven",
        description: "黑人音乐家在此获得了美国本土无法想象的公民平等与艺术家尊严，促使他们在此放松探索，将法国印象派古典乐（如德彪西）的和声精妙融入即兴中。",
        icon: <Compass className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "在纽约，爵士乐是穷人赖以糊口的工作；而在巴黎，爵士乐是毕加索、萨特和我们这些诗人在地下酒窖里呼吸的存在主义自由空气。",
    anecdoteAuthor: "鲍里斯·维昂 (Boris Vian, 法国诗人)",
    spiritSummary: "塞纳河畔的咖啡香与地下酒窖的潮湿气息，让爵士乐染上了一层法式浪漫与吉普赛的流浪渴望，成为了欧洲艺术界不可或缺的现代主义图腾。"
  },
  "tokyo": {
    cityId: "tokyo",
    timelineTitle: "东京战后硬波普复兴与爵士吃茶静听美学 (The Eastern Devotion)",
    cultureTitle: "极其克制的极简线条与黑胶朝圣文化",
    milestones: [
      {
        year: "1920s - 1930s",
        decade: 1920,
        title: "关西舞厅的摇摆初声",
        description: "大阪与横滨的港口舞厅最先传入美式爵士。尽管在二战期间被军国主义政府斥为‘敌国颓废音乐’严厉禁止，乐手们仍通过改写中文/日文歌名顽强进行地下演奏。"
      },
      {
        year: "1950s - 1960s",
        decade: 1950,
        title: "美军驻地刺激与爵士吃茶（Jazz Kissa）风潮",
        description: "战后占领军俱乐部的庞大娱乐需求极大地锤炼了日本乐手的硬波普（Hard Bop）技巧。同时，由于原版黑胶唱片价格极其昂贵，专注静听黑胶、不准交谈的‘爵士咖啡馆’在新宿、银座疯狂蔓延。"
      },
      {
        year: "1970s",
        decade: 1970,
        title: "秋吉敏子与福居良的东方融合",
        description: "女钢琴家秋吉敏子在纽约引起轰动，将日本谣曲、尺八音色融入爵士大乐团；北海道钢琴家福居良（Ryo Fukui）录制《Scenery》，以干净剔透、蕴含深沉悲怨（Saudade）的东方琴音，在几十年后通过数字时代风靡全球。"
      }
    ],
    characteristics: [
      {
        title: "极致虔诚的静听黑胶文化",
        englishTitle: "Jazz Kissa Master Listening",
        description: "全球独一无二的文化空间。客人在极其名贵、精心保养的高端 JBL 或 Tannoy 音响前端坐。不准喧哗、不准起舞，怀着近乎禅修般的虔诚凝神聆听黑胶盘的每一个沙沙声。",
        icon: <Hourglass className="w-4 h-4" />
      },
      {
        title: "物哀、幽玄与清冷琴音",
        englishTitle: "Yugen & Sharp Melancholy",
        description: "日本爵士乐旋律极度优美洗练，手指触键果断、利落，音色干净得不带一丝杂质，情感克制、内敛，但在平静的冰层下涌动着滚烫的激情与哀愁（Mono no Aware）。",
        icon: <Sparkles className="w-4 h-4" />
      },
      {
        title: "偏执考究的正统内化",
        englishTitle: "Meticulous Preservation & Craft",
        description: "对黄金时代（如 Blue Note 1500 系列名盘）的乐器音色、麦克风摆位、鼓点轻重达到了像素级的考究与还原，并在此基础上发展出极高技术水准的本土现代硬波普。",
        icon: <Award className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "日本人听爵士时展现的那种安静和狂热是令人震惊的。他们不交谈，连咖啡勺碰杯子的声音都没有。他们不是在消费音乐，他们是在把自己的生命体验投射到每一个即兴段落里。",
    anecdoteAuthor: "迈尔斯·戴维斯 (Miles Davis, 1973年日本巡演口述)",
    spiritSummary: "在霓虹闪烁、高压克制的新宿小巷，爵士乐变成了现代都市人的隐世避难所，用偏执的手艺精神和悠远的哀愁，重塑了黑胶唱片里的美国神话。"
  },
  "rio-de-janeiro": {
    cityId: "rio-de-janeiro",
    timelineTitle: "里约热内卢：波萨诺瓦的优雅狂欢 (The Swelling Waves of Bossa)",
    cultureTitle: "伊帕内玛海滩沙龙、半声细语与海浪和弦",
    milestones: [
      {
        year: "1950s末",
        decade: 1950,
        title: "南区公寓沙龙里的声响革命",
        description: "在里约热内卢南区的高档公寓里，年轻的作曲家 Antonio Carlos Jobim、歌手 João Gilberto 厌倦了喧嚣狂烈的传统桑巴。他们将桑巴节奏骨架慢速化、极简化，与西海岸冷爵士乐优雅的和声进行了精妙嫁接。"
      },
      {
        year: "1959",
        decade: 1950,
        title: "电影《黑人奥菲斯》风靡欧美",
        description: "以里约贫民窟和狂欢节为背景的法国电影《黑人奥菲斯》公映，其配乐《Manhã de Carnaval》风靡全球，将这一极具慵懒热带色彩的“新浪潮（Bossa Nova）”之声推向国际视野。"
      },
      {
        year: "1962",
        decade: 1960,
        title: "卡内基音乐厅首演与《伊帕内玛姑娘》",
        description: "巴西爵士代表团在纽约卡内基音乐厅举行划时代公演。Stan Getz、João Gilberto 及其妻子 Astrud 随后录制了经典的《The Girl from Ipanema》，沙哑慵懒的耳边细语瞬间席卷全球。"
      }
    ],
    characteristics: [
      {
        title: "Batida 尼龙弦吉他轻扫节奏",
        englishTitle: "The Batida Guitar Pattern",
        description: " João Gilberto 首创。摒弃复杂的打击乐组，仅用大拇指拨弹低音弦，其余手指用极其细碎、轻柔而富有切分张力的节奏轻扫高音弦，模拟椰林海风掠过的窸窣声。",
        icon: <Music className="w-4 h-4" />
      },
      {
        title: "贴耳耳语与半声独白唱腔",
        englishTitle: "Whispering Vocals",
        description: "彻底抛弃了拉美传统大歌剧式的宏亮美声。主唱近乎贴在麦克风前，以无防备、不带颤音、如同情侣枕边悄悄话一般的半声独白进行吟唱，亲昵而性感。",
        icon: <Sparkles className="w-4 h-4" />
      },
      {
        title: "Saudade 热带慵懒与诗意哀愁",
        englishTitle: "Saudade & Complex Extensions",
        description: "和声充满大量大七度、大九度、挂留和弦及离调半音，旋律明亮温暖却透露着巴西文化中独特的‘Saudade’——一种对逝去美好时光的甜美渴望与淡淡忧伤。",
        icon: <Flame className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "波萨诺瓦不需要你用声带去战斗。它是一场贴在耳廓上的低语，是里约南区午后沙滩上，海浪一下下拍打脚踝、带走细沙的那种温柔力量。",
    anecdoteAuthor: "安东尼奥·卡洛斯·乔宾 (Antonio Carlos Jobim)",
    spiritSummary: "当酷热的桑巴遭遇冰凉的西海岸冷爵士，里约的音乐家将多余的喧嚣过滤，调配出了世界上最慵懒、最诗意、充满温热海风味道的完美感官鸡尾酒。"
  },
  "havana": {
    cityId: "havana",
    timelineTitle: "哈瓦那非裔古巴节奏与波普交配史 (The Afro-Cuban Fire)",
    cultureTitle: "圣特利亚宗教神圣仪式与克拉维节奏万花筒",
    milestones: [
      {
        year: "1940s",
        decade: 1940,
        title: "纽约与哈瓦那的首次跨洋交配",
        description: "古巴小号手 Mario Bauzá 携手 Machito 乐团在纽约首次将非洲古巴打击乐（Congas、Bongos）带入美式爵士大乐团声部，谱写了人类首支非裔古巴爵士乐《Tanga》。"
      },
      {
        year: "1947",
        decade: 1940,
        title: "Dizzy Gillespie 与古巴鼓神 Chano Pozo 联袂",
        description: "咆哮大宗师 Dizzy Gillespie 结识了哈瓦那黑人街区出身的传奇仪式鼓手 Chano Pozo，两人在52街共同谱写出狂热的不朽杰作《Manteca》。非裔古巴咆哮（Cubop）引爆美国主流爵士界。"
      },
      {
        year: "1973",
        decade: 1970,
        title: "超级乐团 Irakere 与现代熔炉",
        description: "钢琴大师 Chucho Valdés 在哈瓦那创建 Irakere（意为‘森林’）。他们大胆融合西非约鲁巴宗教仪式鼓点、复杂的 Bebop 乐理、前卫摇滚电吉他与恐怖的铜管爆发力，开创了现代拉丁爵士的新纪元。"
      }
    ],
    characteristics: [
      {
        title: "Clave 克拉维克节奏打击骨架",
        englishTitle: "The Holy Clave Metronome",
        description: "所有乐器与即兴线条均建立在 2-3 或 3-2 Clave 核心敲击模板之上。打击乐组（康加、邦戈、牛铃、Timbales）多重交织，形成强烈的身体律动与多声部切分（Polyrhythm）。",
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        title: "圣特利亚（Santería）约鲁巴宗教狂喜",
        englishTitle: "Yoruba Ritual Ecstasy",
        description: "带有极强烈的非洲约鲁巴宗教仪式属性。三面巴塔鼓（Batá）鸣响，乐段带有对非洲众神与大自然的狂烈赞美与出神状态（Trance），超越单纯的世俗娱乐。",
        icon: <Flame className="w-4 h-4" />
      },
      {
        title: "极具爆发力与炫技的拉丁铜管",
        englishTitle: "High-Octane Latin Brass",
        description: "管乐声部音色极其嘹亮、饱满，高音区爆发力恐怖。即兴独奏充满了拉美萨尔萨式的炽热舞蹈律动，乐句音符密集狂热、令人血脉偾张。",
        icon: <Music className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "当我带 Chano Pozo 在台上演出时，美国乐手全被他的康加鼓吓傻了。他嘴里哼着约鲁巴部族的古老神咒，双手在鼓面上拍击出闪电。那一刻，非洲的森林就在我们的舞台上苏醒了。",
    anecdoteAuthor: "迪齐·葛莱斯比 (Dizzy Gillespie)",
    spiritSummary: "哈瓦那的爵士乐是一场用身体和血液进行的狂欢。在这里，欧洲高深的和声密码与非洲泥土中神圣、复杂的野性节奏完成了人类音乐史最狂热、最忠贞的结合。"
  },
  "london": {
    cityId: "london",
    timelineTitle: "伦敦俱乐部中枢与新英伦复兴潮流 (The London Groove)",
    cultureTitle: "苏活地下俱乐部的抗争与街头电音熔炉",
    milestones: [
      {
        year: "1959",
        decade: 1950,
        title: "Ronnie Scott's 俱乐部落户苏活区",
        description: "英国萨克斯手 Ronnie Scott 在伦敦地下创办同名俱乐部，成为欧洲引进美国最顶尖爵士大师的第一中枢。无数黑胶现场录音在此录制，伦敦正式确立为欧洲爵士首都。"
      },
      {
        year: "1980s",
        decade: 1980,
        title: "Courtney Pine 与移民二代的英伦爵士觉醒",
        description: "加勒比与西非移民后裔音乐家在伦敦崛起。萨克斯大师 Courtney Pine 组建乐团，将雷鬼（Reggae）、Ska 律动和早期电子乐注入传统 Bop，彻底瓦解了‘爵士乐是美国专利’的迷思。"
      },
      {
        year: "2010s - Present",
        decade: 2010,
        title: "‘新伦敦爵士浪潮’席卷全球",
        description: "Shabaka Hutchings、Nubya Garcia 以及 Ezra Collective 在东伦敦夜总会发起复兴革命。他们融合了 Afrobeats、朋克、Grime 电音，将爵士重新带回年轻人的舞池，并夺得英国水星音乐大奖。"
      }
    ],
    characteristics: [
      {
        title: "打破界限的青年现场舞池文化",
        englishTitle: "Warehouse & Rave Culture Integration",
        description: "彻底推翻了‘西装革履、端坐静听’的剧院式教条。伦敦爵士生于汗水肆虐的地下夜店、仓库派对和 Rave 现场，与 Grime 电子、朋克和街头嘻哈同呼吸共命运。",
        icon: <Flame className="w-4 h-4" />
      },
      {
        title: "西非、加勒比离散移民血统",
        englishTitle: "Diaspora Roots & Dub Basslines",
        description: "注入了浓厚的牙买加 Dub 贝斯频率和西非 Afrobeats 错综复杂的对位。鼓组与低音提琴带有强烈的雷鬼式低频冲击力，声响粗粝、饱满、反叛。",
        icon: <Layers className="w-4 h-4" />
      },
      {
        title: "插电实验与粗糙摇滚态度",
        englishTitle: "Electric Fusion & Raw Energy",
        description: "重度依靠插电合成器、效果器处理器和激烈的双鼓编制。管乐合奏尖锐、撕裂、充满爆发性，带着强烈的英伦摇滚乐般桀骜不驯的反叛精神。",
        icon: <Sparkles className="w-4 h-4" />
      }
    ],
    anecdoteQuote: "在东伦敦，年轻人不买票去看端坐静听的音乐会。他们喝着啤酒在我们的萨克斯和双鼓前蹦迪。爵士乐不是死去的古董，它就在今晚伦敦地下的汗水里重新诞生。",
    anecdoteAuthor: "莎巴卡·哈钦斯 (Shabaka Hutchings)",
    spiritSummary: "伦敦爵士乐一直是一头不服管教的野兽。从 Soho 的烟雾缭绕到东伦敦的锐舞舞池，它在多民族离散文化的催化下，不断砸碎传统的枷锁，定义着二十一世纪爵士的当代面貌。"
  }
};

interface CityHistoryDetailProps {
  cityId: string;
  selectedDecade: number;
}

export default function CityHistoryDetail({ cityId, selectedDecade }: CityHistoryDetailProps) {
  const data = HISTORICAL_DATABASE[cityId];
  if (!data) return null;

  return (
    <div
      id="city-history-detail"
      className="bg-[#0D0D0D] border border-[#C9A227]/20 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-inner text-left w-full space-y-8"
    >
      {/* Golden design accent lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent"></div>
      <div className="absolute inset-1.5 border border-[#C9A227]/5 rounded-lg pointer-events-none"></div>

      {/* Grid: 2 columns for Chronology and Stylistic Characteristics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* LEFT COLUMN: TIMELINE CHRONOLOGY (7 cols) */}
        <div id="city-timeline-col" className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-[#C9A227]/15 pb-3">
            <History className="w-5 h-5 text-[#C9A227]" />
            <h3 className="text-lg font-serif font-bold text-white tracking-tight">
              {data.timelineTitle}
            </h3>
          </div>

          {/* Stepper timeline */}
          <div className="relative pl-6 border-l border-[#C9A227]/15 ml-3 space-y-6">
            {data.milestones.map((milestone, idx) => {
              // Highlight if the milestone matches the active decade slider selection
              const isEraMatch = Math.abs(milestone.decade - selectedDecade) < 10;
              return (
                <div
                  key={idx}
                  id={`timeline-step-${idx}`}
                  className={`relative transition-all duration-500 ${
                    isEraMatch ? "scale-[1.01]" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Bullet indicator */}
                  <div
                    className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      isEraMatch
                        ? "bg-[#C9A227] border-[#C9A227] shadow-[0_0_8px_#C9A227] scale-125"
                        : "bg-[#0D0D0D] border-zinc-700"
                    }`}
                  >
                    <Calendar className={`w-2 h-2 ${isEraMatch ? "text-zinc-950" : "text-zinc-500"}`} />
                  </div>

                  {/* Year Tag & Title */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded border transition-colors duration-500 ${
                        isEraMatch
                          ? "bg-[#C9A227]/15 text-[#C9A227] border-[#C9A227]/30"
                          : "bg-zinc-900/60 text-zinc-500 border-zinc-800"
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <h4 className="text-sm font-sans font-bold text-white leading-tight">
                      {milestone.title}
                    </h4>
                    {isEraMatch && (
                      <span className="text-[8px] font-mono uppercase bg-amber-500/10 border border-amber-500/30 text-amber-500 px-1 rounded animate-pulse">
                        Selected Era
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans">
                    {milestone.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: STYLISTIC CHARACTERISTICS (5 cols) */}
        <div id="city-culture-col" className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-[#C9A227]/15 pb-3">
            <Compass className="w-5 h-5 text-[#C9A227]" />
            <h3 className="text-lg font-serif font-bold text-white tracking-tight">
              {data.cultureTitle}
            </h3>
          </div>

          <div id="characteristics-grid" className="space-y-4">
            {data.characteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-[#121212] border border-zinc-900 hover:border-[#C9A227]/20 p-4 rounded-lg transition-all duration-300 relative group flex gap-3.5 items-start"
              >
                {/* Micro gold sidebar accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A227] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 rounded-l"></div>
                
                {/* Icon circle */}
                <div className="p-2 rounded bg-[#0D0D0D] border border-zinc-800 group-hover:border-[#C9A227]/30 text-[#C9A227] transition-colors shrink-0">
                  {char.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <h4 className="text-xs font-sans font-extrabold text-[#E0E0E0] uppercase tracking-wide">
                      {char.title}
                    </h4>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-tight">
                      ({char.englishTitle})
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    {char.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* LOWER FOOTER: EDITORIAL ANECDOTE QUOTE CALLOUT */}
      <div
        id="quote-block"
        className="bg-black/40 border border-[#C9A227]/10 rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row gap-5 items-center md:items-stretch justify-between"
      >
        <div className="flex gap-3 text-left">
          <Quote className="w-8 h-8 text-[#C9A227]/30 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-serif italic text-sm text-[#C9A227]/90 leading-relaxed">
              &ldquo;{data.anecdoteQuote}&rdquo;
            </p>
            <span className="block text-[10px] font-mono text-zinc-500 text-right md:text-left">
              —— {data.anecdoteAuthor}
            </span>
          </div>
        </div>

        <div className="w-full md:w-[1px] bg-[#C9A227]/15"></div>

        <div className="md:max-w-[280px] flex flex-col justify-center text-left">
          <span className="text-[9px] font-mono text-[#C9A227] uppercase tracking-widest font-bold flex items-center gap-1 mb-1">
            <BookOpen className="w-3 h-3" />
            <span>文化精神印记</span>
          </span>
          <p className="text-[10.5px] text-zinc-400 leading-normal font-sans">
            {data.spiritSummary}
          </p>
        </div>
      </div>
      
    </div>
  );
}

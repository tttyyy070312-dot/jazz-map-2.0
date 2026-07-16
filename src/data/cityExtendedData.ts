export interface CityExtended {
  cityId: string;
  soundSignature: string; // 城市声纹 / 听觉标志
  socialLandscape: string; // 时代社会背景 / 历史切片
  acousticDna: {
    title: string;
    detail: string;
  }[]; // 声学 DNA 拆解
  iconicVenues: {
    name: string;
    chineseName: string;
    description: string;
  }[]; // 标志性地标 / 殿堂
  historicMasterpieces: {
    title: string;
    chineseName: string;
    artist: string;
    year: number;
    description: string;
  }[]; // 在此诞生/灌录的不朽名盘
  aestheticQuote: {
    text: string;
    author: string;
  };
}

export const CITY_EXTENDED_DATABASE: Record<string, CityExtended> = {
  "new-orleans": {
    cityId: "new-orleans",
    soundSignature: "生锈的粗粝黄铜、潮湿的密西西比泥土律动与狂欢游行双面鼓点",
    socialLandscape: "新奥尔良作为19世纪末美国唯一的‘多种族文化熔炉’，天主教文化、法国及西班牙殖民风情、克里奥尔（Creole）精英阶层和西非黑奴在此奇迹般共存。刚果广场是当时全美唯一允许黑奴在周日合法集会并敲击非洲鼓的圣地，直接保存了西非节奏的生命血脉。",
    acousticDna: [
      {
        title: "集体即兴对位 (Collective Improvisation)",
        detail: "新奥尔良爵士乐没有固定的主旋律独奏机制，而是小号吹奏主干旋律，单簧管在其上方进行轻灵的华彩穿梭，长号在下方运用‘滑音（Tailgate）’铺垫和弦，节奏组（大号与 banjo 琴）维持稳定的切分行进。多声部齐头并进，繁而不乱。"
      },
      {
        title: "Second Line 行进切分重音",
        detail: "源自新奥尔良独特的‘欢葬礼仪’（Jazz Funeral）。前半段送葬庄严肃穆吹奏怨曲，后半段灵柩入土后，军鼓与大鼓突然敲击出欢快的切分三连音（Second Line Pulse），市民化身第二纵队共舞，以此庆祝灵魂重获自由。"
      }
    ],
    iconicVenues: [
      {
        name: "Congo Square",
        chineseName: "刚果广场",
        description: "新奥尔良路易斯·阿姆斯特朗公园内。18-19世纪，成百上千非裔奴隶在周日聚集于此，击打巴塔鼓，跳起班布拉舞，成为爵士乐节奏最原始的子宫。"
      },
      {
        name: "Preservation Hall",
        chineseName: "典藏厅",
        description: "位于法国区圣彼得街，至今仍不插电、不设空调，保留最原始的煤油灯氛围，是全球体验新奥尔良传统爵士（Dixieland）的终极麦加。"
      },
      {
        name: "Storyville District",
        chineseName: "斯托里维尔红灯区",
        description: "1897至1917年间新奥尔良合法的娱乐特区，数十家沙龙斗琴彻夜不停，路易斯·阿姆斯特朗等大师早年在此擦皮鞋、演奏乐器谋生。"
      }
    ],
    historicMasterpieces: [
      {
        title: "West End Blues",
        chineseName: "西区布鲁斯",
        artist: "Louis Armstrong & His Hot Five",
        year: 1928,
        description: "开场长达15秒的小号无伴奏华彩独奏，被乐界誉为‘现代即兴爵士的独立宣言’，彻底结束了大合奏传统，确立了独奏大师的至高地位。"
      },
      {
        title: "Black Bottom Stomp",
        chineseName: "黑底顿足舞曲",
        artist: "Jelly Roll Morton & His Red Hot Peppers",
        year: 1926,
        description: "精妙融合了拉格泰姆、古典音乐赋格和即兴切分，展现了莫顿作为‘首位爵士乐作曲家’极其恐怖的编曲手艺。"
      }
    ],
    aestheticQuote: {
      text: "如果你需要问爵士乐是什么，你永远也不会知道。但在新奥尔良，连空气中的湿度都带着切分的重音。",
      author: "路易斯·阿姆斯特朗 (Louis Armstrong)"
    }
  },
  "chicago": {
    cityId: "chicago",
    soundSignature: "雷厉风行的机车铁轨律动、都市电声化序曲与钢骨铮铮的独奏小号",
    socialLandscape: "1917年 Storyville 的关闭，强行剥夺了南方黑人乐手的生计。适逢一战后工业大迁徙（The Great Migration），成千上万非裔劳工沿着铁路线北上芝加哥。风城蓬勃的肉制品加工业、钢铁厂以及黑帮控制的地下酒吧（Speakeasy），为南方音乐提供了远比农田优渥的生存土壤。",
    acousticDna: [
      {
        title: "独奏叙事主义的确立 (The Rise of the Soloist)",
        detail: "在芝加哥南区的录音室和舞台上，新奥尔良式的集体对位法开始向‘个人叙事独奏’让步。每一个声部轮流上前接受聚光灯照耀，乐手个人的即兴技术、音色辨识度以及长篇乐句构筑能力成为了衡量爵士水准的终极标尺。"
      },
      {
        title: "芝加哥学派白人精致编曲",
        detail: "以 Bix Beiderbecke 为代表的本地白人青年疯狂吸纳黑人唱片的律动，但在乐器编制上引入萨克斯，在和声上引入了德彪西、拉威尔等法国印象派古典和弦，音色上更趋克制、圆润、带有内省的知识分子格调。"
      }
    ],
    iconicVenues: [
      {
        name: "The Green Mill Cocktail Lounge",
        chineseName: "绿磨坊酒廊",
        description: "创立于1907年，芝加哥黑帮老大阿尔·卡朋（Al Capone）最钟爱的会所。店内至今保留着卡朋当年的专属卡座和用于逃脱警察突袭的地下秘道，是芝加哥咆哮二十年代的活化石。"
      },
      {
        name: "Lincoln Gardens (Royal Gardens Cafe)",
        chineseName: "林肯花园",
        description: "芝加哥南区黑人社区的娱乐核心，King Oliver 的克里奥尔爵士乐团在此驻场。1922年阿姆斯特朗在此吹奏第二小号，引来全城音乐人朝圣。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Potato Head Blues",
        chineseName: "土豆头布鲁斯",
        artist: "Louis Armstrong & His Hot Seven",
        year: 1927,
        description: "阿姆斯特朗在曲中使用中音萨克斯风伴奏，吹出了一段极具弹性、超越节拍线束缚的划时代即兴独奏，被视为早期爵士摇摆律动的终极教科书。"
      },
      {
        title: "Singin' the Blues",
        chineseName: "吟唱布鲁斯",
        artist: "Bix Beiderbecke & Frankie Trumbauer",
        year: 1927,
        description: "Bix 的短号独奏温柔、忧郁、颗粒感清晰，完全摒弃了南方嘹亮粗粝的爆音，开创了后世‘冷爵士乐（Cool Jazz）’的先河。"
      }
    ],
    aestheticQuote: {
      text: "新奥尔良是泥土里的种子，而芝加哥是温室和录音室，让这粒种子真正开出了震动文明世界的金色花朵。",
      author: "King Oliver 乐团鼓手回忆录"
    }
  },
  "new-york": {
    cityId: "new-york",
    soundSignature: "哈林区沙龙跨步钢琴的指尖风暴、52街波普革命的极速半音阶跑句与现代先锋交响",
    socialLandscape: "纽约作为全球的资本和文化中枢，为爵士乐提供了全美最严酷、最顶级的技艺修罗场。20年代的‘哈林文艺复兴’唤醒了非裔美国人的艺术自觉，30年代的大乐团摇摆盛世让爵士乐成为风靡全美的主流流行舞曲，而40年代52街的 Bebop 革命，则彻底将爵士乐从‘跳舞娱乐’升华为‘严肃器乐艺术’。",
    acousticDna: [
      {
        title: "跨步钢琴 (Stride Piano) 键盘风暴",
        detail: "源自哈林区公寓筹款派对（Rent Parties）。左手在低音区和中音区进行极宽跨度的‘强-弱-强-弱’根音与和弦交替，右手则在中高音区弹奏令人眼花缭乱的切分拉格泰姆旋律，使一台钢琴能爆发出一个行进乐团的恐怖动态。"
      },
      {
        title: "Bebop 咆哮乐的极致乐理",
        detail: "查利·帕克与迪齐·葛莱斯比在深夜 Jam Sessions 中发明。摒弃大乐团平庸的跳舞切分，改用 16 分音符甚至 32 分音符的高速跑句、怪异的减五度和弦（Flatted Fifth）、半音阶过渡与错综复杂的重音移位，让庸才乐手根本无法插嘴。"
      }
    ],
    iconicVenues: [
      {
        name: "Village Vanguard",
        chineseName: "村庄先锋酒吧",
        description: "成立于1935年，格林威治村地下圣殿。拥有独特的楔形空间，产生了无可匹敌的声学共鸣。科川、索尼·罗林斯、比尔·艾文斯等在此灌录了爵士史上最伟大的现场实况黑胶。"
      },
      {
        name: "The Cotton Club",
        chineseName: "棉花俱乐部",
        description: "哈林区传奇会所。30年代仅招待白人顾客，但舞台完全由黑人巨星艾灵顿公爵和卡布·卡洛威统治，其‘丛林风声学美学’通过全国广播传遍美利坚。"
      },
      {
        name: "Minton's Playhouse",
        chineseName: "明顿剧场",
        description: "位于哈林区，Bebop 咆哮乐的诞生地。Monk、Parker 和 Gillespie 彻夜在台上斗琴，攻克和声难题，完成了现代爵士乐的基因重组。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Kind of Blue",
        chineseName: "泛蓝调调",
        artist: "Miles Davis",
        year: 1959,
        description: "录制于哥伦比亚唱片30街教堂录音室，人类音乐史上最畅销、最深邃的爵士唱片。用古老的教会调式（Modes）代替了咆哮乐繁琐的和弦进行，留下了无限的东方留白之美。"
      },
      {
        title: "A Love Supreme",
        chineseName: "至高无上的爱",
        artist: "John Coltrane",
        year: 1964,
        description: "录制于新泽西 Van Gelder 录音室。一部宏大的四乐章灵性交响诗。科川用撕裂的萨克斯超吹与冥想乐句，将自由爵士与宗教虔诚推向了人类体验的终极边界。"
      }
    ],
    aestheticQuote: {
      text: "如果你能通过纽约52街深夜的考验，你就能征服世界上任何一个舞台。在这里，妥协就等于艺术自杀。",
      author: "查利·帕克 (Charlie Parker)"
    }
  },
  "kansas-city": {
    cityId: "kansas-city",
    soundSignature: "雷霆万钧的12小节布鲁斯钢轨律动、现场口头哼唱对齐协奏与彻夜不眠的竞技斗琴",
    socialLandscape: "在20-30年代严酷的禁酒令时期，堪萨斯城却在黑帮政客 Pendergast 的极度腐败与庇护下沦为‘不夜城’。全市五十多家夜总会不受限制，通宵售酒、赌博，成为中西部最狂热的娱乐绿洲。成百上千不识谱的草根乐手汇聚于此，依靠纯粹的听觉和体力，在深夜斗琴赛中锤炼出最狂野的摇摆乐。",
    acousticDna: [
      {
        title: "口头协奏机制 (Head Arrangements)",
        detail: "堪萨斯大乐团（如 Count Basie）极少使用复杂的书面乐谱。铜管组往往在台上现想旋律，萨克斯手哼出一个简短的、富有律动的乐句（Riff），小号组马上心领神会地用咆哮的长音进行对位应答，依靠极强的集体默契和现场张力层层推进，直到乐棚顶棚几乎被掀翻。"
      },
      {
        title: "火车头均匀 4/4 拍步进 (The Kansas Locomotive Beat)",
        detail: "贝西伯爵乐团的节奏组（Jo Jones 的轻掠踩镲、Freddie Green 的木吉他均匀扫弦、Walter Page 的步行低音大提琴）打破了新奥尔良的进行曲重音，首创了完全均匀、松弛但带有无法抗拒推进力的 4/4 拍步进，让起舞的肉体完全无法抗拒。"
      }
    ],
    iconicVenues: [
      {
        name: "Mutual Musicians Foundation",
        chineseName: "音乐家互助基金会",
        description: "创立于1917年。全美历史最悠久的非裔音乐人行会大楼。至今每周五、周六深夜一点半开始举行极度传统的通宵 Jam Session，保留了堪萨斯城斗琴竞技的纯正火种。"
      },
      {
        name: "Reno Club",
        chineseName: "雷诺俱乐部",
        description: "堪萨斯爵士全盛期的风暴中心。贝西伯爵乐团在此驻场并被电台直播发现，也是16岁的查利·帕克被 Jo Jones 砸铜钹羞辱、含泪闭关的传奇发生地。"
      }
    ],
    historicMasterpieces: [
      {
        title: "One O'Clock Jump",
        chineseName: "一点钟跳跃",
        artist: "Count Basie Orchestra",
        year: 1937,
        description: "堪萨斯爵士的无上圣歌。全曲几乎没有书面乐谱，依靠钢琴引路、管乐组层层咬合的布鲁斯 Riff 交织，爆发出了如钢铁火车般的松弛推进力。"
      },
      {
        title: "Lester Leaps In",
        chineseName: "莱斯特飞跃",
        artist: "Count Basie's Kansas City Seven",
        year: 1939,
        description: "萨克斯宗师 Lester Young 在此曲中吹出了极其轻盈、松弛、水平流淌的即兴段落，彻底摆脱了萨克斯原有的笨重感，直接启迪了后世的冷爵士审美。"
      }
    ],
    aestheticQuote: {
      text: "我们不在乎谱子上写了什么。我们闭上眼睛，萨克斯组吹出一个动机，我们马上用雷霆般的声音顶上去，直到所有人都在汗水里疯狂起舞。",
      author: "贝西伯爵 (Count Basie)"
    }
  },
  "los-angeles": {
    cityId: "los-angeles",
    soundSignature: "慵懒克制的太平洋海风音色、不设钢琴的复调对位与好莱坞录音室的华丽编曲",
    socialLandscape: "洛杉矶作为阳光充沛的南加州核心与好莱坞电影、电视、广播工业的帝国中枢，在50年代孕育出了与纽约炽热爆裂的 Bebop 完全相反的爵士流派——‘西海岸冷爵士（West Coast Cool Jazz）’。这里的乐手大多具备极其扎实的古典学院派底子，受聘于各大制片厂，他们将冷抒情、室内乐的精密编曲与阳光沙滩的慵懒闲适完美调和。",
    acousticDna: [
      {
        title: "无钢琴复调编织 (Piano-less Counterpoint)",
        detail: "以 Gerry Mulligan 四重奏为代表。他们大胆拆除了钢琴这一提供和弦背景的‘传统乐器’，仅留低音大提琴和架子鼓勾勒骨架，让小号（Chet Baker）与上低音萨克斯（Mulligan）在空中进行如巴赫创意曲一般的双管多声部对位穿梭。声部极为通透，空气感十足。"
      },
      {
        title: "奇特拍号与室内乐美学 (Odd Meter Experimentation)",
        detail: "打破爵士乐传统的 4/4 拍或 3/4 拍宿命。戴夫·布鲁贝克等人引入了 5/4 拍、9/8 拍等在古典和土耳其民间音乐中使用的奇特节拍，在钢琴上敲击出极具建筑感的块状和弦，使音乐兼具理性的数学美与优雅的摇摆感。"
      }
    ],
    iconicVenues: [
      {
        name: "Lighthouse Cafe",
        chineseName: "灯塔咖啡馆",
        description: "位于洛杉矶爱马仕海滩（Hermosa Beach）。50年代起成为西海岸冷爵士乐的最核心常驻地，乐手们下午在海滩冲浪晒太阳，晚上走入店内吹奏极其清凉的音符。"
      },
      {
        name: "Central Avenue (Alabam Club)",
        chineseName: "中央大道 (阿拉巴姆俱乐部)",
        description: "二战期间洛杉矶非裔社区的文化心脏，被称为‘西海岸的52街’。Dexter Gordon 等大师早年在此进行激烈的 Bebop 搏杀，好莱坞明星如玛丽莲·梦露常来此朝圣。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Time Out",
        chineseName: "暂停",
        artist: "Dave Brubeck Quartet",
        year: 1959,
        description: "录制于好莱坞。首张销量破百万的爵士乐专辑。其中的《Take Five》（5/4 奇拍）和《Blue Rondo à la Turk》（9/8 拍）优雅、知性，将爵士奇数拍玩转得轻盈如沙龙漫步。"
      },
      {
        title: "Chet Baker Sings",
        chineseName: "切特·贝克倾情献唱",
        artist: "Chet Baker",
        year: 1954,
        description: "录制于洛杉矶。切特用他近乎没有性别感、平铺直叙、极度脆弱慵懒的耳语声线，与他沙哑的小号声交织，铸就了西海岸爵士最无解的忧郁青春偶像神话。"
      }
    ],
    aestheticQuote: {
      text: "纽约的爵士乐像一杯在暴风雪里强行灌下的双倍浓缩咖啡，而我们洛杉矶的音符，则是在黄昏海岸吹着太平洋咸风的一杯冰镇薄荷苏打。",
      author: "切特·贝克 (Chet Baker)"
    }
  },
  "paris": {
    cityId: "paris",
    soundSignature: "圣日耳曼地下酒窖的存在主义香烟烟雾、木吉他泵式扫弦与悲喜交织的吉普赛小提琴",
    socialLandscape: "一战后，大批优秀的非裔美籍音乐家（如 Sidney Bechet）在巴黎发现这里没有美国本土那种令人窒息的种族歧视，反而受到了萨特、毕加索、让·科克托等法国知识分子的崇高礼遇。二战后，塞纳河左岸圣日耳曼德佩区（Saint-Germain-des-Prés）的地下酒窖（Caves）里，爵士乐与香颂、存在主义哲学深度交融，巴黎成为了欧洲本土爵士乐的灵魂大本营。",
    acousticDna: [
      {
        title: "吉普赛摇摆律动 (Gypsy Swing / La Pompe)",
        detail: "Django Reinhardt 创造。不设架子鼓和铜管乐器，完全由木吉他采取极其剧烈、短促的‘泵式扫弦’（La Pompe）提供类似火车行进的马达动力。独奏吉他采用大跨度的罗姆半音阶和三度双音速弹，小提琴在上方揉弦，带有浓郁的流浪渴望与高贵哀愁。"
      },
      {
        title: "印象派和声与香颂旋律跨界",
        detail: "法国爵士深受德彪西、萨蒂、拉威尔等法国本土古典印象派的影响，和声极其幽深迷离。同时，他们将法国香颂那迷离、忧伤、叙事性的主旋律融入即兴，让硬核的美国爵士乐多了一份法式的香水味与电影感。"
      }
    ],
    iconicVenues: [
      {
        name: "Le Caveau de la Huchette",
        chineseName: "拉胡塞特地下酒窖",
        description: "位于巴黎圣母院附近，始于16世纪的地下古老石窟。二战后改建为爵士舞厅。至今仍保留着1940年代最纯粹的存在主义跳舞传统，曾在电影《爱乐之城》中露面。"
      },
      {
        name: "Club Saint-Germain",
        chineseName: "圣日耳曼俱乐部",
        description: "40-50年代巴黎左岸的核心会所，萨特、波伏娃、加缪深夜常驻于此，探讨存在主义哲学的同时，看着迈尔斯·戴维斯和查利·帕克吹奏波普乐。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Minor Swing",
        chineseName: "小调摇摆",
        artist: "Quintette du Hot Club de France",
        year: 1937,
        description: "吉普赛爵士乐的不朽国歌。Django 仅用完好的两根左手指，在尼龙弦吉他上弹出了令人难以置信的炽热音符，与 Grappelli 华丽的小提琴揉弦完美共振。"
      },
      {
        title: "Ascenseur pour l'échafaud",
        chineseName: "死刑台与电梯 (电影配乐)",
        artist: "Miles Davis",
        year: 1957,
        description: "录制于巴黎。迈尔斯戴着墨镜，在一间漆黑的巴黎录音室里，看着新浪潮导演路易·马勒的默片投影。没有任何乐谱，完全凭直觉即兴吹奏出了影史最迷离、凄冷、饱含孤独湿气的经典配乐。"
      }
    ],
    aestheticQuote: {
      text: "在美国，爵士乐是我们赖以糊口、遭受歧视的体力活；但在巴黎，爵士乐是毕加索、让·科克托和我们这群诗人在地下酒窖里呼吸的存在主义自由空气。",
      author: "鲍里斯·维昂 (Boris Vian, 法国先锋诗人)"
    }
  },
  "tokyo": {
    cityId: "tokyo",
    soundSignature: "新宿黄金街极其昂贵的黑胶真空管音响、清冷极简的东方留白琴音与极致虔诚的静听禅修",
    socialLandscape: "日本战后作为美军占领基地，美军俱乐部庞大的娱乐需求极大地锤炼了日本乐手的硬波普（Hard Bop）技术。由于原版进口黑胶唱片在战后极其昂贵，专注静听黑胶、严禁交谈、近乎禅修般的‘爵士吃茶（Jazz Kissa）’文化在新宿、银座疯狂蔓延。日本乐手以极其偏执、考究的匠人精神，将美国蓝调内化为一种清冷、物哀（Mono no Aware）的东方哀愁美学。",
    acousticDna: [
      {
        title: "禅宗式音色控制与物哀旋律 (Melancholic Melodism)",
        detail: "以钢琴家福居良（Ryo Fukui）、山本刚为代表。他们的触键果断、干净，绝不拖泥带水，音色没有美国乐手那种黏糊的泥土感，而是冰冷剔透、高音区直击人心。和声中巧妙融入日本五声音阶与淡淡的‘哀愁（Saudade/Melancholy）’，完美契合东方的悲悯美学。"
      },
      {
        title: "极尽考究的正统内化 (Obsessive Preservation)",
        detail: "日本爵士乐手和音响大师对黄金时代（如 Blue Note 1500、4000系列名盘）的录音细节、麦克风摆位、鼓手敲击踩镲的物理力度有着近乎学术性的像素级探究。他们将硬波普乐理研究到了极致，创造出了和声极度严密、技术无懈可击的正统巨作。"
      }
    ],
    iconicVenues: [
      {
        name: "Shinjuku Pit Inn",
        chineseName: "新宿 Pit Inn",
        description: "创立于1965年，日本最著名的现场爵士圣殿。半个世纪以来，这里孕育了渡边贞夫、山下洋介、秋吉敏子等所有日本爵士乐泰斗，至今仍是东京前卫爵士的发动机。"
      },
      {
        name: "Jazz Kissa L-G-B (Dug / Shinjuku)",
        chineseName: "新宿 Dug 爵士吃茶",
        description: "由传奇摄影师中平卓马、植田正治时期的爵士迷创办。作家村上春树年轻时常来此寻找灵感，并在小说《挪威的森林》中多次描写，是日本高阶黑胶静听朝圣文化的活化石。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Scenery",
        chineseName: "风景",
        artist: "Ryo Fukui (福居良)",
        year: 1976,
        description: "录制于北海道札幌。福居良凭借极其惊人的天赋，自学成才录制的钢琴三重奏天盘。开场曲《It Could Happen to You》琴音剔透如落雪，蕴含深沉悠远的东方物哀之美，在数十年后风靡全球数字流媒体。"
      },
      {
        title: "Long Yellow Road",
        chineseName: "漫长黄土路",
        artist: "Toshiko Akiyoshi-Lew Tabackin Big Band",
        year: 1975,
        description: "女钢琴家、编曲大师秋吉敏子的巅峰交响巨作。将日本传统尺八、谣曲、太鼓律动与西方宏大的咆哮大乐团和声进行史诗般的跨界融合，名震纽约乐界。"
      }
    ],
    aestheticQuote: {
      text: "日本人听爵士时展现的那种安静和狂热是令我敬畏的。他们端坐着凝视音箱，不交谈，连咖啡勺碰杯子的声音都没有。他们不是在消费音乐，他们是在把自己的生命体验投射到每一个即兴段落里。",
      author: "迈尔斯·戴维斯 (Miles Davis, 1973年日本巡演日记)"
    }
  },
  "rio-de-janeiro": {
    cityId: "rio-de-janeiro",
    soundSignature: "伊帕内玛海滩黄昏的和弦热浪、贴耳呼吸的无颤音低吟与尼龙弦吉他的沙沙声",
    socialLandscape: "50年代末的里约热内卢，正处于巴西经济飞速增长、民主氛围空前宽容的‘黄金时代’。南区（Zona Sul）高档公寓里的中产阶级年轻知识分子（如 Jobim 与 Gilberto）厌倦了传统桑巴音乐的大声喧哗和夸张戏剧性。他们将桑巴 rhythm 抽骨剥髓，融入美国西海岸冷爵士乐极其温柔、高阶的和弦进行，在枕边和沙龙里调制出了风靡全球的‘新浪潮（Bossa Nova）’。",
    acousticDna: [
      {
        title: "Batida 尼龙吉他核心节奏法",
        detail: "João Gilberto 独创。彻底拆除了厚重的桑巴打击乐器，仅用一把原声尼龙弦吉他。大拇指拨弹低音弦，模拟桑巴大鼓（Surdo）的平稳切分心跳；其余三根手指则在重音处极轻、极细碎地轻扫高音弦，模拟椰林海风吹拂的沙沙律动，具有极强内聚力。"
      },
      {
        title: "耳旁悄悄话式半声唱腔 (Sotto Voce)",
        detail: "彻底颠覆了传统拉美歌手高亢、抖颤、戏剧性的美声唱法。歌手极其贴近麦克风，近乎使用气音、不带任何人工颤音、平铺直叙地在听众耳畔倾诉，将演唱降级为最亲昵、最不设防的感官沟通。"
      }
    ],
    iconicVenues: [
      {
        name: "Beco das Garrafas",
        chineseName: "瓶子巷",
        description: "位于里约科帕卡巴纳海滩附近的狭窄小巷，由数家深夜小酒吧组成。50年代末，Jobim、Gilberto 等波萨诺瓦元老每晚在此挤满一室，对着仅有的几名听众低吟浅唱，是这一流派的真正发源地。"
      },
      {
        name: "Ipanema Beach (Garota de Ipanema Bar)",
        chineseName: "伊帕内玛海滩 (伊帕内玛姑娘酒吧)",
        description: "昔日的 Veloso 咖啡馆，Jobim 与作词家 Vinicius 曾在此喝啤酒，看着17岁的少女 Helô Pinheiro 摇摆着走向金色海滩，并在此写下了《伊帕内玛姑娘》这一不朽名曲。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Getz/Gilberto",
        chineseName: "盖茨与吉尔贝托",
        artist: "Stan Getz & João Gilberto",
        year: 1964,
        description: "爵士史上最伟大的跨国联袂。Stan Getz 温暖沙哑的萨克斯风，与吉尔贝托克制温润的尼龙吉他完美交融。吉尔贝托的妻子 Astrud 阴差阳错地用清纯、无修饰的英文献唱了《The Girl from Ipanema》，席卷全球，彻底改写了世界流行音乐历史。"
      },
      {
        title: "Chega de Saudade",
        chineseName: "说不出的忧伤 / 悲伤无用",
        artist: "João Gilberto / Antonio Carlos Jobim",
        year: 1958,
        description: "波萨诺瓦的开山之作。Gilberto 那颠覆性的吉他弹唱，向整个拉美乐坛宣告：一个不需要大声呼喊、仅用耳语和九和弦就能震撼灵魂的新时代正式到来。"
      }
    ],
    aestheticQuote: {
      text: "波萨诺瓦不需要你用声带去战斗，它是一场贴在耳廓上的温柔低语。它明亮如里约的阳光，和弦里却写满了对逝去美好时光的甜美忧伤（Saudade）。",
      author: "安东尼奥·卡洛斯·乔宾 (Antonio Carlos Jobim)"
    }
  },
  "havana": {
    cityId: "havana",
    soundSignature: "非裔约鲁巴神圣巴塔鼓点、不妥协的 3-2 Clave 黄金律动与火山喷发般的高亢铜管",
    socialLandscape: "哈瓦那是非洲宗教律动与欧洲管弦乐在加勒比海发生大撞击的中心。1940年代，古巴革命前作为全美名流歌舞升平的后花园，娱乐业极度畸形繁荣。古巴传统的曼波（Mambo）、颂（Son）、圣特利亚（Santería）黑人祭祀鼓点，与纽约 52 街爆裂的 Bebop 和声进行了跨洋交配，点燃了非裔古巴爵士（Afro-Cuban Jazz）那长盛不衰的火山大火。",
    acousticDna: [
      {
        title: "Clave 克拉维节奏骨架 (The Holy Clave)",
        detail: "非裔古巴爵士乐的铁律。全曲的即兴和伴奏必须完全咬合在 3-2（强-强-强，弱-弱）或 2-3 Clave 敲击木棒的核心模板之上。贝斯和钢琴进行‘Guajeo’式的固定环状音型切分，康加鼓（Congas）、邦戈鼓（Bongos）、牛铃、Timbales 编织出极为错综复杂的多声部切分律动（Polyrhythm），让人的身体情不自禁地随节奏扭动。"
      },
      {
        title: "高能量高音区铜管风暴 (High-Octane Latin Brass)",
        detail: "不同于冷爵士的克制，拉丁爵士管乐声部具有恐怖的爆发力和清亮音色，小号手经常挑战极高音区（Double High C），即兴乐句音符极度密集、速度奇快，带有类似狂欢节游行般的狂喜与肉体狂欢张力。"
      }
    ],
    iconicVenues: [
      {
        name: "Tropicana Club",
        chineseName: "热带天堂大夜总会",
        description: "建于1939年。冷战前全美富豪、好莱坞影星、黑帮巨头在古巴最奢华的朝圣地。在露天的参天大树下，上百名古巴舞者伴随着最狂烈的拉丁爵士大乐团声响共舞，被誉为‘声色犬马的加勒比极致’。"
      },
      {
        name: "Club Social de Buena Vista",
        chineseName: "乐满哈瓦那社交俱乐部",
        description: "哈瓦那老城区黑人社区的传奇音乐社交会所，无数古巴传统国宝级老音乐家在此斗乐。其遗落半世纪后的风华在温德斯同名纪录片中感动了整个世界。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Manteca",
        chineseName: "牛油 / 曼特卡",
        artist: "Dizzy Gillespie & Chano Pozo",
        year: 1947,
        description: "非裔古巴咆哮乐（Cubop）的不朽奠基石。Dizzy 的 52 街咆哮小号与 Chano Pozo 带有非洲约鲁巴咒语性质的康加鼓点历史性相撞，彻底打破了西方古典 4/4 拍律动壁垒。"
      },
      {
        title: "Misa Negra",
        chineseName: "黑色弥撒",
        artist: "Irakere (Chucho Valdés)",
        year: 1978,
        description: "古巴前卫爵士熔炉 Irakere 的史诗巨作。完美融合了西非部族古老的巴塔鼓神圣仪式、复杂的西方先锋乐理、前卫摇滚电吉他与恐怖的拉丁铜管爆发力，开创了现代拉丁爵士新纪元。"
      }
    ],
    aestheticQuote: {
      text: "当我带 Chano Pozo 在台上演出时，美国乐手全被他的康加鼓吓傻了。他嘴里哼着约鲁巴部族的古老神咒，双手在鼓面上拍击出闪电。那一刻，非洲的森林就在我们的舞台上苏醒了。",
      author: "迪齐·葛莱斯比 (Dizzy Gillespie)"
    }
  },
  "london": {
    cityId: "london",
    soundSignature: "苏活地下俱乐部的抗议长音、加勒比移民离散低频与粗粝电子朋克的狂舞汗水",
    socialLandscape: "伦敦爵士乐从来不是对美国的温顺模仿，而是一场伴随着离散移民、工人阶级抗争与锐舞文化（Rave）的叛逆革命。50年代 Ronnie Scott 在 Soho 区建立欧洲最强爵士俱乐部奠定阵地，80年代加勒比二代移民（Courtney Pine）觉醒，将雷鬼（Reggae）、Dub 和 Ska 律动带入爵士；而 2010 年代至今的‘新伦敦爵士浪潮’，则彻底将爵士乐带回了出汗、啤酒飞溅的年轻人舞池。",
    acousticDna: [
      {
        title: "加勒比离散重低音与 Dub 贝斯频率",
        detail: "伦敦爵士节奏组深受牙买加、尼日利亚等英联邦移民离散文化的影响。低音提琴或电贝斯往往弹奏出极其沉重、类似 Dub 雷鬼乐的低频环状律动，而鼓组则引入 Afrobeats 的错位踩镲和碎拍，声响粗粝、饱满、带有极其反叛的地下俱乐部重低音。"
      },
      {
        title: "现场锐舞与电子朋克跨界 (Club-Oriented Jazz)",
        detail: "彻底击碎了传统爵士乐‘西装革履、端坐剧院、礼貌鼓掌’的中产阶级神圣教条。伦敦乐手重度使用插电合成器、延迟/失真效果器，编织出极其撕裂、尖锐的工业级声场，音乐动机高度重复并带有仪式感，完全以诱导听众在现场疯狂蹦迪、释放肉体能量为最高目的。"
      }
    ],
    iconicVenues: [
      {
        name: "Ronnie Scott's Jazz Club",
        chineseName: "罗尼·斯科特爵士俱乐部",
        description: "位于伦敦苏活区弗里斯街，成立于1959年。欧洲最享有盛誉的爵士殿堂，也是引进美国顶尖大师、录制无数经典现场的名盘孵化器，是欧洲爵士的无上大本营。"
      },
      {
        name: "Total Refreshment Centre",
        chineseName: "全面恢复中心 (TRC / 伦敦东区)",
        description: "位于东伦敦达尔斯顿（Dalston），原是一个废弃的苏打水工厂。近年来成为了‘新英伦爵士浪潮’的孵化器和创意公社，也是 Shabaka Hutchings 等先锋音乐家举行仓库派对的大本营。"
      }
    ],
    historicMasterpieces: [
      {
        title: "Where Fela Meets Monk",
        chineseName: "当费拉遇见蒙克",
        artist: "Courtney Pine",
        year: 1986,
        description: "英国爵士觉醒名盘。萨克斯大师 Pine 将尼日利亚 Afrobeats 宗师 Fela Kuti 的非洲律动，与波普怪杰 Thelonious Monk 的怪异和弦跨洋缝合，宣告了英伦爵士独立血统的诞生。"
      },
      {
        title: "Where I'm Meant to Be",
        chineseName: "此心安处",
        artist: "Ezra Collective",
        year: 2022,
        description: "荣获英国至高水准‘水星音乐奖’（Mercury Prize）的划时代杰作。完美融合了伦敦 Grime 嘻哈、Dub 雷鬼、Ska 与精妙的波普吹奏，彻底将二十一世纪的爵士乐重新定义为年轻人的街头锐舞乐章。"
      }
    ],
    aestheticQuote: {
      text: "在东伦敦，年轻人不买票去看端坐静听的音乐会。他们喝着啤酒在我们的萨克斯和双鼓前蹦迪。爵士乐不是死去的博物馆古董，它就在今晚伦敦地下的汗水里重新诞生。",
      author: "莎巴卡·哈钦斯 (Shabaka Hutchings, 伦敦先锋萨克斯手)"
    }
  }
};

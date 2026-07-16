export interface City {
  id: string;
  name: string;
  chineseName: string;
  country: string;
  latitude: number; // For actual geographic ref
  longitude: number;
  x: number; // Normalized percentage coordinate (0-100) for custom SVG map
  y: number; // Normalized percentage coordinate (0-100) for custom SVG map
  period: string;
  importance: string;
  description: string;
  keyFigures: string[]; // Musician IDs
  keyGenres: string[]; // Genre IDs
  clubs: string[]; // Club IDs
  audioPreset: string; // The synthetic music generator preset name
}

export interface JazzConnection {
  targetId: string; // ID of musician, club, city, style, record label, etc.
  targetType: "musician" | "city" | "club" | "label" | "album" | "style";
  targetName: string; // Display name
  targetChineseName: string; // Display chinese name
  type: "teacher" | "collaborator" | "same_band" | "recording_session" | "inspiration" | "contemporary" | "rival" | "same_label" | "same_city" | "same_style" | "venue";
  description: string; // Explaining the connection e.g. "共同灌录《Kind of Blue》"
}

export interface Musician {
  id: string;
  name: string;
  chineseName: string;
  birthYear: number;
  deathYear: number;
  instrument: string;
  birthplace: string;
  style: string;
  shortBio: string;
  keyAlbums: {
    title: string;
    year: number;
    description: string;
  }[];
  influencedBy: string[]; // Musician IDs
  collaborators: string[]; // Musician IDs
  connections?: JazzConnection[];
  isHiddenGem?: boolean;
}

export interface Club {
  id: string;
  name: string;
  chineseName: string;
  cityId: string;
  openedYear: number;
  closedYear: number | "present";
  address: string;
  famousPerformers: string[];
  history: string;
}

export interface Genre {
  id: string;
  name: string;
  chineseName: string;
  period: string; // Era e.g., "1890s-1910s"
  description: string;
  color: string; // Tailwind color or hex code
  keyArtists: string[]; // Musician IDs
}

export interface MigrationFlow {
  id: string;
  fromCityId: string;
  toCityId: string;
  era: string;
  description: string;
  label: string;
  coordinates: { x: number; y: number }[]; // Control points for curved SVG lines
}

// 1. GORGEOUS STYLISH CITIES
export const cities: City[] = [
  {
    id: "new-orleans",
    name: "New Orleans",
    chineseName: "新奥尔良",
    country: "USA",
    latitude: 29.9511,
    longitude: -90.0715,
    x: 23.5,
    y: 48.0,
    period: "1890s - 1920s",
    importance: "Birthplace of Jazz (爵士乐的发源地)",
    description: "位于密西西比河入海口，新奥尔良是法国、西班牙、非洲裔和加勒比文化的熔炉。刚果广场（Congo Square）的非洲鼓点，与欧洲军乐、福音音乐、法国歌剧及拉格泰姆在此融合，诞生了最早的传统爵士乐（Dixieland）。",
    keyFigures: ["louis-armstrong", "jelly-roll-morton", "king-oliver"],
    keyGenres: ["ragtime", "dixieland"],
    clubs: ["preservation-hall"],
    audioPreset: "traditional"
  },
  {
    id: "chicago",
    name: "Chicago",
    chineseName: "芝加哥",
    country: "USA",
    latitude: 41.8781,
    longitude: -87.6298,
    x: 24.2,
    y: 38.5,
    period: "1910s - 1930s",
    importance: "The Great Migration & Classic Jazz (大迁徙与早期经典灌录)",
    description: "随着一战爆发以及新奥尔良红灯区Storyville的关闭，大批黑人音乐家沿着密西西比河北上大迁徙。芝加哥南区的夜总会见证了路易斯·阿姆斯特朗在此录制了奠定爵士即兴基础的《Hot Five》和《Hot Seven》经典黑胶。",
    keyFigures: ["louis-armstrong", "king-oliver", "jelly-roll-morton", "bix-beiderbecke"],
    keyGenres: ["dixieland", "swing"],
    clubs: ["green-mill"],
    audioPreset: "classic-swing"
  },
  {
    id: "new-york",
    name: "New York",
    chineseName: "纽约",
    country: "USA",
    latitude: 40.7128,
    longitude: -74.006,
    x: 27.5,
    y: 39.0,
    period: "1920s - Present",
    importance: "Jazz Capital of the World (世界的爵士之都)",
    description: "从哈林文艺复兴、摇摆乐大乐团，到52街的波普（Bebop）革命，再到格林威治村的现代先锋派，纽约是无可争议的爵士圣地。几乎所有划时代的音乐大师都在这里留下了改变音乐史的足迹。",
    keyFigures: ["miles-davis", "john-coltrane", "charlie-parker", "duke-ellington", "bill-evans", "thelonious-monk", "ella-fitzgerald"],
    keyGenres: ["swing", "bebop", "cool-jazz", "modal-jazz", "free-jazz", "fusion"],
    clubs: ["village-vanguard", "birdland", "blue-note"],
    audioPreset: "modal-blue"
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    chineseName: "堪萨斯城",
    country: "USA",
    latitude: 39.0997,
    longitude: -94.5786,
    x: 22.0,
    y: 41.0,
    period: "1920s - 1930s",
    importance: "Rhythm and Swing Jam Sessions (布鲁斯摇摆与即兴竞技场)",
    description: "在禁酒令时期，由于当地政客的庇护，堪萨斯城夜生活极度繁荣。这里的爵士乐以深厚的蓝调根基、强大的切分音和史诗般的深夜“即兴对抗赛（Jam Sessions）”闻名，孕育了摇摆乐大师贝西伯爵和查利·帕克。",
    keyFigures: ["count-basie", "charlie-parker", "coleman-hawkins"],
    keyGenres: ["swing", "bebop"],
    clubs: ["mutual-musicians"],
    audioPreset: "classic-swing"
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    chineseName: "洛杉矶",
    country: "USA",
    latitude: 34.0522,
    longitude: -118.2437,
    x: 14.5,
    y: 44.5,
    period: "1940s - 1960s",
    importance: "West Coast Cool Jazz (西海岸冷爵士摇篮)",
    description: "阳光、海滩与好莱坞录音室共同孕育了更轻柔、更具学术色彩、注重编曲织体的“西海岸冷爵士乐”（West Coast Jazz）。它与纽约激烈的波普乐形成鲜明对比，展现了宁静与知性的色彩。",
    keyFigures: ["chet-baker", "dave-brubeck", "gerry-mulligan"],
    keyGenres: ["cool-jazz"],
    clubs: ["lighthouse-cafe"],
    audioPreset: "west-coast"
  },
  {
    id: "paris",
    name: "Paris",
    chineseName: "巴黎",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522,
    x: 48.5,
    y: 31.0,
    period: "1920s - 1960s",
    importance: "European Sanctuary & Gypsy Swing (欧洲爵士避风港与吉普赛摇摆)",
    description: "一战后，大批非裔美籍音乐家发现巴黎没有严重的种族隔离，因此将此视为艺术避难所。在这里，Django Reinhardt创造了融合罗姆音乐与摇摆乐的吉普赛爵士乐（Gypsy Jazz），使巴黎成为欧洲爵士运动的引擎。",
    keyFigures: ["django-reinhardt", "miles-davis", "sidney-bechet"],
    keyGenres: ["swing", "cool-jazz"],
    clubs: ["caveau-de-la-huchette"],
    audioPreset: "gypsy-waltz"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    chineseName: "东京",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    x: 87.0,
    y: 42.0,
    period: "1950s - Present",
    importance: "Jazz Kissa Culture & Hard Bop Passion (独特的爵士吃茶与硬波普热忱)",
    description: "东京拥有全球最狂热的爵士黑胶唱片收藏群体，并诞生了独特的“爵士咖啡馆（Jazz Kissa）”文化。战后日本音乐家极为尊崇并内化了硬波普（Hard Bop），并将其发展成极其精致、充满极简美学和张力的本土爵士乐流派。",
    keyFigures: ["toshiko-akiyoshi", "ryo-fukui", "miles-davis"],
    keyGenres: ["bebop", "modal-jazz"],
    clubs: ["pit-inn"],
    audioPreset: "tokyo-bop"
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    chineseName: "里约热内卢",
    country: "Brazil",
    latitude: -22.9068,
    longitude: -43.1729,
    x: 37.0,
    y: 78.0,
    period: "1950s - 1960s",
    importance: "The Birth of Bossa Nova (波萨诺瓦的优雅狂欢)",
    description: "在伊帕内玛海滩的沙龙里，巴西传统桑巴节奏的狂烈被抽离，融入了冷爵士乐优雅而复杂的和声体系，诞生了Bossa Nova。1962年卡内基音乐厅的演出后，这一流派瞬间席卷全球爵士界。",
    keyFigures: ["antonio-carlos-jobim", "joao-gilberto", "stan-getz"],
    keyGenres: ["bossa-nova"],
    clubs: ["beco-das-garrafas"],
    audioPreset: "bossa-breeze"
  },
  {
    id: "havana",
    name: "Havana",
    chineseName: "哈瓦那",
    country: "Cuba",
    latitude: 23.1136,
    longitude: -82.3666,
    x: 23.5,
    y: 54.5,
    period: "1940s - Present",
    importance: "Afro-Cuban Rhythm Clashes (非裔古巴爵士的热烈碰撞)",
    description: "古巴传统的曼波（Mambo）、颂（Son）节奏与纽约的波普和声进行跨洋交配，创造了极其欢快、节奏万花筒一般的拉丁非裔古巴爵士乐（Afro-Cuban Jazz）。音乐家Mario Bauzá与Chano Pozo极大地改写了波普音乐的面貌。",
    keyFigures: ["chucho-valdes", "dizzy-gillespie", "tito-puente"],
    keyGenres: ["bebop", "fusion"],
    clubs: ["tropicana"],
    audioPreset: "cuban-fire"
  },
  {
    id: "london",
    name: "London",
    chineseName: "伦敦",
    country: "UK",
    latitude: 51.5074,
    longitude: -0.1278,
    x: 46.5,
    y: 28.5,
    period: "1950s - Present",
    importance: "Modern Club Scene & Afro-Jazz revival (欧洲俱乐部中枢与现代非洲爵士融合)",
    description: "伦敦是二战后欧洲爵士俱乐部的中心。从Ronnie Scott开创的传奇地下会所，到近年由Shabaka Hutchings领衔的，融合了黑人根源音乐、非洲Afrobeats与电子乐的“新伦敦爵士浪潮”，伦敦一直在不断重新定义爵士的边界。",
    keyFigures: ["tubby-hayes", "courtney-pine", "shabaka-hutchings"],
    keyGenres: ["fusion", "free-jazz"],
    clubs: ["ronnie-scotts"],
    audioPreset: "london-groove"
  }
];

// 2. LEGENDARY MUSICIANS
export const musicians: Musician[] = [
  {
    id: "louis-armstrong",
    name: "Louis Armstrong",
    chineseName: "路易斯·阿姆斯特朗",
    birthYear: 1901,
    deathYear: 1971,
    instrument: "Trumpet / Vocals (小号 / 人声)",
    birthplace: "New Orleans, USA",
    style: "Dixieland / Swing",
    shortBio: "爵士乐的“第一巨人”，绰号Satchmo。他把爵士乐从一种集体即兴的合奏艺术，转变为强调个人灵魂与才华的独奏艺术（Soloist Art）。他沙哑温暖的拟声演唱（Scat Singing）和直击心灵的小号高音响彻整个20世纪。",
    keyAlbums: [
      { title: "Hot Fives and Sevens", year: 1928, description: "爵士即兴史上的圣经，奠定了爵士即兴小号的黄金标准。" },
      { title: "What a Wonderful World", year: 1967, description: "跨越爵士，温暖全世界的一首不朽和平赞歌。" }
    ],
    influencedBy: ["king-oliver"],
    collaborators: ["ella-fitzgerald", "duke-ellington"]
  },
  {
    id: "miles-davis",
    name: "Miles Davis",
    chineseName: "迈尔斯·戴维斯",
    birthYear: 1926,
    deathYear: 1991,
    instrument: "Trumpet / Composer (小号 / 作曲家)",
    birthplace: "Alton, Illinois, USA",
    style: "Bebop / Cool Jazz / Modal Jazz / Fusion",
    shortBio: "绰号“黑暗王子”，他是爵士史上的终极革新者。从40年代初露头角的波普，到开创冷爵士（Birth of the Cool）、调式爵士（Kind of Blue）、再到70年代插电融合爵士（Bitches Brew），几乎每次爵士乐发生重大嬗变，都是他在前方领跑。",
    keyAlbums: [
      { title: "Kind of Blue", year: 1959, description: "史上最畅销、最伟大的爵士专辑，调式爵士（Modal Jazz）的静谧巅峰。" },
      { title: "Bitches Brew", year: 1970, description: "插电摇滚、朋克与爵士即兴的迷幻熔炉，开启了融合爵士（Fusion）时代。" }
    ],
    influencedBy: ["charlie-parker", "dizzy-gillespie"],
    collaborators: ["john-coltrane", "bill-evans", "thelonious-monk"]
  },
  {
    id: "john-coltrane",
    name: "John Coltrane",
    chineseName: "约翰·柯川",
    birthYear: 1926,
    deathYear: 1967,
    instrument: "Tenor & Soprano Saxophone (次中音 / 高音萨克斯)",
    birthplace: "Hamlet, North Carolina, USA",
    style: "Modal Jazz / Hard Bop / Free Jazz",
    shortBio: "爵士乐中的“求道者”与“萨克斯之神”。他以火山爆发般致密的“声音之床（Sheets of Sound）”和深邃的神秘宗教宿命感探索即兴的极限。他生命最后十年的探索几乎吞噬了和声壁垒，直接登入了自由爵士的无垠宇宙。",
    keyAlbums: [
      { title: "A Love Supreme", year: 1965, description: "四个乐章的爵士史诗，将音乐上升为对神圣宇宙和灵魂救赎的祷告。" },
      { title: "Giant Steps", year: 1960, description: "萨克斯手公认的最复杂“和声通关魔考”，展示了极致的和声穿梭技术。" }
    ],
    influencedBy: ["charlie-parker", "miles-davis"],
    collaborators: ["miles-davis", "thelonious-monk"]
  },
  {
    id: "charlie-parker",
    name: "Charlie Parker",
    chineseName: "查利·帕克",
    birthYear: 1920,
    deathYear: 1955,
    instrument: "Alto Saxophone (中音萨克斯)",
    birthplace: "Kansas City, Kansas, USA",
    style: "Bebop",
    shortBio: "绰号“大鸟（Bird）”，现代爵士乐的奠基人。在20世纪40年代，由于厌倦了摇摆乐大乐团单调、沦为舞厅伴奏的模式，帕克在哈林俱乐部中通过极快、极其复杂的半音阶和即兴和弦重构，与迪齐·吉莱斯皮一同创造了波普（Bebop），彻底将爵士乐升华为一门严肃的现代艺术。",
    keyAlbums: [
      { title: "Bird and Diz", year: 1950, description: "与终身挚友Dizzy Gillespie、Thelonious Monk强强联手的波普丰碑。" },
      { title: "Charlie Parker with Strings", year: 1950, description: "将极速波普即兴完美融入欧洲古典弦乐编制，展示了极佳的和声优雅度。" }
    ],
    influencedBy: ["coleman-hawkins"],
    collaborators: ["dizzy-gillespie", "miles-davis", "thelonious-monk"]
  },
  {
    id: "duke-ellington",
    name: "Duke Ellington",
    chineseName: "艾灵顿公爵",
    birthYear: 1899,
    deathYear: 1974,
    instrument: "Piano / Bandleader / Composer (钢琴 / 乐团领班 / 作曲家)",
    birthplace: "Washington, D.C., USA",
    style: "Swing / Big Band",
    shortBio: "美国历史上最伟大的黑人作曲家、管弦乐色彩大师。他将整个乐团（Big Band）当作他个人的乐器。在他的手下，爵士大乐团不再是粗糙的娱乐，而是拥有交响乐般繁复织体、充满浪漫色彩与戏剧张力的皇皇巨著。",
    keyAlbums: [
      { title: "Ellington at Newport", year: 1956, description: "现场演奏版本，凭借一首极其狂热的萨克斯狂飙Solo挽救并重登乐坛巅峰。" },
      { title: "Far East Suite", year: 1967, description: "将旅行中的东方色彩、印度风情巧妙转化为大乐团爵士乐管弦色彩的传世之作。" }
    ],
    influencedBy: [],
    collaborators: ["louis-armstrong", "count-basie", "ella-fitzgerald"]
  },
  {
    id: "bill-evans",
    name: "Bill Evans",
    chineseName: "比尔·艾文斯",
    birthYear: 1929,
    deathYear: 1980,
    instrument: "Piano (钢琴)",
    birthplace: "Plainfield, New Jersey, USA",
    style: "Cool Jazz / Modal Jazz / Post-Bop",
    shortBio: "爵士钢琴界的“诗人”。他引路了德彪西、拉威尔式的欧洲古典印象派和声进入爵士即兴，他的触键极其细腻优雅，宛如晨雾中的微光。他创造的钢琴三重奏（三重奏内部人人平等、流动对话）至今仍是爵士三重奏的最高典范。",
    keyAlbums: [
      { title: "Waltz for Debby", year: 1961, description: "在纽约Village Vanguard俱乐部录制的传奇现场，杯盏碰撞声与微光般琴音交织的永恒录音。" },
      { title: "Sunday at the Village Vanguard", year: 1961, description: "同一天下午场录音，展示了三重奏成员Scott LaFaro（贝斯手）极具革命性的独奏对话。" }
    ],
    influencedBy: [],
    collaborators: ["miles-davis", "stan-getz"]
  },
  {
    id: "thelonious-monk",
    name: "Thelonious Monk",
    chineseName: "塞隆尼斯·蒙克",
    birthYear: 1917,
    deathYear: 1982,
    instrument: "Piano / Composer (钢琴 / 作曲家)",
    birthplace: "Rocky Mount, North Carolina, USA",
    style: "Bebop / Hard Bop",
    shortBio: "爵士乐里最古怪、最具个性的隐士天才。他的演奏充满了刺耳的不协和音、故意留下的“大片沉默”和令人意想不到的沉重切分音。他是除了艾灵顿之外作品被灌录最多的爵士作曲家，每一首都是几何构图般精妙的迷宫。",
    keyAlbums: [
      { title: "Brilliant Corners", year: 1957, description: "由于曲目节奏极度古怪艰难，乐团录制了二十多次，最终合成的不朽硬波普杰作。" },
      { title: "Monk's Dream", year: 1963, description: "蒙克在哥伦比亚唱片旗下最畅销、最展现他经典钢琴触键顿挫美学的唱片。" }
    ],
    influencedBy: [],
    collaborators: ["charlie-parker", "john-coltrane", "miles-davis"]
  },
  {
    id: "ella-fitzgerald",
    name: "Ella Fitzgerald",
    chineseName: "埃拉·费兹杰拉",
    birthYear: 1917,
    deathYear: 1996,
    instrument: "Vocals (女声)",
    birthplace: "Newport News, Virginia, USA",
    style: "Swing / Bebop",
    shortBio: "被称为“爵士乐第一夫人”（First Lady of Song）。她拥有无可匹敌的三八度宽广音域、水晶般纯净的音色以及完美的音准。她对复杂波普旋律的即兴拟声模仿（Scatting）甚至超越了许多器乐乐手，她是极致摇摆的化身。",
    keyAlbums: [
      { title: "Ella and Louis", year: 1956, description: "与小号之神路易斯·阿姆斯特朗的绝世情歌对唱，如同焦糖遇上咖啡，无比醇香。" },
      { title: "Sings the Cole Porter Songbook", year: 1956, description: "完美重塑美国流行歌集（Great American Songbook）的不朽巨制系列起点。" }
    ],
    influencedBy: ["louis-armstrong"],
    collaborators: ["louis-armstrong", "duke-ellington"]
  },
  {
    id: "antonio-carlos-jobim",
    name: "Antonio Carlos Jobim",
    chineseName: "安东尼奥·卡洛斯·乔宾",
    birthYear: 1927,
    deathYear: 1994,
    instrument: "Piano / Guitar / Composer (钢琴 / 吉他 / 作曲家)",
    birthplace: "Rio de Janeiro, Brazil",
    style: "Bossa Nova",
    shortBio: "波萨诺瓦的“贝多芬”和音乐之父。他用无与伦比的才华将伊帕内玛海滩的波光粼粼转化为流淌的和弦。他将巴西传统桑巴的热烈精简为一种慵懒、感性、富含冷爵士深邃和声底色的永恒经典。",
    keyAlbums: [
      { title: "Getz/Gilberto", year: 1964, description: "爵士史上传奇的跨国合作，将《The Girl from Ipanema》带往全世界，夺得葛莱美年度最佳专辑。" },
      { title: "Wave", year: 1967, description: "纯净器乐交织的波萨诺瓦管弦乐画卷，犹如一阵阵温润清爽的南半球海风。" }
    ],
    influencedBy: ["bill-evans"],
    collaborators: ["stan-getz"]
  },
  {
    id: "dave-brubeck",
    name: "Dave Brubeck",
    chineseName: "戴夫·布鲁贝克",
    birthYear: 1920,
    deathYear: 2012,
    instrument: "Piano / Composer (钢琴 / 作曲家)",
    birthplace: "Concord, California, USA",
    style: "Cool Jazz",
    shortBio: "冷爵士巨匠、学院派先锋。他极富开创性地打破了爵士乐传统的4/4拍限制，引入了5/4拍、9/8拍等古怪且深邃的“不对称奇数拍（Odd Meters）”，让冷爵士乐具备了古典赋格曲般的严谨与摇摆灵动。",
    keyAlbums: [
      { title: "Time Out", year: 1959, description: "史上第一张销量破百万的白金爵士专辑，其主打曲《Take Five》(5/4拍) 成为全宇宙最知名的爵士乐动机。" }
    ],
    influencedBy: [],
    collaborators: ["gerry-mulligan"]
  },
  {
    id: "mccoy-tyner",
    name: "McCoy Tyner",
    chineseName: "麦考伊·泰纳",
    birthYear: 1938,
    deathYear: 2020,
    instrument: "Piano (钢琴)",
    birthplace: "Philadelphia, USA",
    style: "Modal Jazz / Post-Bop",
    shortBio: "约翰·柯川“经典四重奏”的钢琴之魂。他以雷霆万钧的强力左手“五度和弦（Quartal Voicings）”和如流水般的右手五声音阶即兴，彻底奠定了调式爵士与后波普时期的钢琴演奏标准，为柯川火山喷发般的即兴提供了坚如磐石的和声托盘。",
    keyAlbums: [
      { title: "The Real McCoy", year: 1967, description: "离开柯川乐团后的首张个人经典神盘，极具力量感的现代后波普里程碑。" },
      { title: "Fly with the Wind", year: 1976, description: "融入弦乐编制的交响调式爵士史诗，大开大合，波澜壮阔。" }
    ],
    influencedBy: ["thelonious-monk", "bud-powell"],
    collaborators: ["john-coltrane", "elvin-jones", "wayne-shorter"]
  },
  {
    id: "elvin-jones",
    name: "Elvin Jones",
    chineseName: "埃尔文·琼斯",
    birthYear: 1927,
    deathYear: 2004,
    instrument: "Drums (鼓手)",
    birthplace: "Pontiac, Michigan, USA",
    style: "Modal Jazz / Post-Bop / Hard Bop",
    shortBio: "爵士鼓史上的超级革命者。他彻底打破了爵士鼓纯作节拍器的传统，创造了石破天惊的“多节奏复律动（Polyrhythms）”。在柯川黄金四重奏中，他用狂暴而又无比细腻的多重节拍对位，与柯川的萨克斯形成了如同风暴与雷电交织的史诗对话。",
    keyAlbums: [
      { title: "Puttin' It Together", year: 1968, description: "展示无钢琴编制下，纯粹打击律动与萨克斯对峙的张力杰作。" }
    ],
    influencedBy: ["art-blakey", "max-roach"],
    collaborators: ["john-coltrane", "mccoy-tyner", "wayne-shorter"]
  },
  {
    id: "pharoah-sanders",
    name: "Pharoah Sanders",
    chineseName: "法老·桑德斯",
    birthYear: 1940,
    deathYear: 2022,
    instrument: "Tenor Saxophone (次中音萨克斯)",
    birthplace: "Little Rock, Arkansas, USA",
    style: "Spiritual Jazz / Free Jazz",
    shortBio: "精神爵士（Spiritual Jazz）的终极使者。在柯川生命最后一期与他并肩咆哮。他的萨克斯吹奏融合了嘶吼、多音和极限高音过载，将乐器化作宗教救赎的喇叭。他的代表作《The Creator Has a Master Plan》是长达三十分钟的狂野而极乐的宇宙旅行。",
    keyAlbums: [
      { title: "Karma", year: 1969, description: "精神爵士史上的终极至宝，在狂暴喧嚣的自由咆哮中流淌出对宇宙大爱的极乐吟唱。" },
      { title: "Promises", year: 2021, description: "晚年与伦敦电子音乐人Floating Points及伦敦交响乐团的跨界神作，极具极简主义冥想之美。" }
    ],
    influencedBy: ["john-coltrane"],
    collaborators: ["john-coltrane", "alice-coltrane"]
  },
  {
    id: "wayne-shorter",
    name: "Wayne Shorter",
    chineseName: "韦恩·肖特",
    birthYear: 1933,
    deathYear: 2023,
    instrument: "Tenor & Soprano Saxophone (次中音/高音萨克斯)",
    birthplace: "Newark, New Jersey, USA",
    style: "Modal Jazz / Post-Bop / Fusion",
    shortBio: "爵士作曲“第一智者”，迈尔斯·戴维斯“第二伟大五重奏”的创作大脑。他的曲子充满迷宫般的和声走势与神秘幽邃的哲学意境。从Art Blakey的硬波普，到戴维斯五重奏的调式写意，再到Weather Report的电气融合爵士，他是长盛不衰的现代探索者。",
    keyAlbums: [
      { title: "Speak No Evil", year: 1966, description: "后波普时代的传世至宝，神秘、优雅、极具和声内省的写意巅峰。" },
      { title: "Heavy Weather", year: 1977, description: "Weather Report乐团的白金唱片，创造了极具律动与先锋质感的电气融合爵士里程碑。" }
    ],
    influencedBy: ["john-coltrane", "lester-young"],
    collaborators: ["miles-davis", "herbie-hancock", "art-blakey"]
  },
  {
    id: "sonny-rollins",
    name: "Sonny Rollins",
    chineseName: "索尼·罗林斯",
    birthYear: 1930,
    deathYear: 2020, // (Simplified as historic representation)
    instrument: "Tenor Saxophone (次中音萨克斯)",
    birthplace: "New York, USA",
    style: "Hard Bop / Bebop",
    shortBio: "硕果仅存的“萨克斯泰斗”与“即兴巨无霸”。他以无比浑厚、充满钢铁质感的音色，以及无穷无尽的“主题即兴变奏（Thematic Improvisation）”能力大放异彩。在1959-1961年间，他在事业巅峰期选择退隐，通宵在威廉斯堡大桥上对着狂风练琴，传为历史佳话。",
    keyAlbums: [
      { title: "Saxophone Colossus", year: 1956, description: "爵士萨克斯历史上无可置疑的扛鼎之作，将加勒比切分韵律与硬波普即兴完美融合。" },
      { title: "The Bridge", year: 1962, description: "下桥复出后的旷世神盘，抛弃了钢琴编制，展现了极致松弛、如钢铁般坚韧的萨克斯线条。" }
    ],
    influencedBy: ["coleman-hawkins", "charlie-parker"],
    collaborators: ["miles-davis", "thelonious-monk"]
  },
  {
    id: "coleman-hawkins",
    name: "Coleman Hawkins",
    chineseName: "科尔曼·霍金斯",
    birthYear: 1904,
    deathYear: 1969,
    instrument: "Tenor Saxophone (次中音萨克斯)",
    birthplace: "Saint Joseph, Missouri, USA",
    style: "Swing",
    shortBio: "绰号“鹰（Hawk）”，萨克斯之父。是他将萨克斯从一件滑稽的马戏团滑音玩具，改造为爵士乐中最为威严、深沉、具备交响大提琴般宽广音色的第一独奏乐器。1939年他灌录的《Body and Soul》彻底改写了爵士乐即兴的和弦编织逻辑。",
    keyAlbums: [
      { title: "Body and Soul", year: 1939, description: "萨克斯即兴史上的绝对分水岭，用惊世骇俗的琶音上行替代了单纯旋律装饰。" }
    ],
    influencedBy: [],
    collaborators: ["duke-ellington", "charlie-parker", "ben-webster"]
  },
  {
    id: "lester-young",
    name: "Lester Young",
    chineseName: "莱斯特·杨",
    birthYear: 1909,
    deathYear: 1959,
    instrument: "Tenor Saxophone (次中音萨克斯)",
    birthplace: "Woodville, Mississippi, USA",
    style: "Swing / Cool Jazz",
    shortBio: "绰号“总统（Prez）”。在霍金斯统治的“威猛、厚重”萨克斯美学之外，杨创造了一种完全相反的、轻盈、舒缓、略带感伤且极度松弛的线性美学。他与歌手Billie Holiday高山流水的深厚情谊与默契合作，是爵士史上的最温柔的诗篇。他直接孕育了冷爵士美学。",
    keyAlbums: [
      { title: "Lester Leaps In", year: 1939, description: "与贝西伯爵大乐团强强联合，展现极快速度下无比松弛飘逸的节奏游戏。" }
    ],
    influencedBy: [],
    collaborators: ["count-basie", "billie-holiday"]
  },
  {
    id: "kamasi-washington",
    name: "Kamasi Washington",
    chineseName: "卡马西·华盛顿",
    birthYear: 1981,
    deathYear: 2026, // Treated as modern alive
    instrument: "Tenor Saxophone (次中音萨克斯)",
    birthplace: "Los Angeles, USA",
    style: "Spiritual Jazz / Fusion / Contemporary",
    shortBio: "21世纪新伦敦/西海岸爵士复兴运动的核心旗手。他将约翰·柯川的精神爵士、大乐团管弦、嘻哈（Hip-Hop）、福音音乐（Gospel）与电子电气深度糅合，打造出如同史诗歌剧一般、宏大而极富仪式感的现代爵士画卷，将爵士乐重新带回年轻世代的视野。",
    keyAlbums: [
      { title: "The Epic", year: 2015, description: "长达三小时的巨幅爵士画卷，席卷全球先锋乐评，宣布新世纪宇宙爵士复兴的到来。" }
    ],
    influencedBy: ["john-coltrane", "pharoah-sanders"],
    collaborators: ["miles-davis"] // Dynamic link
  },
  {
    id: "ravi-coltrane",
    name: "Ravi Coltrane",
    chineseName: "拉维·柯川",
    birthYear: 1965,
    deathYear: 2026,
    instrument: "Tenor & Soprano Saxophone (次中音/高音萨克斯)",
    birthplace: "Long Island, New York, USA",
    style: "Post-Bop / Contemporary",
    shortBio: "约翰·柯川与爱丽丝·柯川的次子。他背负着爵士史上最沉重的姓氏，却以极其谦逊、知性、内敛深邃的学院派萨克斯线条走出了一条属于自己的现代爵士道路，深受同行与后辈乐手的敬重。",
    keyAlbums: [
      { title: "Spirit Fiction", year: 2012, description: "在Blue Note旗下录制，展现深厚的调式写意底蕴和高度克制的智性即兴。" }
    ],
    influencedBy: ["john-coltrane", "wayne-shorter"],
    collaborators: ["john-coltrane", "mccoy-tyner"]
  },
  {
    id: "booker-little",
    name: "Booker Little",
    chineseName: "布克·利特尔",
    birthYear: 1938,
    deathYear: 1961,
    instrument: "Trumpet (小号)",
    birthplace: "Memphis, Tennessee, USA",
    style: "Hard Bop / Post-Bop",
    shortBio: "爵士乐史最令人扼腕叹息的“早逝彗星”与隐藏巨匠。他23岁时因尿毒症不治克服病魔，但在极短的生命中，他创造出了一种极具悲剧内省色彩、极富半音阶张力与宏大忧郁叙事感的小号演奏技术，在当时被公认为唯一能与Miles Davis并立、甚至在和声先锋度上更胜一筹的小号天才。",
    keyAlbums: [
      { title: "Booker Little 4 and Max Roach", year: 1958, description: "二十岁时的惊艳初登场，高亢明亮而富有刀锋般锐利张力的小号名盘。" },
      { title: "Out Front", year: 1961, description: "生命最后的传世孤品，展现了远超时代的先锋铜管不协和和声编排。" }
    ],
    influencedBy: ["miles-davis"],
    collaborators: ["miles-davis", "thelonious-monk"],
    isHiddenGem: true
  },
  {
    id: "sam-rivers",
    name: "Sam Rivers",
    chineseName: "萨姆·里弗斯",
    birthYear: 1923,
    deathYear: 2011,
    instrument: "Soprano & Tenor Saxophone (萨克斯 / 长笛)",
    birthplace: "El Reno, Oklahoma, USA",
    style: "Free Jazz / Avant-Garde",
    shortBio: "现代前卫先锋爵士与自由即兴的“教父”和隐藏瑰宝。他横跨传统硬波普与极端自由爵士，他的演奏如同狂乱的野兽，却又具备极高超的乐理逻辑控制力。在70年代纽约著名的“阁楼爵士运动（Loft Jazz）”中，他出资开办了Studio Rivbea，成为了全球前卫先锋艺术家的乌托邦家园。",
    keyAlbums: [
      { title: "Fuchsia Swing Song", year: 1964, description: "Blue Note旗下录制的前卫狂想碑，在波普和弦的边缘进行自由咆哮切分。" }
    ],
    influencedBy: ["john-coltrane"],
    collaborators: ["miles-davis", "john-coltrane"],
    isHiddenGem: true
  },
  {
    id: "bobby-hutcherson",
    name: "Bobby Hutcherson",
    chineseName: "鲍比·哈切森",
    birthYear: 1941,
    deathYear: 2016,
    instrument: "Vibraphone (颤音琴 / 铁琴)",
    birthplace: "Los Angeles, USA",
    style: "Post-Bop / Avant-Garde",
    shortBio: "爵士铁琴史上最伟大的革新者与隐藏珍宝。是他将颤音琴（Vibraphone）彻底从摇摆乐伴奏乐器，转变为能发出虚无缥缈、如同宇宙微光一般，充满后波普冥想与抽象和声色彩的前卫独奏利器。他的演奏如流星雨般璀璨、神秘而通透。",
    keyAlbums: [
      { title: "Dialogue", year: 1965, description: "Blue Note前卫时代的惊世巨制，营造出神秘、空灵而又极其致密的宇宙音网。" },
      { title: "Components", year: 1966, description: "半边浪漫甜美、半边自由抽象的双面写意神盘。" }
    ],
    influencedBy: ["bill-evans"],
    collaborators: ["mccoy-tyner", "miles-davis"],
    isHiddenGem: true
  },
  {
    id: "andrew-hill",
    name: "Andrew Hill",
    chineseName: "安德鲁·希尔",
    birthYear: 1931,
    deathYear: 2007,
    instrument: "Piano / Composer (钢琴 / 作曲家)",
    birthplace: "Chicago, USA",
    style: "Avant-Garde / Post-Bop",
    shortBio: "Blue Note唱片先锋时期的“幕后哲学家”与极度低调的隐藏宗师。他的钢琴作曲如同重叠的梦境，充满不规则的节奏迟滞、扭曲的调性与极其严谨的对位。他的作品由于结构极其怪异艰难，常人极难复制，是专属于核心乐迷的顶级智力拼图。",
    keyAlbums: [
      { title: "Point of Departure", year: 1964, description: "后波普先锋即兴史上的神作，联手拆解传统节奏结构。" }
    ],
    influencedBy: ["thelonious-monk"],
    collaborators: ["thelonious-monk", "miles-davis"],
    isHiddenGem: true
  },
  {
    id: "mal-waldron",
    name: "Mal Waldron",
    chineseName: "马尔·瓦尔德隆",
    birthYear: 1925,
    deathYear: 2002,
    instrument: "Piano (钢琴)",
    birthplace: "New York, USA",
    style: "Hard Bop / Post-Bop / Avant-Garde",
    shortBio: "低调至深的“极简主义钢琴宗师”。他早年是传奇爵士名伶比莉·哈乐黛（Billie Holiday）的终身御用伴奏，在哈乐黛凄凉晚年用最深切沉稳的琴声护航。他的个人演奏极具辨识度：几乎不弹华丽的琶音，而是执拗地、一遍遍地用左手弹奏沉重、如雕塑般深邃的极简动机，带有浓烈的存在主义悲剧底色。",
    keyAlbums: [
      { title: "The Quest", year: 1961, description: "与Eric Dolphy联手，展现极致阴郁、深邃、宛如哥特式教堂建筑的硬波普先锋碑。" },
      { title: "Free at Last", year: 1969, description: "传奇厂牌ECM的创始首张录音，极简、静谧、充满张力大面积沉默的终极钢琴神盘。" }
    ],
    influencedBy: ["thelonious-monk"],
    collaborators: ["ella-fitzgerald", "john-coltrane"],
    isHiddenGem: true
  }
];

// 3. JAZZ CLUBS / BARS
export const clubs: Club[] = [
  {
    id: "village-vanguard",
    name: "Village Vanguard",
    chineseName: "先锋村俱乐部",
    cityId: "new-york",
    openedYear: 1935,
    closedYear: "present",
    address: "178 7th Ave S, New York, NY 10014",
    famousPerformers: ["Bill Evans Trio", "John Coltrane", "Miles Davis", "Sonny Rollins"],
    history: "世界上最著名的爵士圣地，位于格林威治村一处狭窄的地下三角形地下室中。这个特殊的几何构造赋予了该俱乐部无与伦比的现场声学声效。在这里录制并冠以“Live at the Village Vanguard”的现场专辑，几乎统治了现代爵士演进史。"
  },
  {
    id: "birdland",
    name: "Birdland",
    chineseName: "鸟园俱乐部",
    cityId: "new-york",
    openedYear: 1949,
    closedYear: "present",
    address: "315 W 44th St, New York, NY 10036",
    famousPerformers: ["Charlie Parker", "Dizzy Gillespie", "Miles Davis", "Art Blakey"],
    history: "为致敬伟大的中音萨克斯巨匠 Charlie 'Bird' Parker 而命名，被称为“爵士乐的百老汇大本营”。在50年代黄金期，它是52街霓虹闪烁的夜晚里最璀璨的明珠，无数波普神话在此通宵上演。"
  },
  {
    id: "blue-note",
    name: "Blue Note New York",
    chineseName: "蓝调之音",
    cityId: "new-york",
    openedYear: 1981,
    closedYear: "present",
    address: "131 W 3rd St, New York, NY 10012",
    famousPerformers: ["Sarah Vaughan", "Oscar Peterson", "Dizzy Gillespie", "Herbie Hancock"],
    history: "80年代爵士重回主流视线的功臣，是当代全球知名度最高、最具殿堂级分量的爵士俱乐部连锁鼻祖。其以极致亲近的主舞台、顶级的蓝色聚光灯和极具奢华、纯正的现场原声表演而享誉世界。"
  },
  {
    id: "preservation-hall",
    name: "Preservation Hall",
    chineseName: "保护堂",
    cityId: "new-orleans",
    openedYear: 1961,
    closedYear: "present",
    address: "726 St Peter, New Orleans, LA 70116",
    famousPerformers: ["Sweet Emma Barrett", "Preservation Hall Jazz Band"],
    history: "位于新奥尔良法国区核心的一栋有着数百年历史的老砖房内。它没有空调，没有高级音响，至今坚持用最古老、最原始的不插电（Acoustic）传统管乐编制，坚守并传承着20世纪初新奥尔良爵士乐（Dixieland）的根源血脉。"
  },
  {
    id: "ronnie-scotts",
    name: "Ronnie Scott's Jazz Club",
    chineseName: "罗尼·斯科特俱乐部",
    cityId: "london",
    openedYear: 1959,
    closedYear: "present",
    address: "47 Frith St, London W1D 4SG",
    famousPerformers: ["Miles Davis", "Ella Fitzgerald", "Sarah Vaughan", "Wes Montgomery"],
    history: "由英国萨克斯演奏家 Ronnie Scott 创办，是伦敦苏豪区（Soho）不折不扣的夜生活心脏。在严苛禁止美国音乐家在英国演出的特殊管制时期，罗尼通过各种奔走突破壁垒，引路了全美最顶尖的黑人爵士大师来到伦敦献艺。"
  },
  {
    id: "pit-inn",
    name: "Shinjuku Pit Inn",
    chineseName: "新宿 Pit Inn",
    cityId: "tokyo",
    openedYear: 1965,
    closedYear: "present",
    address: "2-12-4 Shinjuku, Tokyo, Japan",
    famousPerformers: ["Sadao Watanabe", "Toshiko Akiyoshi", "Yosuke Yamashita"],
    history: "位于繁华喧嚣的新宿。半个多世纪以来，它是日本现代爵士和先锋自由即兴无可动摇的摇篮。在狭小局促、烟雾弥漫（早期）的空间中，无数本土萨克斯和钢琴家拼尽全力撕扯琴键，将硬波普的热火在东方彻底点燃。"
  }
];

// 4. JAZZ GENRES
export const genres: Genre[] = [
  {
    id: "ragtime",
    name: "Ragtime",
    chineseName: "拉格泰姆",
    period: "1890s - 1910s",
    description: "具有繁复、不规则切分音节奏（Ragged Time）的早期钢琴音乐。它虽然采用古典乐的严谨回旋曲式书写，但右手灵跃错位的切分重音与左手稳健的双拍大跳，彻底点燃了美国平原的律动野火，被公认为爵士乐的前身。",
    color: "#E29578",
    keyArtists: ["jelly-roll-morton"]
  },
  {
    id: "dixieland",
    name: "Dixieland / New Orleans Jazz",
    chineseName: "迪克西兰 / 新奥尔良传统爵士",
    period: "1900s - 1920s",
    description: "爵士乐的最初形态。其核心在于“集体即兴（Collective Improvisation）”：短号或小号吹奏主旋律，单簧管在上空吹出优雅华丽的复调装饰线，长号在底部以滑音和低音支撑，营造出游行狂欢般、充满市井烟火气的欢快合奏。",
    color: "#DDA15E",
    keyArtists: ["louis-armstrong", "king-oliver"]
  },
  {
    id: "swing",
    name: "Swing / Big Band",
    chineseName: "摇摆乐 / 大乐团",
    period: "1920s - 1940s",
    description: "爵士乐历史上商业上最繁荣、全民起舞的黄金时代。十多位管乐手组成的铜管和木管声部大乐团，在坚实跳动的4/4拍摇摆律动（Swing Feel）中交替发出咆哮和浪漫赞歌，也是大萧条时期美国人心灵的避难所。",
    color: "#C9A227",
    keyArtists: ["duke-ellington", "louis-armstrong", "ella-fitzgerald"]
  },
  {
    id: "bebop",
    name: "Bebop",
    chineseName: "波普 / 咆哮乐",
    period: "1940s - 1950s",
    description: "现代爵士乐的破晓。由小编制乐团（Combos）主导，其特征是极快的速度、让人眼花缭乱的半音阶即兴、怪异的重音和极度复杂的和弦替代。波普乐将爵士乐从大众起舞的伴奏音乐，彻底改造为需要屏息聆听、极具智性高度的纯艺术独奏。",
    color: "#E63946",
    keyArtists: ["charlie-parker", "miles-davis", "thelonious-monk"]
  },
  {
    id: "cool-jazz",
    name: "Cool Jazz",
    chineseName: "冷爵士 / 酷派爵士",
    period: "1940s - 1950s",
    description: "针对狂热、极速、充满张力的波普乐的一种美学反叛。它抛弃了侵略性的高音，转而追求中低音区慵懒、克制、富有学术室内乐色彩和优雅编曲织体的冷调美学。音乐如冰镇马提尼一般，散发着知性、冷静与淡淡的忧郁。",
    color: "#457B9D",
    keyArtists: ["miles-davis", "dave-brubeck", "bill-evans"]
  },
  {
    id: "modal-jazz",
    name: "Modal Jazz",
    chineseName: "调式爵士",
    period: "1950s - 1960s",
    description: "爵士和声史上的极简主义革命。它用古老希腊或教会“调式（Modes）”（一个调式可能维持几十个小节）替代了频繁跳跃的多重和弦变化。即兴乐手彻底摆脱了复杂的和弦套路，能够专注于单一调式内，写意式地描摹音符间的水平情绪与旋律的极境自由。",
    color: "#1D3557",
    keyArtists: ["miles-davis", "john-coltrane", "bill-evans"]
  },
  {
    id: "bossa-nova",
    name: "Bossa Nova",
    chineseName: "波萨诺瓦",
    period: "1950s - 1970s",
    description: "在葡萄牙语中意为“新浪潮”。它将巴西桑巴舞蹈中狂热的金属打击节奏精简到古典吉他的尼龙弦轻扫上，融入冷爵士乐优雅而略带感伤的半音阶和声。其歌唱宛如在耳畔呢喃，是阳光、海浪、优雅慵懒的化身。",
    color: "#2A9D8F",
    keyArtists: ["antonio-carlos-jobim"]
  },
  {
    id: "free-jazz",
    name: "Free Jazz",
    chineseName: "自由爵士",
    period: "1960s - 1970s",
    description: "无神、无规、彻底的即兴乌托邦。它彻底砸碎了传统的固定和弦进行、小节线约束和调性壁垒，让乐手根据当下的动物本能和绝对情感进行狂野咆哮、无调性碰撞。它与当时的黑人民权运动和反战先锋艺术思潮深度呼应。",
    color: "#8B4513",
    keyArtists: ["john-coltrane"]
  },
  {
    id: "fusion",
    name: "Fusion",
    chineseName: "融合爵士",
    period: "1960s - Present",
    description: "爵士插电化与跨界融合。将爵士乐无与伦比的高超即兴本领，与迷幻摇滚、重金属吉他失真、迷幻放克（Funk）律动、甚至世界音乐相杂交。运用合成器、电贝司和电吉他，创造出电气化十足、宏大而极富现代韵律的声音织体。",
    color: "#9D4EDD",
    keyArtists: ["miles-davis"]
  }
];

// 5. GEOGRAPHIC JAZZ MIGRATION AND FLOWS
export const migrationFlows: MigrationFlow[] = [
  {
    id: "flow-nola-to-chicago",
    fromCityId: "new-orleans",
    toCityId: "chicago",
    era: "1910s - 1920s",
    label: "Great Migration (爵士大迁徙)",
    description: "一战期间爆发的非裔美国人大迁徙。新奥尔良红灯区Storyville遭强制取缔关闭，无数音乐家（包括阿姆斯特朗、King Oliver）沿着密西西比河北上，涌向工业重镇芝加哥，使芝加哥成为早期经典爵士录音的中心。",
    coordinates: [
      { x: 23.5, y: 48.0 },
      { x: 23.8, y: 43.0 },
      { x: 24.2, y: 38.5 }
    ]
  },
  {
    id: "flow-chicago-to-ny",
    fromCityId: "chicago",
    toCityId: "new-york",
    era: "1920s",
    label: "Big Band & Harlem Era (大乐团与哈林崛起)",
    description: "随着纽约哈林文艺复兴的蓬勃爆发，以及唱片工业和百老汇大本营的确立，路易斯·阿姆斯特朗应Fletcher Henderson乐团之邀前往纽约发展。艾灵顿公爵等大乐团领班入驻传奇棉花俱乐部（Cotton Club），爵士重心转移至纽约。",
    coordinates: [
      { x: 24.2, y: 38.5 },
      { x: 25.8, y: 38.0 },
      { x: 27.5, y: 39.0 }
    ]
  },
  {
    id: "flow-havana-to-ny",
    fromCityId: "havana",
    toCityId: "new-york",
    era: "1940s",
    label: "Afro-Cuban Birth (拉丁非裔古巴碰撞)",
    description: "古巴多乐器大师 Mario Bauzá 和传奇打击乐手 Chano Pozo 乘船北上纽约，在 Dizzy Gillespie 乐团中充当催化剂。古巴繁复的三连音切分节奏与纽约高速咆哮的波普和声进行大碰撞，诞生了非裔古巴爵士乐。",
    coordinates: [
      { x: 23.5, y: 54.5 },
      { x: 25.5, y: 47.0 },
      { x: 27.5, y: 39.0 }
    ]
  },
  {
    id: "flow-ny-to-paris",
    fromCityId: "new-york",
    toCityId: "paris",
    era: "1920s - 1950s",
    label: "Post-War Paris Sanctuary (战后巴黎避风港)",
    description: "一战及二战后，许多深受美国严重种族隔离之苦的非裔美籍大师（如Sidney Bechet、Miles Davis）来到自由包容的法国巴黎演出。他们在巴黎左岸的夜总会找到了前所未有的尊重和艺术自由，深切地滋养了欧洲本土爵士乐。",
    coordinates: [
      { x: 27.5, y: 39.0 },
      { x: 38.0, y: 33.0 },
      { x: 48.5, y: 31.0 }
    ]
  },
  {
    id: "flow-rio-to-ny",
    fromCityId: "rio-de-janeiro",
    toCityId: "new-york",
    era: "1960s",
    label: "Bossa Nova Invasions (波萨诺瓦席卷北美)",
    description: "1962年卡内基音乐厅举办了具有分水岭意义的巴西爵士音乐会，Jobim 和 Gilberto 等人与美国萨克斯大师 Stan Getz 的历史性录音取得世界性成功，优雅闲适的南半球热带海风，永远融入了美国现代爵士的主干。",
    coordinates: [
      { x: 37.0, y: 78.0 },
      { x: 32.0, y: 58.0 },
      { x: 27.5, y: 39.0 }
    ]
  },
  {
    id: "flow-ny-to-tokyo",
    fromCityId: "new-york",
    toCityId: "tokyo",
    era: "1950s - 1960s",
    label: "Hard Bop Eastbound (硬波普与爵士吃茶点燃东京)",
    description: "朝鲜战争爆发及战后，大量美军俱乐部的建立使日本乐手有了直接面对高水平爵士演出的机会。Miles Davis等人的访日巡演瞬间席卷东京。在新宿、涩谷兴起的爵士吃茶（Jazz Kissa）中，无数日本人通宵沉浸在黑胶唱片中，硬波普的热火在东京狂热蔓延。",
    coordinates: [
      { x: 27.5, y: 39.0 },
      { x: 57.0, y: 15.0 },
      { x: 87.0, y: 42.0 }
    ]
  }
];

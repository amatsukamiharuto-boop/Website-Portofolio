
export const asset = p => {
  if (!p) return '';
  const s = /^(https?:)?\/\//.test(p) || p.startsWith('/') ? p : '/' + p;
  return encodeURI(s);
};

export const CONFIG = {
  studio: 'Hitotobi Games',
  founder: 'Mohammad Aqso Ar Rozzaq',
  role: 'Game · Asset · App Developer',
  handle: 'hitotobigames',
  photo: 'assets/profile.jpg',
  logo: 'assets/Hitotobi_Games_logo.png',
  about: 'Saya Founder, dan Developer dari {studio}, saya adalah seorang Games Developer, Asset Developer dan APP Developer.',
  whatsapp: '6287825097850',
  waMessage: 'Halo, saya ingin diskusi tentang proyek.',
  email: 'halo@namastudio.com',
  nowWorking: {
    title: 'Three Word Left Unsaid',
    desc: 'Adalah Game RPG Fantasi Romantis yang bercerita tentang seorang Karakter bernama Haru yang ingin mengutarakan cintanya pada seorang gadis pujaanya namun di balik itu semua akan ada banyak cobaan dalam kisah ini, akankah Tokoh utama Haru bisa menguatarakan perasaanya?.',
    progress: 40,
    tags: ['RPG Maker MZ']
  },
  
  socials: [
    { slug: 'itchdotio', label: 'Itch.io', url: 'https://hitotobi-games.itch.io/' },
    { slug: 'github',    label: 'GitHub',  url: 'https://github.com/' },
    { slug: 'discord',   label: 'Discord', url: 'https://discord.com/' },
    { slug: 'youtube',   label: 'YouTube', url: 'https://youtube.com/@hitotobigames?si=lMAkcXm9KwBhXyWi' }
  ]
};


export const STACK1 = [
  ['img', 'assets/RPG Maker.jpg', 'RPG Maker MZ'],
  ['javascript', 'javascript-original', 'JavaScript']
];

export const STACK2 = [
  ['flutter', 'flutter-original', 'Flutter'],
  ['dart', 'dart-original', 'Dart'],
  ['kotlin', 'kotlin-original', 'Kotlin'],
  ['android', 'android-original', 'Android'],
  ['androidstudio', 'androidstudio-original', 'Android Studio'],
  ['github', 'github-original', 'GitHub', 1]
];


export const PROJECTS = [
  { title:'Project Nebula', cat:'Game Development', img:'https://placehold.co/640x360/2a2545/2ee6c8?text=Nebula',
    desc:'Puzzle-platformer 2D dengan mekanik pembalik gravitasi.',
    long:'Puzzle-platformer 2D di mana pemain membalik arah gravitasi untuk menyelesaikan rintangan. Dibuat dengan Unity dan berjalan mulus di PC kelas menengah maupun Android.',
    video:'https://www.youtube.com/embed/dQw4w9WgXcQ',
    links:[{l:'Mainkan di Itch.io',u:'https://itch.io/',i:'itchdotio'},{l:'Source code',u:'https://github.com/',i:'github'}] },
  { title:'Pixel Tower', cat:'Game Development', img:'https://placehold.co/640x360/2a2545/8b7bff?text=Pixel+Tower',
    desc:'Tower defense pixel art dengan 12 jenis menara.',
    long:'Tower defense pixel art dengan 12 menara, 30 gelombang musuh, dan sistem upgrade bercabang. Berawal dari game jam, lalu dikembangkan menjadi rilis penuh.',
    video:'', links:[{l:'Mainkan di Itch.io',u:'https://itch.io/',i:'itchdotio'}] },
  { title:'AssetPacker', cat:'Tools & Software', img:'https://placehold.co/640x360/2a2545/ffb86b?text=AssetPacker',
    desc:'Tool desktop untuk mengemas sprite menjadi atlas.',
    long:'Aplikasi ringan untuk menggabungkan banyak sprite menjadi satu texture atlas, lengkap dengan ekspor JSON untuk Unity dan Godot.',
    video:'', links:[{l:'GitHub',u:'https://github.com/',i:'github'},{l:'Unduh',u:'https://itch.io/',i:'itchdotio'}] },
  { title:'LevelKit', cat:'Tools & Software', img:'https://placehold.co/640x360/2a2545/93c5fd?text=LevelKit',
    desc:'Editor level berbasis web untuk prototipe cepat.',
    long:'Editor level di browser: letakkan tile, simpan sebagai JSON, lalu muat di game. Cocok untuk prototipe cepat tanpa instalasi.',
    video:'', links:[{l:'Coba demo',u:'https://github.com/'}] },
  { title:'Dungeon Tileset', cat:'Asset Development', img:'https://placehold.co/640x360/2a2545/f472b6?text=Dungeon+Tileset',
    desc:'Paket tileset pixel art bertema dungeon, 16×16.',
    long:'Lebih dari 400 tile dungeon 16×16 lengkap dengan animasi obor, pintu, dan jebakan. Siap pakai di Unity, Godot, maupun engine lain.',
    video:'', links:[{l:'Dapatkan di Itch.io',u:'https://itch.io/',i:'itchdotio'}] },
  { title:'Fantasy UI Kit', cat:'Asset Development', img:'https://placehold.co/640x360/2a2545/5eead4?text=Fantasy+UI',
    desc:'Kumpulan elemen UI bertema fantasi: tombol, panel, ikon.',
    long:'UI kit berisi tombol, panel, bar kesehatan, dan 120 ikon item bergaya fantasi. Disediakan dalam format PNG dan sumber Figma.',
    video:'', links:[{l:'Dapatkan di Itch.io',u:'https://itch.io/',i:'itchdotio'}] }
];


export const asset = p => {
  if (!p) return '';
  const s = /^(https?:)?\/\//.test(p) || p.startsWith('/') ? p : '/' + p;
  return encodeURI(s);
};

// Mengisi {founder}, {studio}, dst. pada teks dua bahasa
export const fmt = (t, vars) => {
  const out = {};
  for (const l of ['id', 'en']) out[l] = Object.entries(vars).reduce((s, [k, v]) => s.split(`{${k}}`).join(v), t[l]);
  return out;
};

export const CONFIG = {
  studio: 'Hitotobi Games',
  founder: 'Mohammad Aqso Ar Rozzaq',
  role: 'Game · Asset · App Developer',          // tulisan di bawah nama pada kartu
  handle: 'hitotobigames',                         // @handle pada kartu
  photo: 'assets/profile.jpg',                     // foto di kartu About
  logo: 'assets/Hitotobi_Games_logo.png',          // logo studio
  whatsapp: '6287825097850',        // format internasional, tanpa + dan tanpa 0 di depan
  waMessage: 'Halo, saya ingin diskusi tentang proyek.',
  email: 'halo@namastudio.com',

  // ---------- ABOUT ME ----------
  about: {
    paragraphs: [
      { id: 'Saya {founder}, Founder sekaligus developer di {studio}. Saya membuat game, aset game, dan aplikasi, dari ide mentah sampai menjadi produk yang bisa dimainkan dan dipakai orang.',
        en: "I'm {founder}, founder and developer at {studio}. I build games, game assets, and apps, taking raw ideas all the way to products people can play and use." },
      { id: 'Game saya dibuat dengan RPG Maker MZ dan JavaScript, sedangkan aplikasi saya dikembangkan dengan Flutter, Dart, dan Kotlin. Saat ini saya sedang menyelesaikan game RPG fantasi romantis "Three Word Left Unsaid".',
        en: 'My games are built with RPG Maker MZ and JavaScript, while my apps are built with Flutter, Dart, and Kotlin. Right now I am finishing a romantic fantasy RPG called "Three Word Left Unsaid".' },
      { id: 'Terbuka untuk kolaborasi dan proyek baru. Silakan hubungi saya lewat WhatsApp atau email.',
        en: 'Open to collaborations and new projects. Feel free to reach out via WhatsApp or email.' }
    ],
    focus: [
      { icon: '🎮', title: { id: 'Game Development', en: 'Game Development' }, desc: { id: 'Game RPG dan cerita interaktif.', en: 'RPGs and interactive stories.' } },
      { icon: '🎨', title: { id: 'Asset Development', en: 'Asset Development' }, desc: { id: 'Aset game yang siap dipakai developer lain.', en: 'Game assets ready for other developers to use.' } },
      { icon: '📱', title: { id: 'App Development', en: 'App Development' }, desc: { id: 'Aplikasi Android dan lintas platform.', en: 'Android and cross-platform apps.' } }
    ]
  },

  // ---------- SEDANG DIKERJAKAN ----------
  // Progres keseluruhan dihitung otomatis dari rata-rata progres chapter.
  nowWorking: {
    title: 'Three Word Left Unsaid',
    desc: {
      id: 'Game RPG fantasi romantis yang bercerita tentang seorang karakter bernama Haru yang ingin mengutarakan cintanya kepada gadis pujaannya, namun di balik itu semua ada banyak cobaan dalam kisah ini. Akankah Haru bisa mengutarakan perasaannya?',
      en: 'A romantic fantasy RPG about Haru, a young man who wants to confess his love to the girl he adores. But along the way he will face many trials. Will Haru be able to express his feelings?'
    },
    // progress = 0 sampai 100. title (opsional) = nama chapter dua bahasa.
    chapters: [
      { name: 'Chapter 1', progress: 40 },
      { name: 'Chapter 2', progress: 0 },
      { name: 'Chapter 3', progress: 0 },
      { name: 'Chapter 4', progress: 0 },
      { name: 'Chapter 5', progress: 0 }
    ],
    tags: ['RPG Maker MZ']
  },

  // slug ikon: https://simpleicons.org  (contoh: github, discord, itchdotio, youtube, instagram)
  socials: [
    { slug: 'itchdotio', label: 'Itch.io', url: 'https://hitotobi-games.itch.io/' },
    { slug: 'github',    label: 'GitHub',  url: 'https://github.com/' },
    { slug: 'discord',   label: 'Discord', url: 'https://discord.com/' },
    { slug: 'youtube',   label: 'YouTube', url: 'https://youtube.com/@hitotobigames?si=lMAkcXm9KwBhXyWi' }
  ]
};

// Format: ['folder', 'file', 'Nama', mono?]  — ikon dari https://devicon.dev
// Ikon sendiri: ['img', 'assets/namafile.png', 'Nama']  (taruh di public/assets/)
// mono = 1 untuk ikon berwarna hitam (otomatis dibalik di mode gelap)
export const STACK1 = [
  ['img', 'assets/RPG Maker.jpg', 'RPG Maker'],
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

// cat = kunci kategori: 'game' | 'tools' | 'asset'  (label ada di data/i18n.js -> CATS)
// video = URL embed YouTube, kosongkan jika tidak ada. links[].i = slug ikon (opsional)
export const PROJECTS = [
  { title: 'Project Nebula', cat: 'game', img: 'https://placehold.co/640x360/2a2545/2ee6c8?text=Nebula',
    desc: { id: 'Puzzle-platformer 2D dengan mekanik pembalik gravitasi.', en: '2D puzzle-platformer with a gravity-flipping mechanic.' },
    long: { id: 'Puzzle-platformer 2D di mana pemain membalik arah gravitasi untuk menyelesaikan rintangan.', en: 'A 2D puzzle-platformer where the player flips gravity to clear obstacles.' },
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    links: [{ l: { id: 'Mainkan di Itch.io', en: 'Play on Itch.io' }, u: 'https://itch.io/', i: 'itchdotio' }, { l: { id: 'Source code', en: 'Source code' }, u: 'https://github.com/', i: 'github' }] },
  { title: 'Pixel Tower', cat: 'game', img: 'https://placehold.co/640x360/2a2545/8b7bff?text=Pixel+Tower',
    desc: { id: 'Tower defense pixel art dengan 12 jenis menara.', en: 'Pixel-art tower defense with 12 tower types.' },
    long: { id: 'Tower defense pixel art dengan 12 menara, 30 gelombang musuh, dan sistem upgrade bercabang.', en: 'Pixel-art tower defense with 12 towers, 30 enemy waves, and a branching upgrade system.' },
    video: '', links: [{ l: { id: 'Mainkan di Itch.io', en: 'Play on Itch.io' }, u: 'https://itch.io/', i: 'itchdotio' }] },
  { title: 'AssetPacker', cat: 'tools', img: 'https://placehold.co/640x360/2a2545/ffb86b?text=AssetPacker',
    desc: { id: 'Tool desktop untuk mengemas sprite menjadi atlas.', en: 'Desktop tool that packs sprites into an atlas.' },
    long: { id: 'Aplikasi ringan untuk menggabungkan banyak sprite menjadi satu texture atlas.', en: 'A lightweight app that merges many sprites into a single texture atlas.' },
    video: '', links: [{ l: { id: 'Unduh', en: 'Download' }, u: 'https://itch.io/', i: 'itchdotio' }, { l: { id: 'GitHub', en: 'GitHub' }, u: 'https://github.com/', i: 'github' }] },
  { title: 'LevelKit', cat: 'tools', img: 'https://placehold.co/640x360/2a2545/93c5fd?text=LevelKit',
    desc: { id: 'Editor level berbasis web untuk prototipe cepat.', en: 'Web-based level editor for quick prototyping.' },
    long: { id: 'Editor level di browser: letakkan tile, simpan sebagai JSON, lalu muat di game.', en: 'A browser level editor: place tiles, save as JSON, then load it in your game.' },
    video: '', links: [{ l: { id: 'Coba demo', en: 'Try the demo' }, u: 'https://github.com/' }] },
  { title: 'Dungeon Tileset', cat: 'asset', img: 'https://placehold.co/640x360/2a2545/f472b6?text=Dungeon+Tileset',
    desc: { id: 'Paket tileset pixel art bertema dungeon, 16×16.', en: 'Dungeon-themed 16×16 pixel-art tileset pack.' },
    long: { id: 'Lebih dari 400 tile dungeon 16×16 lengkap dengan animasi obor, pintu, dan jebakan.', en: 'Over 400 dungeon tiles at 16×16, including animated torches, doors, and traps.' },
    video: '', links: [{ l: { id: 'Dapatkan di Itch.io', en: 'Get it on Itch.io' }, u: 'https://itch.io/', i: 'itchdotio' }] },
  { title: 'Fantasy UI Kit', cat: 'asset', img: 'https://placehold.co/640x360/2a2545/5eead4?text=Fantasy+UI',
    desc: { id: 'Elemen UI bertema fantasi: tombol, panel, ikon.', en: 'Fantasy-themed UI elements: buttons, panels, icons.' },
    long: { id: 'UI kit berisi tombol, panel, bar kesehatan, dan 120 ikon item bergaya fantasi.', en: 'A UI kit with buttons, panels, health bars, and 120 fantasy-style item icons.' },
    video: '', links: [{ l: { id: 'Dapatkan di Itch.io', en: 'Get it on Itch.io' }, u: 'https://itch.io/', i: 'itchdotio' }] }
];

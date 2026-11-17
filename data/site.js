/* ==========================================================
   DATA KONTEN — Edit file ini saja untuk mengganti isi website
   Teks dua bahasa ditulis { id: '...', en: '...' }
   Gambar ada di public/assets/  (ditulis 'assets/namafile.jpg')
   Data Experience (tanggal, peta perjalanan, peran) ada di data/experience.js
   ========================================================== */

// 'assets/foto.jpg' -> '/assets/foto.jpg' (spasi di nama file otomatis aman)
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

// cat = kunci kategori: 'game' | 'asset' | 'app'  (label ada di data/i18n.js -> CATS)
//   Semua kategori selalu tampil sebagai tab; yang belum ada proyeknya menampilkan "Segera hadir".
// sub = sub-kategori di dalam kategori (label ada di data/i18n.js -> SUBS), contoh:
//   game: 'rpg' | 'prototype' | 'jam'
//   asset: 'plugin' | 'map' | 'tileset' | 'audio'
//   app: 'android' | 'crossplatform' | 'tool'
// img = gambar thumbnail di public/assets/ (ditulis 'assets/namafile.png'). Jika belum ada, tampil kotak berwarna.
// video = URL embed YouTube, kosongkan jika tidak ada. links[].i = slug ikon (opsional)
// TODO: ganti `u` dengan alamat halaman tiap game, contoh: https://hitotobi-games.itch.io/nama-game
export const PROJECTS = [
  { title: 'QuestManager', cat: 'asset', sub: 'plugin', img: 'assets/questmanager.png',
    desc: { id: 'Quest log, tracker & compass untuk RPG Maker MZ.', en: 'Quest log, tracker & compass for RPG Maker MZ.' },
    long: { id: 'Sistem quest tanpa coding: quest bunuh dan kumpulkan item berjalan otomatis lewat tag, dilengkapi tracker di layar, compass penunjuk objektif, rantai quest, dan notifikasi popup. Gratis untuk proyek komersial maupun non-komersial, cukup beri kredit "Hitotobi Games".',
            en: 'A no-code quest system: kill and collect quests progress automatically via tags, with an on-screen tracker, objective compass, quest chains, and popup notifications. Free for commercial and non-commercial projects; just credit "Hitotobi Games".' },
    video: '', links: [{ l: { id: 'Lihat di Itch.io', en: 'View on Itch.io' }, u: 'https://hitotobi-games.itch.io/', i: 'itchdotio' }] },
  { title: 'Forest Camp Map', cat: 'asset', sub: 'map', img: 'assets/forest-camp-map.png',
    desc: { id: 'Map perkemahan hutan bergaya pixel art.', en: 'Pixel-art forest camp map.' },
    long: { id: 'Map perkemahan di tengah hutan dengan beberapa rumah kecil, siap dipakai di game RPG-mu.',
            en: 'A forest camp map with a few small houses, ready to use in your RPG game.' },
    video: '', links: [{ l: { id: 'Lihat di Itch.io', en: 'View on Itch.io' }, u: 'https://hitotobi-games.itch.io/', i: 'itchdotio' }] },
  { title: 'House Map Interior Pack', cat: 'asset', sub: 'map', img: 'assets/house-map-interior.png',
    desc: { id: 'Paket map interior 3 rumah: kamar, dapur, ruang tamu, dan lainnya.', en: 'Interior map pack for 3 houses: bedrooms, kitchen, living room, and more.' },
    long: { id: 'Tiga tipe interior rumah dengan kamar tidur, ruang tamu, dapur, dan ruang makan, plus toilet dan kamar mandi di rumah ke-2. Boleh dipakai komersial maupun non-komersial; beri kredit jika dipakai komersial.',
            en: 'Three house interiors with bedrooms, living room, kitchen, and dining room, plus a toilet and bathroom in house 2. Free for commercial and non-commercial use; credit required for commercial use.' },
    video: '', links: [{ l: { id: 'Lihat di Itch.io', en: 'View on Itch.io' }, u: 'https://hitotobi-games.itch.io/', i: 'itchdotio' }] }
];

// ---------- ANIMASI PEMBUKA (terminal / hacker) ----------
// enabled: false -> matikan animasi pembuka.
// oncePerSession: true -> hanya tampil sekali per tab/sesi browser (refresh tidak mengulang).
export const INTRO = { enabled: true, oncePerSession: false };

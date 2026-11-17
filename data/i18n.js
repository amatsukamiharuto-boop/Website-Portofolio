/* Teks antarmuka dua bahasa (id = Indonesia, en = English). Edit terjemahan di sini. */
export const UI = {
  menu: { id: 'Menu', en: 'Menu' },
  navAbout: { id: 'Tentang Saya', en: 'About Me' },
  navStatus: { id: 'Sedang Dikerjakan', en: 'In Progress' },
  navStack: { id: 'Tech Stack', en: 'Tech Stack' },
  navProjects: { id: 'Proyek', en: 'Projects' },
  navWhatsapp: { id: 'WhatsApp', en: 'WhatsApp' },
  navExperience: { id: 'Pengalaman', en: 'Experience' },
  navEmail: { id: 'Email', en: 'Email' },

  heroTitle: { id: 'Membangun game, tools, dan aset yang benar-benar dipakai.', en: 'Building games, tools, and assets people actually use.' },
  heroCta1: { id: 'Lihat proyek', en: 'View projects' },
  heroCta2: { id: 'Hubungi saya', en: 'Contact me' },

  aboutTitle: { id: 'Tentang Saya', en: 'About Me' },
  hello: { id: 'Halo, saya', en: "Hi, I'm" },

  expTitle: { id: 'Pengalaman', en: 'Experience' },
  expSub: { id: 'Perjalanan saya sebagai developer.', en: 'My journey as a developer.' },
  expSince: { id: 'Berjalan sejak', en: 'Running since' },
  expUnit: { id: 'bulan', en: 'months' },
  expUnit1: { id: 'bulan', en: 'month' },
  expSumDesc: { id: 'Membangun game, aset, dan aplikasi sebagai developer indie.', en: 'Building games, assets, and apps as an indie developer.' },
  expFactDone: { id: 'Proyek selesai', en: 'Projects done' },
  expFactDoing: { id: 'Dikerjakan', en: 'In progress' },
  expFactCats: { id: 'Kategori aktif', en: 'Active categories' },
  expSoon: { id: 'Segera hadir', en: 'Coming soon' },
  expMapTitle: { id: 'Peta perjalanan', en: 'Journey map' },
  expMapSub: { id: 'Bulan demi bulan, dari awal sampai sekarang.', en: 'Month by month, from the start until now.' },
  expRoles: { id: 'Peran', en: 'Roles' },

  introEnter: { id: 'MASUK', en: 'ENTER' },
  introSkip: { id: 'LEWATI', en: 'SKIP' },
  introHint: { id: 'Tekan Enter atau klik MASUK untuk melanjutkan', en: 'Press Enter or click ENTER to continue' },

  nowLabel: { id: 'Sedang dikerjakan', en: 'Now working on' },
  active: { id: 'Aktif', en: 'Active' },
  overall: { id: 'Progres keseluruhan', en: 'Overall progress' },
  chaptersDone: { id: 'chapter selesai', en: 'chapters completed' },
  stDone: { id: 'Selesai', en: 'Done' },
  stDoing: { id: 'Dikerjakan', en: 'In progress' },
  stTodo: { id: 'Belum dimulai', en: 'Not started' },
  stPlanned: { id: 'Rencana', en: 'Planned' },
  stLocked: { id: 'Terkunci', en: 'Locked' },

  projectsTitle: { id: 'Proyek', en: 'Projects' },
  projectsSub: { id: 'Pilih kategori, lalu klik kartu untuk melihat detailnya.', en: 'Pick a category, then click a card to see the details.' },
  all: { id: 'Semua', en: 'All' },
  itchAll: { id: 'Lihat semua di Itch.io', en: 'See all on Itch.io' },
  empty: { id: 'Belum ada proyek di kategori ini. Segera hadir!', en: 'No projects in this category yet. Coming soon!' },

  waTitle: { id: 'Chat lewat WhatsApp', en: 'Chat on WhatsApp' },
  waDesc: { id: 'Jalur tercepat untuk diskusi proyek, kolaborasi, atau pertanyaan singkat.', en: 'The fastest way to discuss projects, collaborations, or quick questions.' },
  waBtn: { id: 'Chat sekarang', en: 'Chat now' },

  emailTitle: { id: 'Kirim email', en: 'Send an email' },
  emailDesc: { id: 'Untuk pesan yang lebih panjang atau butuh lampiran, tulis lewat form ini atau kirim langsung ke:', en: 'For longer messages or attachments, use this form or write directly to:' },
  fName: { id: 'Nama', en: 'Name' },
  fEmail: { id: 'Email', en: 'Email' },
  fMsg: { id: 'Pesan', en: 'Message' },
  fSend: { id: 'Kirim pesan', en: 'Send message' },
  fSent: { id: 'Aplikasi email Anda akan terbuka untuk mengirim pesan.', en: 'Your email app will open so you can send the message.' }
};

// Label kategori proyek. Urutan di sini = urutan tab. Semua kategori selalu tampil, walau masih kosong.
export const CATS = {
  game: { id: 'Game Development', en: 'Game Development' },
  asset: { id: 'Asset Development', en: 'Asset Development' },
  app: { id: 'App/Software Development', en: 'App/Software Development' }
};

// Sub-kategori per kategori. Dipakai di field `sub` pada PROJECTS dan MILESTONES.
// Tambah/hapus bebas; urutan di sini = urutan chip.
export const SUBS = {
  game: {
    rpg: { id: 'RPG', en: 'RPG' },
    prototype: { id: 'Prototipe', en: 'Prototype' },
    jam: { id: 'Game Jam', en: 'Game Jam' }
  },
  asset: {
    plugin: { id: 'Plugin', en: 'Plugins' },
    map: { id: 'Map', en: 'Maps' },
    tileset: { id: 'Tileset', en: 'Tilesets' },
    audio: { id: 'Audio', en: 'Audio' }
  },
  app: {
    android: { id: 'Android', en: 'Android' },
    crossplatform: { id: 'Lintas Platform', en: 'Cross-platform' },
    tool: { id: 'Tools', en: 'Tools' }
  }
};

/* ==========================================================
   DATA EXPERIENCE — file baru. Edit di sini saja.
   Tanggal ditulis 'YYYY-MM-DD' (dengan hari) atau 'YYYY-MM' (bulan saja).
   !! Semua tanggal di bawah hanyalah CONTOH. Ganti dengan tanggal aslimu. !!
   ========================================================== */

export const MONTHS = {
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

const parts = s => { const [y, m, d] = s.split('-').map(Number); return { y, m: m - 1, d: d || 0 }; };
export const monthIndex = s => { const { y, m } = parts(s); return y * 12 + m; };

// '2026-06-15' -> { id: '15 Jun 2026', en: '15 Jun 2026' }
export const dateLabel = s => {
  const { y, m, d } = parts(s);
  const f = l => `${d ? d + ' ' : ''}${MONTHS[l][m]} ${y}`;
  return { id: f('id'), en: f('en') };
};

// end kosong -> "Sekarang / Present"
export const dateSpan = (a, b) => {
  const s = dateLabel(a);
  const e = b ? dateLabel(b) : { id: 'Sekarang', en: 'Present' };
  return { id: `${s.id} – ${e.id}`, en: `${s.en} – ${e.en}` };
};

// Awal perjalanan. Lama pengalaman (misal "5 bulan") dihitung otomatis dari sini sampai hari ini.
export const EXP_START = '2026-06-15';

// Peta perjalanan. Urutan di file bebas, otomatis diurutkan menurut tanggal.
// cat: 'game' | 'asset' | 'app' | 'general' (general = penanda umum, tidak masuk hitungan)
// sub: kunci sub-kategori dari data/i18n.js -> SUBS
// status: 'done' | 'doing' | 'planned'
// title boleh string biasa (nama proyek) atau { id, en }
export const MILESTONES = [
  { date: '2026-07-7', cat: 'general', status: 'done',
    title: { id: 'Hitotobi Games berdiri', en: 'Hitotobi Games founded' },
    desc: { id: 'Mulai membangun game dan aset sebagai studio indie.', en: 'Started building games and assets as an indie studio.' } },
  { date: '2026-09-25', cat: 'asset', sub: 'plugin', status: 'done', title: 'QuestManager',
    desc: { id: 'Plugin quest log, tracker, dan compass untuk RPG Maker MZ.', en: 'Quest log, tracker, and compass plugin for RPG Maker MZ.' } },
  { date: '2026-07-02', cat: 'asset', sub: 'map', status: 'done', title: 'Forest Camp Map',
    desc: { id: 'Map perkemahan hutan bergaya pixel art.', en: 'Pixel-art forest camp map.' } },
  { date: '2026-07-05', cat: 'asset', sub: 'map', status: 'done', title: 'House Map Interior Pack',
    desc: { id: 'Paket interior untuk 3 tipe rumah.', en: 'Interior pack for 3 house types.' } },
  { date: '2026-7-01', cat: 'game', sub: 'rpg', status: 'doing', title: 'Three Word Left Unsaid',
    desc: { id: 'Game RPG fantasi romantis. Chapter 1 sedang dikerjakan.', en: 'Romantic fantasy RPG. Chapter 1 is in progress.' } },
  { date: '2026-12', cat: 'game', sub: 'rpg', status: 'planned', title: 'Three Word Left Unsaid · Chapter 2',
    desc: { id: 'Target mulai pengerjaan chapter berikutnya.', en: 'Planned start of the next chapter.' } }
];

// Peran. start/end -> periode tampil otomatis (Jun 2026 – Sekarang). current: true -> titik berdenyut.
export const EXPERIENCE = [
  { role: { id: 'Founder & Developer', en: 'Founder & Developer' }, org: 'Hitotobi Games',
    start: '2026-07-01', end: '', current: true,
    desc: { id: 'Memimpin studio indie dan mengembangkan game RPG fantasi romantis "Three Word Left Unsaid" dengan RPG Maker MZ.',
            en: 'Leading an indie studio and developing the romantic fantasy RPG "Three Word Left Unsaid" with RPG Maker MZ.' },
    tags: ['RPG Maker MZ', 'JavaScript'] },
  { role: { id: 'Asset Developer', en: 'Asset Developer' }, org: 'Itch.io · hitotobi-games',
    start: '2026-07-02', end: '2026-09-12',
    desc: { id: 'Merilis aset game untuk developer lain: plugin QuestManager, Forest Camp Map, dan House Map Interior Pack.',
            en: 'Releasing game assets for other developers: the QuestManager plugin, Forest Camp Map, and House Map Interior Pack.' },
    tags: ['Plugin', 'Map Assets'] },
  { role: { id: 'App Developer', en: 'App Developer' }, org: 'Hitotobi Games',
    start: '2026-10-7', end: '',
    desc: { id: 'Membangun aplikasi Android dan lintas platform.', en: 'Building Android and cross-platform apps.' },
    tags: ['Flutter', 'Dart', 'Kotlin'] }
];

# Portofolio Studio

Website statis (HTML + Tailwind CDN + JavaScript Vanilla). Tidak perlu build.

## Struktur
```
index.html        -> kerangka halaman
css/style.css     -> gaya & animasi (tema, marquee, kartu, modal)
js/theme-init.js  -> menerapkan tema tersimpan sebelum halaman tampil
js/data.js        -> SEMUA konten (nama, WA, email, proyek, tech stack, sosial)
js/main.js        -> logika (filter, modal, marquee, tema, form)
assets/logo.svg   -> logo (ganti dengan logo Anda, nama file tetap)
```

## Mengganti konten
Buka `js/data.js`: ubah `studio`, `founder`, `about`, `whatsapp` (format 628xxx), `email`, `nowWorking`, `socials`, `STACK1/STACK2`, dan `PROJECTS`.
Gambar proyek: taruh di `assets/` lalu isi `img:'assets/namafile.png'`.

## Deploy: GitHub + Vercel
1. Buat repository di GitHub, unggah semua file ini (index.html di root repo).
2. Di vercel.com: Add New > Project > Import repository tersebut.
3. Framework Preset: **Other**. Kosongkan Build Command dan Output Directory. Klik Deploy.
4. Setelahnya, setiap commit/edit di GitHub otomatis ter-deploy ulang oleh Vercel.

## Cari error
Tekan F12 > tab Console. Error di data.js biasanya menghentikan seluruh halaman (cek koma dan tanda kutip).
Peringatan "cdn.tailwindcss.com should not be used in production" aman diabaikan.

# Hitotobi Games — Portofolio (Next.js)

Next.js (App Router) + Tailwind CSS 4 + AOS. Kartu profil memakai komponen Profile Card dari React Bits.

## Struktur
```
app/layout.js            -> kerangka HTML, font, tema
app/page.js              -> urutan section
app/globals.css          -> semua gaya & animasi
data/site.js             -> SEMUA konten (nama, WA, email, proyek, tech stack, sosial)
components/              -> satu file per bagian (Hero, About, Status, TechStack, Projects, Contact, Footer, dll)
components/ProfileCard.* -> kartu profil React Bits
public/assets/           -> gambar (profile.jpg, logo, ikon)
```

## Mengganti konten
Edit `data/site.js` saja. Gambar ditulis `'assets/namafile.jpg'` dan harus ada di `public/assets/`.

## Menjalankan di komputer (opsional, butuh Node.js 20.9+)
```
npm install
npm run dev     # buka http://localhost:3000
```

## Deploy GitHub -> Vercel
1. Hapus file lama di repo (index.html, folder css, js, assets), lalu unggah isi proyek ini (package.json harus ada di root repo).
2. Gambar harus berada di `public/assets/`.
3. Di Vercel: Project > Settings > Build & Development > **Framework Preset = Next.js**; kosongkan Build Command dan Output Directory.
4. Setiap commit di GitHub akan otomatis ter-deploy.

## Cari error
Buka Vercel > Deployments > klik deployment > **Build Logs** untuk error build, atau F12 > Console untuk error di browser.

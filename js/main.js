/* Logika website. Konten diambil dari js/data.js.
   Setiap bagian dibungkus safe() agar satu error tidak mematikan seluruh halaman. */
const $ = (s, el = document) => el.querySelector(s);
const root = document.documentElement;
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/';
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const errors = [];
let profileCard = null;
function safe(name, fn) { try { fn(); } catch (e) { console.error('[Portofolio] ' + name, e); errors.push(name + ' (' + e.message + ')'); } }

const C = typeof CONFIG !== 'undefined' ? CONFIG : null;
const S1 = typeof STACK1 !== 'undefined' ? STACK1 : [];
const S2 = typeof STACK2 !== 'undefined' ? STACK2 : [];
const PR = typeof PROJECTS !== 'undefined' ? PROJECTS : [];
if (!C) errors.push('js/data.js gagal dimuat atau ada salah tulis (cek koma, kutip, kurung)');
const cfg = C || {};

function applyIcons(scope = document) {
  scope.querySelectorAll('[data-si]').forEach(e => e.style.setProperty('--i', `url(${SI}${e.dataset.si}.svg)`));
}

safe('teks dasar', () => {
  const set = (sel, v) => { if (v) document.querySelectorAll(sel).forEach(e => e.textContent = v); };
  set('[data-studio]', cfg.studio); set('[data-founder]', cfg.founder);
  if (cfg.about) $('#aboutText').textContent = cfg.about.replace('{studio}', cfg.studio || '');
  if (cfg.studio) document.title = cfg.studio;
  $('#year').textContent = new Date().getFullYear();
});

safe('kontak', () => {
  if (cfg.whatsapp) $('#waBtn').href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(cfg.waMessage || '')}`;
  if (cfg.email) { $('#emailLink').href = 'mailto:' + cfg.email; $('#emailLink').textContent = cfg.email; }
});

safe('status proyek', () => {
  const nw = cfg.nowWorking || {};
  $('#nowTitle').textContent = nw.title || '';
  $('#nowDesc').textContent = nw.desc || '';
  $('#nowTags').innerHTML = (nw.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
  const p = nw.progress || 0;
  setTimeout(() => { $('#nowFill').style.width = p + '%'; $('#nowPct').textContent = p + '%'; }, 250);
});

safe('tema', () => {
  $('#themeBtn').onclick = () => {
    root.classList.toggle('light');
    if (profileCard) profileCard.setTheme(root.classList.contains('light') ? 'light' : 'dark');
    try { localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark'); } catch (e) {}
  };
});

safe('marquee', () => {
  const fillRow = (el, list) => {
    // dir === 'img' -> file adalah alamat gambar sendiri (mis. 'assets/rpgmaker.png'); selain itu pakai Devicon
    const one = list.map(([dir, file, name, mono]) => {
      const src = dir === 'img' ? file : `${DEVICON}${dir}/${file}.svg`;
      return `<div class="chip surface" title="${name}"><img class="${mono ? 'mono' : ''}" src="${src}" alt="${name}" width="42" height="42" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:this.alt,className:'text-xs font-semibold text-center px-1'}))"></div>`;
    }).join('');
    const reps = Math.max(2, Math.ceil(2800 / (Math.max(list.length, 1) * 92)));
    const group = one.repeat(reps);
    el.innerHTML = group + group;
  };
  fillRow($('#row1'), S1); fillRow($('#row2'), S2);
});

safe('proyek & modal', () => {
  const cats = ['Semua', ...new Set(PR.map(p => p.cat))];
  const tabs = $('#tabs'), grid = $('#grid'), modal = $('#modal'); let lastFocus;
  tabs.innerHTML = cats.map((c, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-cat="${c}">${c}</button>`).join('');
  function render(cat) {
    grid.innerHTML = PR.map((p, i) => ({ p, i })).filter(({ p }) => cat === 'Semua' || p.cat === cat).map(({ p, i }, n) => `
      <div class="h-full" data-aos="fade-up" data-aos-delay="${(n % 3) * 100}">
        <button class="card surface" data-i="${i}" aria-label="Buka detail ${p.title}">
          <img src="${p.img}" alt="Thumbnail ${p.title}" loading="lazy" width="640" height="360">
          <div class="p-5">
            <span class="tag">${p.cat}</span>
            <h3 class="text-lg font-extrabold mt-2">${p.title}</h3>
            <p class="muted text-sm mt-1">${p.desc}</p>
          </div>
        </button>
      </div>`).join('');
    if (window.AOS && root.classList.contains('aos-ready')) AOS.refreshHard();
  }
  render('Semua');
  tabs.onclick = e => {
    const b = e.target.closest('.tab'); if (!b) return;
    tabs.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t === b));
    render(b.dataset.cat);
  };
  grid.onclick = e => {
    const c = e.target.closest('.card'); if (!c) return;
    const p = PR[c.dataset.i]; lastFocus = c;
    $('#mTitle').textContent = p.title; $('#mTag').textContent = p.cat; $('#mDesc').textContent = p.long || p.desc;
    $('#mMedia').innerHTML = p.video
      ? `<iframe class="w-full h-full" src="${p.video}" title="Video ${p.title}" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>`
      : `<img class="w-full h-full object-cover" src="${p.img}" alt="Cuplikan ${p.title}">`;
    $('#mLinks').innerHTML = (p.links || []).map((l, k) =>
      `<a class="btn ${k ? 'btn-ghost' : 'btn-primary'}" href="${l.u}" target="_blank" rel="noopener noreferrer">${l.i ? `<span class="ico" data-si="${l.i}"></span>` : ''}${l.l}</a>`).join('');
    applyIcons($('#mLinks'));
    modal.classList.add('open'); document.body.style.overflow = 'hidden'; $('#mClose').focus();
  };
  const closeModal = () => {
    modal.classList.remove('open'); document.body.style.overflow = '';
    $('#mMedia').innerHTML = '';
    if (lastFocus) lastFocus.focus();
  };
  $('#mClose').onclick = closeModal;
  modal.onclick = e => { if (e.target === modal) closeModal(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
});

safe('form email', () => {
  $('#form').onsubmit = e => {
    e.preventDefault();
    const n = $('#fn').value, em = $('#fe').value, m = $('#fm').value;
    location.href = `mailto:${cfg.email || ''}?subject=${encodeURIComponent('Pesan dari ' + n)}&body=${encodeURIComponent(m + '\n\n' + n + ' (' + em + ')')}`;
    $('#formMsg').classList.remove('hidden');
  };
});

safe('sosial', () => {
  $('#socials').innerHTML = (cfg.socials || []).map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}" class="iconbtn"><span class="ico" data-si="${s.slug}"></span></a>`).join('');
  applyIcons();
});

safe('kartu profil', () => {
  if (typeof createProfileCard !== 'function') throw new Error('js/profilecard.js belum dimuat');
  profileCard = createProfileCard($('#profileCard'), {
    avatarUrl: cfg.photo || 'assets/foto.jpg',
    miniAvatarUrl: cfg.logo || 'assets/Hitotobi_Games_logo.png',
    name: cfg.founder || '',
    title: cfg.role || 'Game · Asset · App Developer',
    handle: cfg.handle || 'hitotobigames',
    status: 'Aktif',
    contactText: 'Hubungi',
    theme: root.classList.contains('light') ? 'light' : 'dark',
    holo: 0.8, glare: 0.5, tiltStrength: 12, parallax: 8, radius: 16, intro: true,
    onContactClick: () => $('#whatsapp').scrollIntoView({ behavior: 'smooth' })
  });
});

safe('animasi AOS', () => {
  if (!window.AOS) return;
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
  root.classList.add('aos-ready');
});

// Banner error (hanya muncul jika ada masalah) — buka F12 > Console untuk detail
if (errors.length) {
  const b = document.createElement('div'); b.id = 'errBanner';
  b.textContent = 'Ada error di: ' + errors.join(' | ') + '. Buka F12 > Console untuk detail.';
  document.body.appendChild(b);
}

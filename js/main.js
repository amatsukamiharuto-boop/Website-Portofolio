/* Logika website. Konten diambil dari js/data.js */
const $ = (s, el = document) => el.querySelector(s);
const root = document.documentElement;
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/';
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

// Pasang ikon simple-icons pada elemen [data-si="slug"]
function applyIcons(scope = document) {
  scope.querySelectorAll('[data-si]').forEach(e => e.style.setProperty('--i', `url(${SI}${e.dataset.si}.svg)`));
}

/* Teks global */
document.querySelectorAll('[data-studio]').forEach(e => e.textContent = CONFIG.studio);
document.querySelectorAll('[data-founder]').forEach(e => e.textContent = CONFIG.founder);
$('#about').textContent = CONFIG.about.replace('{studio}', CONFIG.studio);
document.title = CONFIG.studio + ' — Portofolio';
$('#year').textContent = new Date().getFullYear();

/* Kontak */
$('#waBtn').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.waMessage)}`;
$('#emailLink').href = 'mailto:' + CONFIG.email;
$('#emailLink').textContent = CONFIG.email;

/* Status proyek */
const nw = CONFIG.nowWorking;
$('#nowTitle').textContent = nw.title;
$('#nowDesc').textContent = nw.desc;
$('#nowTags').innerHTML = nw.tags.map(t => `<span class="tag">${t}</span>`).join('');
setTimeout(() => { $('#nowFill').style.width = nw.progress + '%'; $('#nowPct').textContent = nw.progress + '%'; }, 250);

/* Tema terang/gelap */
$('#themeBtn').onclick = () => {
  root.classList.toggle('light');
  try { localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark'); } catch (e) {}
};

/* Marquee: hanya ikon. Daftar diulang agar cukup lebar, lalu digandakan untuk loop -50% yang mulus */
function fillRow(el, list) {
  const one = list.map(([dir, file, name, mono]) =>
    `<div class="chip surface" title="${name}"><img class="${mono ? 'mono' : ''}" src="${DEVICON}${dir}/${file}.svg" alt="${name}" width="42" height="42" decoding="async"></div>`).join('');
  const group = one.repeat(4);
  el.innerHTML = group + group;
}
fillRow($('#row1'), STACK1);
fillRow($('#row2'), STACK2);

/* Filter & grid proyek */
const cats = ['Semua', ...new Set(PROJECTS.map(p => p.cat))];
const tabs = $('#tabs'), grid = $('#grid');
tabs.innerHTML = cats.map((c, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-cat="${c}">${c}</button>`).join('');
function render(cat) {
  grid.innerHTML = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => cat === 'Semua' || p.cat === cat).map(({ p, i }) => `
    <button class="card surface" data-i="${i}" aria-label="Buka detail ${p.title}">
      <img src="${p.img}" alt="Thumbnail ${p.title}" loading="lazy" width="640" height="360">
      <div class="p-5">
        <span class="tag">${p.cat}</span>
        <h3 class="text-lg font-extrabold mt-2">${p.title}</h3>
        <p class="muted text-sm mt-1">${p.desc}</p>
      </div>
    </button>`).join('');
}
render('Semua');
tabs.onclick = e => {
  const b = e.target.closest('.tab'); if (!b) return;
  tabs.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t === b));
  render(b.dataset.cat);
};

/* Modal detail proyek */
const modal = $('#modal'); let lastFocus;
grid.onclick = e => {
  const c = e.target.closest('.card'); if (!c) return;
  const p = PROJECTS[c.dataset.i]; lastFocus = c;
  $('#mTitle').textContent = p.title; $('#mTag').textContent = p.cat; $('#mDesc').textContent = p.long;
  $('#mMedia').innerHTML = p.video
    ? `<iframe class="w-full h-full" src="${p.video}" title="Video ${p.title}" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    : `<img class="w-full h-full object-cover" src="${p.img}" alt="Cuplikan ${p.title}">`;
  $('#mLinks').innerHTML = p.links.map((l, k) =>
    `<a class="btn ${k ? 'btn-ghost' : 'btn-primary'}" href="${l.u}" target="_blank" rel="noopener noreferrer">${l.i ? `<span class="ico" data-si="${l.i}"></span>` : ''}${l.l}</a>`).join('');
  applyIcons($('#mLinks'));
  modal.classList.add('open'); document.body.style.overflow = 'hidden'; $('#mClose').focus();
};
function closeModal() {
  modal.classList.remove('open'); document.body.style.overflow = '';
  $('#mMedia').innerHTML = ''; // hentikan video
  if (lastFocus) lastFocus.focus();
}
$('#mClose').onclick = closeModal;
modal.onclick = e => { if (e.target === modal) closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* Form email: membuka aplikasi email. Ganti dengan Formspree/EmailJS jika ingin kirim langsung. */
$('#form').onsubmit = e => {
  e.preventDefault();
  const n = $('#fn').value, em = $('#fe').value, m = $('#fm').value;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Pesan dari ' + n)}&body=${encodeURIComponent(m + '\n\n' + n + ' (' + em + ')')}`;
  $('#formMsg').classList.remove('hidden');
};

/* Ikon sosial footer */
$('#socials').innerHTML = CONFIG.socials.map(s =>
  `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}" class="iconbtn"><span class="ico" data-si="${s.slug}"></span></a>`).join('');
applyIcons();

'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import Icon from './Icon';
import L from './L';
import { CONFIG, PROJECTS, asset } from '../data/site';
import { CATS, SUBS } from '../data/i18n';
import './Portfolio.css';

// Jumlah proyek yang tampil di beranda (mode preview). Sisanya ada di halaman /portfolio.
const HOME_LIMIT = 6;

// Gambar thumbnail; jika file belum ada/gagal dimuat, tampil kotak berwarna berisi judul
function Thumb({ src, title, className = '', ...rest }) {
  const [bad, setBad] = useState(false);
  if (bad || !src) return <div className={`thumb-ph ${className}`} role="img" aria-label={title}>{title}</div>;
  return <img src={asset(src)} alt={`Thumbnail ${title}`} className={className} onError={() => setBad(true)} {...rest} />;
}

// full = true  -> halaman /portfolio: semua proyek + ringkasan + filter kategori & sub-kategori
// full = false -> beranda: proyek terbaru saja + tombol menuju /portfolio
export default function Projects({ full = false }) {
  const itchUrl = CONFIG.socials.find(s => s.slug === 'itchdotio')?.url;
  const catKeys = useMemo(() => Object.keys(CATS), []);
  const [cat, setCat] = useState('all');
  const [sub, setSub] = useState('all');
  const [sel, setSel] = useState(null);

  // Terbaru di depan (proyek yang ditulis paling bawah di PROJECTS tampil paling dulu)
  const ordered = useMemo(() => [...PROJECTS].reverse(), []);
  const source = full ? ordered : ordered.slice(0, HOME_LIMIT);

  const label = c => (c === 'all' ? { id: 'Semua', en: 'All' } : CATS[c] || { id: c, en: c });
  const subLabel = p => SUBS[p.cat]?.[p.sub];

  const inCat = source.filter(p => cat === 'all' || p.cat === cat);
  const list = inCat.filter(p => sub === 'all' || p.sub === sub);
  const subKeys = full && cat !== 'all' ? Object.keys(SUBS[cat] || {}) : [];
  const countOf = k => (k === 'all' ? source.length : source.filter(p => p.cat === k).length);

  const pickCat = c => { setCat(c); setSub('all'); };

  // Muat ulang animasi saat filter berganti
  useEffect(() => {
    try { if (document.documentElement.classList.contains('aos-ready')) AOS.refreshHard(); } catch (e) {}
  }, [cat, sub]);

  // Modal: tutup dengan Esc, kunci scroll halaman
  useEffect(() => {
    if (!sel) return;
    const onKey = e => { if (e.key === 'Escape') setSel(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [sel]);

  const Title = full ? 'h1' : 'h2';
  const n = list.length;

  return (
    <section id="projects" className={`max-w-6xl mx-auto px-5 ${full ? 'pt-10 pb-16' : 'py-16'}`}>
      {full && (
        <Link href="/" className="pf-back" data-aos="fade-up"><span aria-hidden="true">‹</span><L t={{ id: 'Kembali ke beranda', en: 'Back to home' }} /></Link>
      )}

      <Title className={`${full ? 'mt-5 text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'} font-extrabold`} data-aos="fade-up">
        {full ? <L t={{ id: 'Portofolio', en: 'Portfolio' }} /> : <L k="projectsTitle" />}
      </Title>
      <p className="muted mt-2 max-w-2xl" data-aos="fade-up" data-aos-delay="100">
        {full
          ? <L t={{ id: 'Semua game, aset, dan aplikasi buatan Hitotobi Games. Pilih kategori, lalu klik kartu untuk melihat detailnya.', en: 'Every game, asset, and app made by Hitotobi Games. Pick a category, then click a card to see the details.' }} />
          : <L t={{ id: 'Proyek terbaru. Klik kartu untuk melihat detailnya.', en: 'Latest projects. Click a card to see the details.' }} />}
      </p>

      {/* Halaman penuh: kotak ringkasan yang sekaligus menjadi filter kategori */}
      {full && (
        <div role="tablist" aria-label="Kategori / Category" className="pf-tabs" data-aos="fade-up" data-aos-delay="150">
          {['all', ...catKeys].map(k => (
            <button key={k} role="tab" className="pf-tab" data-cat={k === 'all' ? undefined : k} aria-selected={k === cat} onClick={() => pickCat(k)}>
              <span className="pf-tab-name">
                {k !== 'all' && <i className="mk" data-cat={k} />}
                <L t={label(k)} />
              </span>
              <span className="pf-tab-n">{countOf(k)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Sub-kategori (Plugin, Map, dst.) muncul setelah memilih kategori utama */}
      {subKeys.length > 0 && (
        <div key={cat} role="tablist" className="flex flex-wrap gap-2 mt-4" aria-label="Sub-kategori / Sub-category">
          {['all', ...subKeys].map((k, i) => {
            const count = k === 'all' ? inCat.length : inCat.filter(p => p.sub === k).length;
            return (
              <button key={k} role="tab" className={`subtab ${count === 0 ? 'zero' : ''}`} style={{ '--n': i }}
                aria-selected={k === sub} onClick={() => setSub(k)}>
                <L t={k === 'all' ? { id: 'Semua', en: 'All' } : SUBS[cat][k]} /><small>{count}</small>
              </button>
            );
          })}
        </div>
      )}

      {full && (
        <p className="pf-meta" aria-live="polite">
          <span><L t={{ id: `Menampilkan ${n} proyek`, en: `Showing ${n} ${n === 1 ? 'project' : 'projects'}` }} /></span>
          <span><L t={{ id: 'Terbaru di atas', en: 'Newest first' }} /></span>
        </p>
      )}

      {list.length === 0 && (
        <div className="empty-box" data-aos="fade-up"><L k="empty" /></div>
      )}

      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ${full ? 'mt-6' : 'mt-8'}`}>
        {list.map((p, i) => (
          <div key={p.title} className="h-full" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
            <button className="card surface" aria-label={p.title} onClick={() => setSel(p)}>
              <Thumb src={p.img} title={p.title} loading="lazy" width="640" height="360" />
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="tag"><L t={label(p.cat)} /></span>
                  {subLabel(p) && <span className="tag tag-sub"><L t={subLabel(p)} /></span>}
                </div>
                <h3 className="text-lg font-extrabold mt-2">{p.title}</h3>
                <p className="muted text-sm mt-1"><L t={p.desc} /></p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3" data-aos="fade-up">
        {!full && (
          <Link className="btn btn-primary" href="/portfolio"><L t={{ id: 'Lihat semua proyek', en: 'View all projects' }} /> ›</Link>
        )}
        {itchUrl && (
          <a className="btn btn-ghost" href={itchUrl} target="_blank" rel="noopener noreferrer"><Icon slug="itchdotio" /><L k="itchAll" /></a>
        )}
      </div>

      {/* Ajakan kontak di akhir halaman portfolio */}
      {full && (
        <div className="pf-cta" data-aos="fade-up">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold"><L t={{ id: 'Punya proyek atau ide kolaborasi?', en: 'Have a project or a collaboration idea?' }} /></h2>
            <p className="muted mt-1"><L t={{ id: 'Ceritakan lewat WhatsApp atau email, saya senang berdiskusi.', en: 'Tell me via WhatsApp or email, happy to talk.' }} /></p>
          </div>
          <Link className="btn btn-primary justify-center" href="/#whatsapp"><L k="heroCta2" /></Link>
        </div>
      )}

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(8,6,18,.7)' }}
          role="dialog" aria-modal="true" aria-labelledby="mTitle" onClick={e => { if (e.target === e.currentTarget) setSel(null); }}>
          <div className="modal-box surface rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="aspect-video w-full" style={{ background: 'var(--line)' }}>
              {sel.video
                ? <iframe className="w-full h-full" src={sel.video} title={`Video ${sel.title}`} allow="encrypted-media; picture-in-picture" allowFullScreen />
                : <Thumb src={sel.img} title={sel.title} className="w-full h-full object-cover" />}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag"><L t={label(sel.cat)} /></span>
                    {subLabel(sel) && <span className="tag tag-sub"><L t={subLabel(sel)} /></span>}
                  </div>
                  <h3 id="mTitle" className="text-2xl font-extrabold mt-2">{sel.title}</h3>
                </div>
                <button className="iconbtn shrink-0" aria-label="Tutup / Close" autoFocus onClick={() => setSel(null)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
                </button>
              </div>
              <p className="muted mt-3 leading-relaxed"><L t={sel.long || sel.desc} /></p>
              <div className="flex flex-wrap gap-3 mt-6">
                {(sel.links || []).map((l, k) => (
                  <a key={l.u + k} className={`btn ${k ? 'btn-ghost' : 'btn-primary'}`} href={l.u} target="_blank" rel="noopener noreferrer">
                    {l.i && <Icon slug={l.i} />}<L t={l.l} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

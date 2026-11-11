'use client';
import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import Icon from './Icon';
import L from './L';
import { PROJECTS } from '../data/site';
import { CATS } from '../data/i18n';

export default function Projects() {
  const cats = useMemo(() => ['all', ...new Set(PROJECTS.map(p => p.cat))], []);
  const [cat, setCat] = useState('all');
  const [sel, setSel] = useState(null);
  const list = PROJECTS.filter(p => cat === 'all' || p.cat === cat);
  const label = c => (c === 'all' ? { id: 'Semua', en: 'All' } : CATS[c] || { id: c, en: c });

  // Muat ulang animasi saat filter berganti
  useEffect(() => {
    try { if (document.documentElement.classList.contains('aos-ready')) AOS.refreshHard(); } catch (e) {}
  }, [cat]);

  // Modal: tutup dengan Esc, kunci scroll halaman
  useEffect(() => {
    if (!sel) return;
    const onKey = e => { if (e.key === 'Escape') setSel(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [sel]);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-5 py-16">
      <h2 className="text-2xl sm:text-3xl font-extrabold" data-aos="fade-up"><L k="projectsTitle" /></h2>
      <p className="muted mt-2" data-aos="fade-up" data-aos-delay="100"><L k="projectsSub" /></p>

      <div role="tablist" className="flex flex-wrap gap-2 mt-6" data-aos="fade-up" data-aos-delay="150">
        {cats.map(c => (
          <button key={c} role="tab" className="tab" aria-selected={c === cat} onClick={() => setCat(c)}><L t={label(c)} /></button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {list.map((p, n) => (
          <div key={p.title} className="h-full" data-aos="fade-up" data-aos-delay={(n % 3) * 100}>
            <button className="card surface" aria-label={p.title} onClick={() => setSel(p)}>
              <img src={p.img} alt={`Thumbnail ${p.title}`} loading="lazy" width="640" height="360" />
              <div className="p-5">
                <span className="tag"><L t={label(p.cat)} /></span>
                <h3 className="text-lg font-extrabold mt-2">{p.title}</h3>
                <p className="muted text-sm mt-1"><L t={p.desc} /></p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(8,6,18,.7)' }}
          role="dialog" aria-modal="true" aria-labelledby="mTitle" onClick={e => { if (e.target === e.currentTarget) setSel(null); }}>
          <div className="modal-box surface rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="aspect-video w-full" style={{ background: 'var(--line)' }}>
              {sel.video
                ? <iframe className="w-full h-full" src={sel.video} title={`Video ${sel.title}`} allow="encrypted-media; picture-in-picture" allowFullScreen />
                : <img className="w-full h-full object-cover" src={sel.img} alt={`Cuplikan ${sel.title}`} />}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="tag"><L t={label(sel.cat)} /></span>
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

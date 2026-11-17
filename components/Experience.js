'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import AOS from 'aos';
import L from './L';
import { EXPERIENCE, MILESTONES, EXP_START, MONTHS, monthIndex, dateLabel, dateSpan } from '../data/journey';
import { CATS, SUBS } from '../data/i18n';

const T = ({ v }) => (typeof v === 'string' ? v : <L t={v} />);
const STATUS = { done: ['st-done', 'stDone'], doing: ['st-doing', 'stDoing'], planned: ['st-todo', 'stPlanned'] };

// Angka naik dari 0 saat terlihat (menunggu animasi pembuka selesai)
function Count({ to }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    let raf = 0, io = null, started = false;
    const run = () => {
      io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting || started) return;
        started = true; io.disconnect();
        const t0 = performance.now(), dur = 1100;
        const step = n => {
          const f = Math.min(1, (n - t0) / dur);
          setV(Math.round(to * (1 - Math.pow(1 - f, 3))));
          if (f < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      }, { threshold: 0.4 });
      io.observe(el);
    };
    const d = document.documentElement;
    const waiting = d.dataset.intro === 'pending';
    if (waiting) window.addEventListener('intro:done', run, { once: true }); else run();
    return () => { window.removeEventListener('intro:done', run); io && io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{v}</b>;
}

export default function Experience() {
  const [cat, setCat] = useState('all');
  const mapRef = useRef(null);
  const catKeys = Object.keys(CATS);

  const sorted = useMemo(() => [...MILESTONES].sort((a, b) => a.date.localeCompare(b.date)), []);

  // Ringkasan
  const real = sorted.filter(x => x.cat !== 'general');
  const live = k => real.filter(x => x.cat === k && x.status !== 'planned');
  const max = Math.max(1, ...catKeys.map(k => live(k).length));
  const now = new Date();
  const months = Math.max(1, now.getFullYear() * 12 + now.getMonth() - monthIndex(EXP_START));
  const doneN = real.filter(x => x.status === 'done').length;
  const doingN = real.filter(x => x.status === 'doing').length;
  const activeCats = catKeys.filter(k => live(k).length > 0).length;

  // Baris peta: satu baris per bulan dari awal sampai milestone terakhir
  const rows = useMemo(() => {
    const first = monthIndex(EXP_START);
    const last = Math.max(first, ...sorted.map(x => monthIndex(x.date)));
    const show = x => cat === 'all' || x.cat === cat || x.cat === 'general';
    const out = [];
    for (let i = first; i <= last; i++) {
      out.push({ i, y: Math.floor(i / 12), m: i % 12, items: sorted.filter(x => monthIndex(x.date) === i && show(x)) });
    }
    return out;
  }, [sorted, cat]);

  // Garis peta terisi mengikuti scroll
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', 1); return; }
    let raf = 0;
    const upd = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [cat]);

  useEffect(() => {
    try { if (document.documentElement.classList.contains('aos-ready')) AOS.refreshHard(); } catch (e) {}
  }, [cat]);

  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 py-14">
      <h2 className="text-3xl sm:text-4xl font-extrabold" data-aos="fade-up"><L k="expTitle" /></h2>
      <p className="muted mt-2" data-aos="fade-up" data-aos-delay="100"><L k="expSub" /></p>

      {/* ===== Ringkasan ===== */}
      <div className="exp-sum" data-aos="fade-up">
        <div>
          <p className="exp-eyebrow"><L k="expSince" /> <L t={dateLabel(EXP_START)} /></p>
          <div className="exp-big">
            <Count to={months} />
            <span><L k={months === 1 ? 'expUnit1' : 'expUnit'} /></span>
          </div>
          <p className="muted mt-4 max-w-sm leading-relaxed"><L k="expSumDesc" /></p>
          <dl className="exp-facts">
            <div><dt><L k="expFactDone" /></dt><dd><Count to={doneN} /></dd></div>
            <div><dt><L k="expFactDoing" /></dt><dd><Count to={doingN} /></dd></div>
            <div><dt><L k="expFactCats" /></dt><dd><Count to={activeCats} /></dd></div>
          </dl>
        </div>

        <ul className="ledger">
          {catKeys.map(k => {
            const list = live(k);
            return (
              <li key={k}>
                <div className="lg-head">
                  <i className="mk" data-cat={k} />
                  <span className="lg-name"><L t={CATS[k]} /></span>
                  <span className="lg-n">{list.length}</span>
                </div>
                <div className="lg-bar"><i style={{ '--w': `${(list.length / max) * 100}%` }} /></div>
                <p className="lg-items">
                  {list.length
                    ? list.map((x, j) => <span key={j} className={`lg-p ${x.status}`}><T v={x.title} /></span>)
                    : <span className="lg-empty"><L k="expSoon" /></span>}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ===== Peta perjalanan ===== */}
      <div className="rmap-wrap">
        <h3 className="text-2xl font-extrabold" data-aos="fade-up"><L k="expMapTitle" /></h3>
        <p className="muted mt-1 text-sm" data-aos="fade-up"><L k="expMapSub" /></p>

        <div className="rm-filter" role="group" aria-label="Filter kategori / Category filter">
          <button className="rm-chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}><L k="all" /></button>
          {catKeys.map(k => (
            <button key={k} className="rm-chip" data-cat={k} aria-pressed={cat === k} onClick={() => setCat(k)}>
              <i className="mk" data-cat={k} /><L t={CATS[k]} />
            </button>
          ))}
        </div>

        <ol className="rmap" ref={mapRef}>
          {rows.map((r, idx) => {
            const newYear = idx === 0 || r.m === 0;
            return (
              <li key={r.i}>
                {newYear && (
                  <div className="rm-yr">
                    <b>{r.y}</b><i /><span />
                  </div>
                )}
                <div className={`rm-row ${r.items.length ? 'has' : ''}`}>
                  <span className="rm-m"><L t={{ id: MONTHS.id[r.m], en: MONTHS.en[r.m] }} /></span>
                  <span className="rm-node">{!r.items.length && <i className="rm-tick" />}</span>
                  <div className="rm-items">
                    {r.items.map((x, k) => {
                      const sub = SUBS[x.cat]?.[x.sub];
                      const [stCls, stKey] = STATUS[x.status] || STATUS.done;
                      return (
                        <article key={k} className={`rm-item ${x.status}`} data-cat={x.cat} data-aos="fade-up">
                          <i className="mk" data-cat={x.cat} />
                          <div className="rm-card">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="rm-title"><T v={x.title} /></h4>
                              <span className={`st ${stCls}`}><L k={stKey} /></span>
                            </div>
                            <time className="rm-date"><L t={dateLabel(x.date)} /></time>
                            {x.desc && <p className="muted text-sm mt-2 leading-relaxed"><L t={x.desc} /></p>}
                            {x.cat !== 'general' && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                <span className="tag"><L t={CATS[x.cat]} /></span>
                                {sub && <span className="tag tag-sub"><L t={sub} /></span>}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ===== Peran ===== */}
      <h3 className="text-2xl font-extrabold mt-20" data-aos="fade-up"><L k="expRoles" /></h3>
      <ol className="timeline" data-aos="fade">
        {EXPERIENCE.map((e, i) => {
          const period = e.start ? dateSpan(e.start, e.end) : e.period;
          return (
            <li key={i} className="tl-item" data-aos="fade-left" data-aos-delay={i * 120}>
              <span className={`tl-dot ${e.current ? 'now' : ''}`} />
              <div className="tl-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-extrabold text-lg"><L t={e.role} /></h3>
                  {period && <span className="tag"><L t={period} /></span>}
                </div>
                <p className="accent text-sm font-semibold mt-1">{e.org}</p>
                <p className="muted mt-2 leading-relaxed text-sm"><L t={e.desc} /></p>
                {e.points?.length > 0 && (
                  <ul className="tl-points">
                    {e.points.map((p, k) => <li key={k}><L t={p} /></li>)}
                  </ul>
                )}
                {e.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

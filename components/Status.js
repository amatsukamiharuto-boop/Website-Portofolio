import L from './L';
import { CONFIG } from '../data/site';

const LABEL = { done: 'stDone', doing: 'stDoing' };

export default function Status() {
  const nw = CONFIG.nowWorking;
  const ch = nw.chapters || [];
  const overall = ch.length ? Math.round(ch.reduce((s, c) => s + c.progress, 0) / ch.length) : nw.progress || 0;
  const done = ch.filter(c => c.progress >= 100).length;

  return (
    <section id="status" className="max-w-6xl mx-auto px-5 py-10">
      <aside className="surface rounded-2xl p-7 sm:p-9" aria-label="Status proyek aktif / Active project status" data-aos="fade-up">
        <div className="flex items-center justify-between mb-4">
          <span className="muted text-sm"><L k="nowLabel" /></span>
          <span className="flex items-center gap-2 text-sm font-semibold"><span className="pulse-dot" /><L k="active" /></span>
        </div>
        <h2 className="text-3xl font-extrabold">{nw.title}</h2>
        <p className="muted mt-2 leading-relaxed max-w-3xl"><L t={nw.desc} /></p>

        {/* Progres keseluruhan */}
        <div className="flex items-end justify-between text-sm mt-7 mb-2">
          <span className="muted"><L k="overall" />{ch.length > 0 && <> · {done}/{ch.length} <L k="chaptersDone" /></>}</span>
          <span className="text-2xl font-extrabold accent">{overall}%</span>
        </div>
        <div className="quest-bar"><div className="quest-fill" style={{ '--w': `${overall}%` }} /></div>

        {/* Progres per chapter. Chapter 0% = terkunci (digembok dan diburamkan) */}
        {ch.length > 0 && (
          <ul className="grid gap-3 mt-6">
            {ch.map((c, i) => {
              if (c.progress <= 0) {
                return (
                  <li key={c.name} className="chapter locked">
                    <div className="locked-blur" aria-hidden="true">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="font-semibold text-sm">{c.name}</span>
                        <span className="text-sm font-semibold">0%</span>
                      </div>
                      <div className="quest-bar"><div className="quest-fill" style={{ '--w': '0%' }} /></div>
                    </div>
                    <div className="lock-overlay">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="4" y="11" width="16" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                      <span><L k="stLocked" /></span>
                    </div>
                  </li>
                );
              }
              const s = c.progress >= 100 ? 'done' : 'doing';
              return (
                <li key={c.name} className="chapter">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-semibold text-sm">
                      {c.name}{c.title && <span className="muted font-normal"> · <L t={c.title} /></span>}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className={`st st-${s}`}><L k={LABEL[s]} /></span>
                      <span className="text-sm font-semibold w-10 text-right">{c.progress}%</span>
                    </span>
                  </div>
                  <div className="quest-bar"><div className="quest-fill" style={{ '--w': `${c.progress}%`, '--d': `${0.4 + i * 0.15}s` }} /></div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mt-6">
          {(nw.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </aside>
    </section>
  );
}

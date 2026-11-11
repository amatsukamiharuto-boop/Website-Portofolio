import { CONFIG } from '../data/site';

export default function Status() {
  const nw = CONFIG.nowWorking;
  return (
    <section id="status" className="max-w-6xl mx-auto px-5 py-10">
      <aside className="surface rounded-2xl p-7 sm:p-9" aria-label="Status proyek aktif" data-aos="fade-up">
        <div className="flex items-center justify-between mb-4">
          <span className="muted text-sm">Sedang dikerjakan</span>
          <span className="flex items-center gap-2 text-sm font-semibold"><span className="pulse-dot" />Aktif</span>
        </div>
        <h2 className="text-3xl font-extrabold">{nw.title}</h2>
        <p className="muted mt-2 leading-relaxed max-w-3xl">{nw.desc}</p>
        <div className="flex justify-between text-sm mt-6 mb-2">
          <span className="muted">Progres</span>
          <span className="font-semibold accent">{nw.progress}%</span>
        </div>
        <div className="quest-bar"><div className="quest-fill" style={{ '--w': `${nw.progress}%` }} /></div>
        <div className="flex flex-wrap gap-2 mt-5">
          {(nw.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </aside>
    </section>
  );
}

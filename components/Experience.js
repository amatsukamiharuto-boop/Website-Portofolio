import L from './L';
import { EXPERIENCE } from '../data/site';

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 py-14">
      <h2 className="text-3xl sm:text-4xl font-extrabold" data-aos="fade-up"><L k="expTitle" /></h2>
      <p className="muted mt-2" data-aos="fade-up" data-aos-delay="100"><L k="expSub" /></p>

      <ol className="timeline mt-10" data-aos="fade">
        {EXPERIENCE.map((e, i) => (
          <li key={i} className="tl-item" data-aos="fade-left" data-aos-delay={i * 120}>
            <span className={`tl-dot ${e.current ? 'now' : ''}`} />
            <div className="tl-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-extrabold text-lg"><L t={e.role} /></h3>
                {e.period && <span className="tag"><L t={e.period} /></span>}
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
        ))}
      </ol>
    </section>
  );
}

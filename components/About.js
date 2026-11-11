import AboutCard from './AboutCard';
import L from './L';
import { CONFIG, fmt } from '../data/site';

export default function About() {
  const vars = { founder: CONFIG.founder, studio: CONFIG.studio };
  const { paragraphs, focus } = CONFIG.about;
  return (
    <section id="tentang" className="max-w-6xl mx-auto px-5 py-14">
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-2 flex justify-center" data-aos="fade-right">
          <AboutCard />
        </div>
        <div className="md:col-span-3" data-aos="fade-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold"><L k="aboutTitle" /></h2>
          <p className="mt-4 font-semibold"><L k="hello" /> <span className="accent">{CONFIG.founder}</span></p>
          {paragraphs.map((p, i) => (
            <p key={i} className="muted mt-3 leading-relaxed"><L t={fmt(p, vars)} /></p>
          ))}
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {focus.map((f, i) => (
              <div key={i} className="focus-card">
                <span className="text-2xl" aria-hidden="true">{f.icon}</span>
                <h3 className="font-extrabold mt-2 text-base"><L t={f.title} /></h3>
                <p className="muted text-sm mt-1"><L t={f.desc} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

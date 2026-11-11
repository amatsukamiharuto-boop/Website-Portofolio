import AboutCard from './AboutCard';
import { CONFIG } from '../data/site';

export default function About() {
  return (
    <section id="tentang" className="max-w-6xl mx-auto px-5 py-14">
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-2 flex justify-center" data-aos="fade-right">
          <AboutCard />
        </div>
        <div className="md:col-span-3" data-aos="fade-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold">About Me</h2>
          <p className="mt-4 font-semibold">Halo, saya <span className="accent">{CONFIG.founder}</span></p>
          <p className="muted mt-3 leading-relaxed">{CONFIG.about.replace('{studio}', CONFIG.studio)}</p>
          <p className="muted mt-3 text-sm">Founder {CONFIG.studio}</p>
        </div>
      </div>
    </section>
  );
}

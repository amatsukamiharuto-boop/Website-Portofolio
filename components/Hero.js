import { CONFIG, asset } from '../data/site';

export default function Hero() {
  return (
    <section id="home" className="max-w-6xl mx-auto px-5 pt-14 pb-12 flex flex-col items-center text-center">
      <img src={asset(CONFIG.logo)} alt={`Logo ${CONFIG.studio}`} className="logo-hero w-44 sm:w-56" width="224" height="224" data-aos="zoom-in" />
      <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] max-w-4xl mt-8" data-aos="fade-up" data-aos-delay="150">
        Membangun game, tools, dan aset yang benar-benar dipakai.
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3" data-aos="fade-up" data-aos-delay="300">
        <a href="#projects" className="btn btn-primary">Lihat proyek</a>
        <a href="#whatsapp" className="btn btn-ghost">Hubungi saya</a>
      </div>
    </section>
  );
}

import StackIcon from './StackIcon';
import { STACK1, STACK2, asset } from '../data/site';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

function Row({ list, dir, label }) {
  // Ulangi daftar sampai cukup lebar, lalu gandakan agar loop -50% mulus
  const reps = Math.max(2, Math.ceil(2800 / (Math.max(list.length, 1) * 92)));
  const items = Array.from({ length: reps * 2 }, () => list).flat();
  return (
    <div className={`marquee ${dir === 'right' ? 'mt-2' : ''}`} aria-label={label} data-aos="fade-up" data-aos-delay={dir === 'right' ? 150 : 0}>
      <div className={`track ${dir}`}>
        {items.map(([folder, file, name, mono], i) => (
          <StackIcon key={i} name={name} mono={!!mono} src={folder === 'img' ? asset(file) : `${DEVICON}${folder}/${file}.svg`} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="py-12">
      <h2 className="max-w-6xl mx-auto px-5 text-2xl sm:text-3xl font-extrabold mb-6" data-aos="fade-up">Tech stack</h2>
      <Row list={STACK1} dir="left" label="Bahasa pemrograman dan tools game & aset" />
      <Row list={STACK2} dir="right" label="Bahasa pemrograman dan tools aplikasi" />
    </section>
  );
}

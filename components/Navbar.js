import ThemeToggle from './ThemeToggle';
import { CONFIG } from '../data/site';

const LINKS = [
  ['#tentang', 'About'],
  ['#stack', 'Tech Stack'],
  ['#projects', 'Project'],
  ['#whatsapp', 'Contact']
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur" style={{ background: 'color-mix(in srgb,var(--bg) 85%,transparent)', borderBottom: '1px solid var(--line)' }}>
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#home" className="brand font-extrabold text-xl">{CONFIG.studio}</a>
        <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="navlink hidden md:block">{label}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

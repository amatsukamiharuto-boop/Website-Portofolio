'use client';
import { useEffect, useRef, useState } from 'react';
import L from './L';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';
import { CONFIG } from '../data/site';

const LINKS = [
  ['#tentang', 'navAbout'],
  ['#experience', 'navExperience'],
  ['#status', 'navStatus'],
  ['#stack', 'navStack'],
  ['#projects', 'navProjects'],
  ['#whatsapp', 'navWhatsapp'],
  ['#email', 'navEmail']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  // Tutup dropdown saat klik di luar atau menekan Esc
  useEffect(() => {
    if (!open) return;
    const onDown = e => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur" style={{ background: 'color-mix(in srgb,var(--bg) 85%,transparent)', borderBottom: '1px solid var(--line)' }}>
      <nav ref={box} className="relative max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#home" className="brand font-extrabold text-xl" onClick={() => setOpen(false)}>{CONFIG.studio}</a>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <button className="menubtn" aria-expanded={open} aria-controls="site-menu" aria-label="Menu" onClick={() => setOpen(o => !o)}>
            <span className="burger" data-open={open}><i /><i /><i /></span>
            <span className="hidden sm:inline text-sm font-medium"><L k="menu" /></span>
          </button>
        </div>

        <div id="site-menu" className={`menu-panel surface ${open ? 'open' : ''}`}>
          <ul>
            {LINKS.map(([href, key], i) => (
              <li key={href}>
                <a href={href} className="menu-item" style={{ '--i': i }} onClick={() => setOpen(false)}>
                  <L k={key} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

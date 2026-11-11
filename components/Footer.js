import Icon from './Icon';
import { CONFIG } from '../data/site';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="muted text-sm">© {new Date().getFullYear()} {CONFIG.studio} · {CONFIG.founder}</p>
        <div className="flex gap-2">
          {CONFIG.socials.map(s => (
            <a key={s.slug} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} className="iconbtn">
              <Icon slug={s.slug} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

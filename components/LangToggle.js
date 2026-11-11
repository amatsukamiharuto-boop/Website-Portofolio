'use client';
import { useLang } from './LangProvider';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button className="langbtn" onClick={() => setLang(lang === 'id' ? 'en' : 'id')} aria-label="Bahasa / Language" title="Bahasa / Language">
      <span className="lg lg-id">ID</span>
      <span className="lg lg-en">EN</span>
    </button>
  );
}

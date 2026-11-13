import 'aos/dist/aos.css';
import './globals.css';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import ThemeProvider from '../components/ThemeProvider';
import LangProvider from '../components/LangProvider';
import Intro from '../components/Intro';
import { CONFIG, INTRO, asset } from '../data/site';

const head = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-head', display: 'swap' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: CONFIG.studio,
  description: 'Portofolio / Portfolio — game, tools, dan aset game / game development, tools, and game assets.',
  icons: { icon: asset(CONFIG.logo) }
};

// Dijalankan sebelum halaman tampil: terapkan tema, bahasa, dan status animasi pembuka (tanpa kedip).
// Bahasa awal: pilihan tersimpan, jika belum ada -> ikuti bahasa browser (id -> Indonesia, lainnya -> English).
const prefsScript = `try{var d=document.documentElement;if(localStorage.getItem('theme')==='light')d.classList.add('light');var l=localStorage.getItem('lang');if(!l)l=(navigator.language||'id').toLowerCase().indexOf('id')===0?'id':'en';d.dataset.lang=l;d.lang=l}catch(e){}`;
const introScript = INTRO.enabled
  ? `try{var d=document.documentElement;var seen=false;try{seen=${INTRO.oncePerSession}&&sessionStorage.getItem('introSeen')==='1'}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!seen)d.dataset.intro='pending'}catch(e){}`
  : '';

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript + introScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LangProvider>
            <Intro />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

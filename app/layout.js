import 'aos/dist/aos.css';
import './globals.css';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import ThemeProvider from '../components/ThemeProvider';
import LangProvider from '../components/LangProvider';
import { CONFIG, asset } from '../data/site';

const head = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-head', display: 'swap' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: CONFIG.studio,
  description: 'Portofolio / Portfolio — game, tools, dan aset game / game development, tools, and game assets.',
  icons: { icon: asset(CONFIG.logo) }
};

// Dijalankan sebelum halaman tampil: terapkan tema & bahasa tersimpan (tanpa kedip).
// Bahasa awal: pilihan tersimpan, jika belum ada -> ikuti bahasa browser (id -> Indonesia, lainnya -> English).
const initScript = `try{var d=document.documentElement;if(localStorage.getItem('theme')==='light')d.classList.add('light');var l=localStorage.getItem('lang');if(!l)l=(navigator.language||'id').toLowerCase().indexOf('id')===0?'id':'en';d.dataset.lang=l;d.lang=l}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

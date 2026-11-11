import 'aos/dist/aos.css';
import './globals.css';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import ThemeProvider from '../components/ThemeProvider';
import { CONFIG, asset } from '../data/site';

const head = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-head', display: 'swap' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: CONFIG.studio,
  description: 'Portofolio studio indie: game, tools, dan aset game.',
  icons: { icon: asset(CONFIG.logo) }
};

// Terapkan tema tersimpan sebelum halaman tampil (mencegah kedip)
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

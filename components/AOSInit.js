'use client';
import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSInit() {
  useEffect(() => {
    const d = document.documentElement;
    const start = () => {
      AOS.init({
        duration: 700, easing: 'ease-out-cubic', once: true, offset: 60,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });
      d.classList.add('aos-ready');
    };
    // Jika animasi pembuka sedang tampil, tunggu sampai selesai agar animasi section terlihat
    if (d.dataset.intro === 'pending') {
      window.addEventListener('intro:done', start, { once: true });
      return () => window.removeEventListener('intro:done', start);
    }
    start();
  }, []);
  return null;
}

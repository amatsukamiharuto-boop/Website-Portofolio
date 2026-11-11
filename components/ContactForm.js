'use client';
import { useState } from 'react';
import L from './L';
import { useLang } from './LangProvider';
import { CONFIG } from '../data/site';

// Membuka aplikasi email. Untuk kirim langsung tanpa membuka email, ganti dengan Formspree/EmailJS.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { lang } = useLang();

  const submit = e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const n = f.get('nama'), em = f.get('email'), m = f.get('pesan');
    const subject = (lang === 'en' ? 'Message from ' : 'Pesan dari ') + n;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(m + '\n\n' + n + ' (' + em + ')')}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="surface rounded-2xl p-6 space-y-4" data-aos="fade-left">
      <div><label htmlFor="fn" className="text-sm font-medium"><L k="fName" /></label><input id="fn" name="nama" required autoComplete="name" /></div>
      <div><label htmlFor="fe" className="text-sm font-medium"><L k="fEmail" /></label><input id="fe" name="email" type="email" required autoComplete="email" /></div>
      <div><label htmlFor="fm" className="text-sm font-medium"><L k="fMsg" /></label><textarea id="fm" name="pesan" rows={4} required /></div>
      <button className="btn btn-primary w-full justify-center" type="submit"><L k="fSend" /></button>
      {sent && <p className="text-sm accent" role="status"><L k="fSent" /></p>}
    </form>
  );
}

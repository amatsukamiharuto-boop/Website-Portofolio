'use client';
import { useState } from 'react';
import { CONFIG } from '../data/site';

// Membuka aplikasi email. Untuk kirim langsung tanpa membuka email, ganti dengan Formspree/EmailJS.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const n = f.get('nama'), em = f.get('email'), m = f.get('pesan');
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Pesan dari ' + n)}&body=${encodeURIComponent(m + '\n\n' + n + ' (' + em + ')')}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="surface rounded-2xl p-6 space-y-4" data-aos="fade-left">
      <div><label htmlFor="fn" className="text-sm font-medium">Nama</label><input id="fn" name="nama" required autoComplete="name" /></div>
      <div><label htmlFor="fe" className="text-sm font-medium">Email</label><input id="fe" name="email" type="email" required autoComplete="email" /></div>
      <div><label htmlFor="fm" className="text-sm font-medium">Pesan</label><textarea id="fm" name="pesan" rows={4} required /></div>
      <button className="btn btn-primary w-full justify-center" type="submit">Kirim pesan</button>
      {sent && <p className="text-sm accent" role="status">Aplikasi email Anda akan terbuka untuk mengirim pesan.</p>}
    </form>
  );
}

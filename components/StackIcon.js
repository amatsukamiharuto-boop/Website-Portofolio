'use client';
import { useState } from 'react';

// Satu kotak ikon. Jika gambar gagal dimuat, tampilkan nama sebagai gantinya.
export default function StackIcon({ src, name, mono }) {
  const [bad, setBad] = useState(false);
  return (
    <div className="chip surface" title={name}>
      {bad ? (
        <span className="text-xs font-semibold text-center px-1">{name}</span>
      ) : (
        <img className={mono ? 'mono' : ''} src={src} alt={name} width="42" height="42" decoding="async" onError={() => setBad(true)} />
      )}
    </div>
  );
}

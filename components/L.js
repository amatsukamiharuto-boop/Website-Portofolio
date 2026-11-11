import { UI } from '../data/i18n';

// Menampilkan teks dua bahasa; yang tampil mengikuti <html data-lang="id|en"> (diatur lewat CSS).
// Pemakaian: <L k="heroTitle" />  atau  <L t={{ id: '...', en: '...' }} />
export default function L({ t, k }) {
  const v = t || UI[k];
  if (!v) return null;
  return (
    <>
      <span className="t-id" lang="id">{v.id}</span>
      <span className="t-en" lang="en">{v.en}</span>
    </>
  );
}

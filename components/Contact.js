import ContactForm from './ContactForm';
import Icon from './Icon';
import { CONFIG } from '../data/site';

export default function Contact() {
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.waMessage || '')}`;
  return (
    <>
      {/* WhatsApp */}
      <section id="whatsapp" className="max-w-6xl mx-auto px-5 py-8">
        <div className="surface rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6" data-aos="fade-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Chat lewat WhatsApp</h2>
            <p className="muted mt-2 max-w-lg">Jalur tercepat untuk diskusi proyek, kolaborasi, atau pertanyaan singkat.</p>
          </div>
          <a className="btn btn-wa justify-center" href={wa} target="_blank" rel="noopener noreferrer"><Icon slug="whatsapp" />Chat sekarang</a>
        </div>
      </section>

      {/* Email */}
      <section id="email" className="max-w-6xl mx-auto px-5 py-8 pb-16 grid lg:grid-cols-2 gap-10">
        <div data-aos="fade-right">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Kirim email</h2>
          <p className="muted mt-3 max-w-md leading-relaxed">Untuk pesan yang lebih panjang atau butuh lampiran, tulis lewat form ini atau kirim langsung ke:</p>
          <a className="inline-block mt-4 font-semibold accent underline underline-offset-4" href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
        </div>
        <ContactForm />
      </section>
    </>
  );
}

// Ikon monokrom dari simple-icons (https://simpleicons.org), diwarnai mengikuti warna teks
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/';

export default function Icon({ slug }) {
  return <span className="ico" aria-hidden="true" style={{ '--i': `url(${SI}${slug}.svg)` }} />;
}

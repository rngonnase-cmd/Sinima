import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <p className="rose-shimmer mb-4"
          style={{ fontFamily: 'var(--f-display)', fontSize: '7rem', fontWeight: 900, lineHeight: 1, opacity: 0.2 }}>
          404
        </p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
          Film not found
        </h2>
        <p style={{ color: 'var(--text-sec)', marginBottom: '2rem' }}>
          The reel you are looking for seems to have gone missing.
        </p>
        <Link href="/" className="px-8 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'var(--rose)', color: '#fff' }}>
          Back to Discover
        </Link>
      </div>
    </div>
  );
}

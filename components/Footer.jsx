export default function Footer() {
  return (
    <footer className="mt-20 py-10 border-t" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <style>{`
        .footer-link { color: var(--text-mute); transition: color 0.2s; }
        .footer-link:hover { color: var(--text); }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>
            Sinim<span style={{ color: 'var(--rose)' }}>á</span>
          </span>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-mute)', marginTop: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            A Curated Cinema Experience
          </p>
        </div>
        <p style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--text-mute)' }}>
          © {new Date().getFullYear()} Sinimá · Built with Next.js &amp; React
        </p>
        <div className="flex gap-5">
          {['About', 'Privacy', 'Contact'].map(l => (
            <a key={l} href="#" className="footer-link"
              style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--f-body)' }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

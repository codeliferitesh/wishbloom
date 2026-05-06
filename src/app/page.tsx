import Link from 'next/link';

/**
 * Landing page — introduces WishBloom and funnels visitors to sign up or log in.
 * Rendered as a static Server Component (no auth needed).
 */
export default function HomePage() {
  return (
    <main className="min-h-screen page-gradient bg-noise flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <span className="font-display text-2xl font-bold text-gradient">
          WishBloom
        </span>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="btn-ghost text-sm px-4 py-2">
            Sign In
          </Link>
          <Link href="/auth/signup" className="btn-primary text-sm px-4 py-2">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Decorative petals */}
        <div className="relative mb-8">
          <div className="absolute -top-6 -left-10 text-5xl opacity-40 animate-float">🌸</div>
          <div className="absolute -top-2 -right-10 text-4xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>🌺</div>
          <div className="text-7xl animate-float" style={{ animationDelay: '0.5s' }}>🎂</div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-[--color-ink] leading-tight mb-6">
          Make Every Birthday{' '}
          <span className="text-gradient block">Unforgettable</span>
        </h1>

        <p className="text-[--color-ink-soft] text-lg md:text-xl max-w-xl leading-relaxed mb-10">
          Create beautiful, personalised birthday pages and share them with a single link.
          No accounts needed to view — just pure joy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/auth/signup" className="btn-primary px-8 py-4 text-base shadow-petal">
            Create a Birthday Page ✨
          </Link>
          <Link href="/auth/login" className="btn-ghost px-8 py-4 text-base">
            I have an account
          </Link>
        </div>

        {/* Social proof / feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {[
            { icon: '🔗', text: 'Shareable links' },
            { icon: '🎊', text: 'Confetti celebration' },
            { icon: '📱', text: 'Mobile-friendly' },
            { icon: '⚡', text: 'Instant setup' },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 bg-white/70 backdrop-blur border border-pink-100 rounded-full px-4 py-2 text-sm text-[--color-ink-soft] shadow-sm"
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-[--color-ink-soft] text-xs opacity-60">
        Made with 💕 — WishBloom
      </footer>
    </main>
  );
}

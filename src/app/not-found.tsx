import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen page-gradient flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl mb-6">🌸</p>
      <h1 className="font-display text-3xl font-bold text-[--color-ink] mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-[--color-ink-soft] text-sm mb-8">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link href="/" className="btn-primary px-6 py-3">
        Return Home →
      </Link>
    </div>
  );
}

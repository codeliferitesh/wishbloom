import Link from 'next/link';

/**
 * Custom 404 for birthday pages that don't exist.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen page-gradient flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl mb-6">🎈</p>
      <h1 className="font-display text-3xl font-bold text-[--color-ink] mb-3">
        Page Not Found
      </h1>
      <p className="text-[--color-ink-soft] text-sm mb-8 max-w-sm">
        This birthday page doesn&apos;t exist or may have been removed. Double-check your link!
      </p>
      <Link href="/" className="btn-primary px-6 py-3">
        Go to WishBloom →
      </Link>
    </div>
  );
}

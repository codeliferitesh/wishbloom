import Link from 'next/link';

/**
 * Shared layout for auth pages (login + signup).
 * Provides a centred card with brand header.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen page-gradient bg-noise flex flex-col items-center justify-center px-4">
      {/* Brand mark */}
      <Link
        href="/"
        className="font-display text-3xl font-bold text-gradient mb-8 hover:opacity-80 transition-opacity"
      >
        WishBloom
      </Link>

      {/* Auth card */}
      <div className="card w-full max-w-md p-8 shadow-petal">{children}</div>

      {/* Decorative blobs */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-48 h-48 bg-rose-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  );
}

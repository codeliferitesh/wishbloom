'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FirebaseError } from 'firebase/app';

/**
 * Login page — email/password sign in via Firebase Auth.
 * Redirects to /dashboard on success.
 */
export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err.code));
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-[--color-ink] mb-1">
        Welcome back
      </h1>
      <p className="text-[--color-ink-soft] text-sm mb-7">
        Sign in to manage your birthday pages.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[--color-ink-soft] uppercase tracking-wide mb-1.5">
            Email
          </label>
          <input
            type="email"
            className="input-field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[--color-ink-soft] uppercase tracking-wide mb-1.5">
            Password
          </label>
          <input
            type="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 mt-2"
        >
          {loading ? (
            <>
              <Spinner />
              Signing in…
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-[--color-ink-soft] mt-6">
        New to WishBloom?{' '}
        <Link href="/auth/signup" className="text-[--color-rose] font-semibold hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/**
 * Maps Firebase error codes to user-friendly messages.
 */
function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return 'Sign in failed. Please try again.';
  }
}

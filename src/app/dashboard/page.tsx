'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserBirthdays } from '@/services/birthday';
import { CreateBirthdayForm } from '@/components/CreateBirthdayForm';
import { BirthdayCard } from '@/components/BirthdayCard';
import { NewPageBanner } from '@/components/NewPageBanner';
import type { Birthday } from '@/types';

/**
 * Dashboard — protected route.
 * Redirects unauthenticated users to /auth/login.
 * Shows form to create birthday pages and list of existing ones.
 */
export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [newBirthday, setNewBirthday] = useState<Birthday | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth/login');
    }
  }, [user, authLoading, router]);

  // Load user's birthday pages
  useEffect(() => {
    if (!user) return;

    setListLoading(true);
    setListError(null);

    getUserBirthdays(user.uid)
      .then((data) => {
        // Sort client-side by createdAt desc
        const sorted = [...data].sort((a, b) => {
          const aTime = a.createdAt?.toDate?.()?.getTime() ?? 0;
          const bTime = b.createdAt?.toDate?.()?.getTime() ?? 0;
          return bTime - aTime;
        });
        setBirthdays(sorted);
      })
      .catch(() => setListError('Failed to load your pages. Please refresh.'))
      .finally(() => setListLoading(false));
  }, [user]);

  function handleBirthdayCreated(birthday: Birthday) {
    setBirthdays((prev) => [birthday, ...prev]);
    setNewBirthday(birthday);
  }

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  // Show nothing while resolving auth state
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen page-gradient bg-noise">
      {/* Top nav */}
      <nav className="border-b border-pink-100 bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-gradient">WishBloom</span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-[--color-ink-soft] opacity-70 truncate max-w-[180px]">
              {user.email}
            </span>
            <button onClick={handleSignOut} className="btn-ghost text-sm px-4 py-2">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Page header */}
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[--color-ink]">
            Your Birthday Pages 🎂
          </h1>
          <p className="text-[--color-ink-soft] mt-1 text-sm">
            Create a page, share the link — it&apos;s that simple.
          </p>
        </div>

        {/* Success banner */}
        {newBirthday && (
          <NewPageBanner
            id={newBirthday.id}
            name={newBirthday.name}
            onDismiss={() => setNewBirthday(null)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Create form — sidebar on desktop */}
          <aside className="lg:col-span-2">
            <div className="card p-6 sticky top-24 shadow-petal">
              <h2 className="font-display text-xl font-bold text-[--color-ink] mb-1">
                Create New Page
              </h2>
              <p className="text-xs text-[--color-ink-soft] opacity-70 mb-5">
                Each page gets a unique, shareable link.
              </p>
              <CreateBirthdayForm userId={user.uid} onCreated={handleBirthdayCreated} />
            </div>
          </aside>

          {/* Birthday pages list */}
          <section className="lg:col-span-3 space-y-4">
            <h2 className="font-semibold text-[--color-ink] text-sm uppercase tracking-wide">
              Created Pages ({birthdays.length})
            </h2>

            {listLoading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            )}

            {listError && (
              <div className="card p-6 text-center text-red-500 text-sm border-red-100">
                {listError}
              </div>
            )}

            {!listLoading && !listError && birthdays.length === 0 && (
              <div className="card p-10 text-center">
                <p className="text-4xl mb-3">🌸</p>
                <p className="text-[--color-ink-soft] text-sm">
                  No pages yet — create your first one!
                </p>
              </div>
            )}

            {!listLoading &&
              birthdays.map((b, i) => (
                <div
                  key={b.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
                >
                  <BirthdayCard birthday={b} />
                </div>
              ))}
          </section>
        </div>
      </main>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3 text-[--color-ink-soft]">
      <svg className="animate-spin h-8 w-8 text-[--color-rose]" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="text-sm">Loading…</span>
    </div>
  );
}

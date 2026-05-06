'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useConfetti } from '@/components/useConfetti';
import { getBirthdayById } from '@/services/birthday';
import type { Birthday } from '@/types';

export function BirthdayView({ id }: { id: string }) {
  const [birthday, setBirthday] = useState<Birthday | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getBirthdayById(id)
      .then((data) => {
        if (!data) setNotFound(true);
        else setBirthday(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <svg className="animate-spin h-10 w-10 text-pink-400" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen page-gradient flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl mb-6">🎈</p>
      <h1 className="font-display text-3xl font-bold text-[--color-ink] mb-3">Page Not Found</h1>
      <p className="text-[--color-ink-soft] text-sm mb-8">This birthday page doesn't exist or may have been removed.</p>
      <Link href="/" className="btn-primary px-6 py-3">Go to WishBloom →</Link>
    </div>
  );

  return <BirthdayContent birthday={birthday!} />;
}

function BirthdayContent({ birthday }: { birthday: Birthday }) {
  const [visible, setVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  useConfetti();

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setMessageVisible(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #FFE4EC 0%, #FFF0F3 40%, #FFFBFC 100%)' }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute rounded-full blur-3xl opacity-30"
          style={{ width: 400, height: 400, top: '-10%', left: '-10%', background: 'var(--color-blush)', animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute rounded-full blur-3xl opacity-20"
          style={{ width: 300, height: 300, bottom: '5%', right: '-5%', background: 'var(--color-gold-light)', animation: 'float 8s ease-in-out infinite', animationDelay: '2s' }} />
      </div>

      <article
        className="relative z-10 w-full max-w-xl text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="flex justify-center gap-4 mb-6 text-3xl">
          {['🎈','🎂','🎊','🎁','🎈'].map((e, i) => (
            <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
          ))}
        </div>

        <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-2" style={{ color: 'var(--color-ink)' }}>
          Happy Birthday,
        </h1>
        <h2 className="font-display text-5xl sm:text-6xl font-bold text-gradient leading-tight mb-8">
          {birthday.name}!
        </h2>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
          <span className="text-2xl">🌸</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200" />
        </div>

        <div
          className="card p-8 shadow-petal text-left mb-8"
          style={{
            opacity: messageVisible ? 1 : 0,
            transform: messageVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="text-[--color-ink-soft] leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {birthday.message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/auth/signup" className="btn-primary px-6 py-3 shadow-petal">
            Create your own 🎂
          </Link>
          <button onClick={() => window.location.reload()} className="btn-ghost px-6 py-3">
            🎊 Celebrate again!
          </button>
        </div>

        <div className="mt-10 text-xs text-[--color-ink-soft] opacity-50">
          Made with 💕 on{' '}
          <Link href="/" className="hover:opacity-80 underline">WishBloom</Link>
        </div>
      </article>
    </div>
  );
}
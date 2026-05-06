'use client';

import { useState } from 'react';
import type { Birthday } from '@/types';

interface BirthdayCardProps {
  birthday: Birthday;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

/**
 * Displays a single birthday page entry in the dashboard list.
 * Shows metadata and a copy-to-clipboard button for the shareable link.
 */
export function BirthdayCard({ birthday }: BirthdayCardProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${APP_URL}/birthday/${birthday.id}`;
  const createdDate = birthday.createdAt?.toDate
    ? birthday.createdAt.toDate().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Just now';

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select input manually
      const input = document.getElementById(`url-${birthday.id}`) as HTMLInputElement;
      input?.select();
    }
  }

  return (
    <div className="card p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎂</span>
            <h3 className="font-display font-bold text-[--color-ink] text-lg leading-tight">
              {birthday.name}
            </h3>
          </div>
          <p className="text-xs text-[--color-ink-soft] opacity-60">{createdDate}</p>
        </div>

        {/* View page link */}
        <a
          href={`/birthday/${birthday.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[--color-rose] border border-pink-200 rounded-lg px-3 py-1.5 hover:bg-pink-50 transition-colors whitespace-nowrap flex-shrink-0"
        >
          View ↗
        </a>
      </div>

      {/* Shareable link row */}
      <div className="flex items-center gap-2 bg-[--color-petal] rounded-xl px-3 py-2">
        <input
          id={`url-${birthday.id}`}
          type="text"
          readOnly
          value={shareUrl}
          className="flex-1 bg-transparent text-xs text-[--color-ink-soft] outline-none truncate font-mono"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          onClick={copyLink}
          className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: copied ? 'var(--color-rose)' : 'white',
            color: copied ? 'white' : 'var(--color-rose)',
            border: `1px solid ${copied ? 'var(--color-rose)' : 'var(--color-blush)'}`,
          }}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface NewPageBannerProps {
  id: string;
  name: string;
  onDismiss: () => void;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

/**
 * Celebratory banner shown immediately after a new birthday page is created.
 * Highlights the shareable link with a prominent copy button.
 */
export function NewPageBanner({ id, name, onDismiss }: NewPageBannerProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${APP_URL}/birthday/${id}`;

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="rounded-2xl border-2 border-[--color-rose] bg-gradient-to-br from-pink-50 to-rose-50 p-6 shadow-petal animate-scale-in">
      {/* Dismiss */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <p className="font-display font-bold text-[--color-rose] text-lg">
            Birthday page created!
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-pink-300 hover:text-pink-500 text-xl leading-none transition-colors"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>

      <p className="text-sm text-[--color-ink-soft] mb-4">
        Share this link with <strong>{name}</strong> — no sign-in required to view it!
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 bg-white rounded-xl border border-pink-200 px-3 py-2.5 text-xs font-mono text-[--color-ink-soft] truncate">
          {shareUrl}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={copyLink} className="btn-primary px-4 py-2.5 text-xs">
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>
          <a
            href={`/birthday/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-4 py-2.5 text-xs"
          >
            Preview ↗
          </a>
        </div>
      </div>
    </div>
  );
}

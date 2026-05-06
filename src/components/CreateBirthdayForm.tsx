'use client';

import { useState, type FormEvent } from 'react';
import { nanoid } from 'nanoid';
import { createBirthday } from '@/services/birthday';
import type { Birthday } from '@/types';

interface CreateBirthdayFormProps {
  userId: string;
  onCreated: (birthday: Birthday) => void;
}

/**
 * Form to create a new birthday page.
 * Generates a nanoid, saves to Firestore, and emits the result upward.
 */
export function CreateBirthdayForm({ userId, onCreated }: CreateBirthdayFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const id = nanoid(10); // Short, URL-safe ID
      const now = new Date();

      await createBirthday({ id, userId, name: name.trim(), message: message.trim() });

      // Optimistic local object — Timestamp will be approximate but correct for display
      const newBirthday: Birthday = {
        id,
        userId,
        name: name.trim(),
        message: message.trim(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createdAt: { toDate: () => now } as any,
      };

      onCreated(newBirthday);
      setName('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[--color-ink-soft] uppercase tracking-wide mb-1.5">
          Friend&apos;s Name *
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Sarah, Uncle Mike…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={80}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[--color-ink-soft] uppercase tracking-wide mb-1.5">
          Birthday Message *
        </label>
        <textarea
          className="input-field resize-none"
          placeholder="Write something heartfelt…"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={600}
        />
        <p className="text-right text-xs text-pink-300 mt-1">{message.length}/600</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !name.trim() || !message.trim()}
        className="btn-primary w-full py-3"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Creating…
          </>
        ) : (
          'Generate Birthday Page 🎉'
        )}
      </button>
    </form>
  );
}

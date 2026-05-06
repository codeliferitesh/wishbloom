'use client';

import { useEffect } from 'react';

/**
 * Fires a multi-burst confetti animation on mount.
 * Dynamically imports canvas-confetti to avoid SSR issues.
 */
export function useConfetti() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let confetti: any;

    async function run() {
      const mod = await import('canvas-confetti');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      confetti = (mod as any).default ?? (mod as any);

      const colors = ['#E8748A', '#D4A853', '#F5DFA0', '#FFD6DF', '#C2486A', '#fff'];

      // Initial big burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.55 },
        colors,
        scalar: 1.2,
      });

      // Left cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.6 },
          colors,
        });
      }, 300);

      // Right cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.6 },
          colors,
        });
      }, 500);

      // Trickle
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.4 },
          colors,
          ticks: 200,
        });
      }, 1000);
    }

    run();
  }, []);
}

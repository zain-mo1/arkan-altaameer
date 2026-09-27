/** Brand easing (from the identity guide): quick start, long architectural settle. */
export const EASE = [0.2, 0.7, 0.15, 1] as const;
/** Symmetric "curtain" easing for wipes and reveals. */
export const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Shared viewport settings for scroll-triggered reveals. */
export const VIEWPORT = { once: true, amount: 0.3 } as const;

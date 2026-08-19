/**
 * The CV colour-codes each block with a thick rule down its left edge, and
 * cycles through these four. Same order, same cycle.
 */
export const accents = [
  "var(--teal)",
  "var(--sand)",
  "var(--sage)",
  "var(--coral)",
] as const;

export const accentAt = (index: number) => accents[index % accents.length];

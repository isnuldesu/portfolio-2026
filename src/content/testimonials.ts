import type { L } from "@/lib/i18n";

export type Testimonial = {
  /** Three lines at most. A portfolio quote is a snippet, not a review. */
  quote: L;
  name: string;
  role: L;
  company: string;
};

/**
 * Empty on purpose. The section does not render until there are real quotes
 * with real names against them, because an invented one is worth less than
 * none and a reader can tell.
 */
export const testimonials: Testimonial[] = [];

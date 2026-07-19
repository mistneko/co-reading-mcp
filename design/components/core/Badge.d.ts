import * as React from "react";

/**
 * Tiny status pill / count marker used on books, chapters, and margin notes.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Colour role.
   * - `accent` — periwinkle count pill (annotation counts) [default]
   * - `gold` — unsubmitted / "open" state ("未交")
   * - `rose` — human-side (小烟) marker
   * - `plain` — bare coloured text, no pill (e.g. "✎3" on a book)
   */
  tone?: "accent" | "gold" | "rose" | "plain";
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;

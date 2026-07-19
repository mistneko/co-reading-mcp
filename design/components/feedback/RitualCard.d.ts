import * as React from "react";

/**
 * A keepsake "ritual card" bookmark for a shared margin, a resonant note, or a
 * finished book. Warm printed paper with faint generative line-art.
 */
export interface RitualCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Art mood (also sets the default corner label). @default "fold" */
  art?: "fold" | "ripple" | "stardust" | "lastfold";
  /** Card height. @default "standard" */
  size?: "compact" | "standard" | "tall";
  /** Uppercase corner label. Defaults from `art` (FOLDED MARGIN / ECHO BOOKMARK / DUST TRACE / LAST FOLD). */
  name?: React.ReactNode;
  /** Small bold line above the title. @default "收获了一枚回声书签" */
  kicker?: React.ReactNode;
  /** Large title (usually the book). */
  title?: React.ReactNode;
  /** Subtitle under the title (book · chapter). */
  subtitle?: React.ReactNode;
  /** The carried-forward passage, set in the reading serif. */
  quote?: React.ReactNode;
  /** The margin note body (or pass as children). */
  note?: React.ReactNode;
  /** Footer line. @default "a quiet mark left on the page" */
  footer?: React.ReactNode;
  /** Seed for the deterministic art (number, or any string). */
  seed?: number | string;
  children?: React.ReactNode;
}

export function RitualCard(props: RitualCardProps): JSX.Element;

import * as React from "react";

/**
 * Rounded-square (10px) icon button for a single Unicode glyph — the chrome's
 * secondary control for top-bar and rail actions.
 */
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Size. @default "md" (36px); "sm" is 30px. */
  size?: "sm" | "md";
  /** Drop the border + background so only the glyph shows until hover. */
  bare?: boolean;
  /** Accessible label (also the tooltip) — required, since the child is a decorative glyph. */
  label: string;
  /** The glyph to render, e.g. "☰", "↻", "＋", "◐". */
  children: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;

import * as React from "react";

/**
 * Fully-rounded pill button — the primary control of Mitlesen's chrome.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `default` = quiet ghost, `primary` = periwinkle gradient CTA, `done` = mint "read" state. */
  variant?: "default" | "primary" | "done";
  /** Control height. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Optional leading glyph (a Unicode icon like ✍ or →), rendered before the label. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;

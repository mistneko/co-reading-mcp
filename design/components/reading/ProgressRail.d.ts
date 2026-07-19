import * as React from "react";

/**
 * Thin reading-progress bar with the periwinkle gradient fill.
 */
export interface ProgressRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explicit percentage 0–100. Overrides `read`/`total` when given. */
  value?: number;
  /** Chunks read (used with `total`). */
  read?: number;
  /** Total chunks (used with `read`). */
  total?: number;
  /** Show a "read/total" count beside the bar. */
  showLabel?: boolean;
}

export function ProgressRail(props: ProgressRailProps): JSX.Element;

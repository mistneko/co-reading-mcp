import * as React from "react";

/**
 * 蜡点 — a small radial-gradient wax dot. The system's one shape for emotion /
 * status, replacing colour bars (信纸 axiom 3).
 */
export interface WaxDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Preset colour role. @default "accent" */
  tone?: "accent" | "deep" | "rose" | "mint" | "gold" | "lavender" | "ice";
  /** Raw colour override (any CSS colour); wins over `tone`. */
  color?: string;
  /** Diameter in px. @default 10 */
  size?: number;
  /** Render as an empty ring (unread / pending). */
  hollow?: boolean;
}

export function WaxDot(props: WaxDotProps): JSX.Element;

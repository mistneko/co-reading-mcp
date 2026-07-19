import * as React from "react";

/**
 * Name label for a reader — 小奏 (AI, periwinkle) or 小烟 (human, rose).
 */
export interface PersonaTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Which reader. @default "ai" */
  persona?: "ai" | "human";
  /** Override the displayed name (defaults: 小奏 for ai, 小烟 for human). */
  name?: string;
}

export function PersonaTag(props: PersonaTagProps): JSX.Element;

import * as React from "react";

/**
 * Inline passage highlight (underline wash) inside a reading Sheet.
 */
export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {
  /** Whose highlight — `human` inks gold, `ai` (小奏) inks ice-blue. @default "human" */
  by?: "human" | "ai";
  /** Deepen to the fuller "selected" wash. */
  active?: boolean;
  children?: React.ReactNode;
}

export function Highlight(props: HighlightProps): JSX.Element;

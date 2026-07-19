import * as React from "react";

/**
 * 火漆 wax seal — the brand's signature mark (gold wafer + canon note motif).
 */
export interface WaxSealProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter preset: dot 18 · sm 30 · md 40 · lg 54. @default "md" */
  size?: "dot" | "sm" | "md" | "lg";
  /** Gentle idle breathing pulse (for an unopened letter). */
  breathe?: boolean;
  /** Dim slightly to read as an already-broken seal. */
  broken?: boolean;
  /** Accessible label. @default "wax seal" */
  label?: string;
}

export function WaxSeal(props: WaxSealProps): JSX.Element;

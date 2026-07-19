import * as React from "react";

/**
 * A transient acknowledgement pill (dark ground, light text). You control
 * placement and show/hide — this is just the visual.
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show a spinner instead of an icon (e.g. during an import). */
  loading?: boolean;
  /** A leading glyph (✎, ✓, →…). Ignored when `loading`. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Toast(props: ToastProps): JSX.Element;

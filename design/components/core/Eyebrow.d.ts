import * as React from "react";

/**
 * Small uppercase, letter-spaced kicker label placed above a heading.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render as. @default "span" */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;

import * as React from "react";

/**
 * The ruled letter-paper reading surface. Holds chunk text and inline
 * {@link Highlight} marks.
 */
export interface SheetProps extends React.HTMLAttributes<HTMLElement> {
  /** Draw the horizontal rule lines under the text. @default true */
  ruled?: boolean;
  /** Reading text, including any `<Highlight>` runs. */
  children?: React.ReactNode;
}

export function Sheet(props: SheetProps): JSX.Element;

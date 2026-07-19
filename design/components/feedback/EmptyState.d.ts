import * as React from "react";

/**
 * A quiet serif-italic empty state with a large seal glyph above the message.
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The seal glyph shown above the message. @default "✒" */
  seal?: React.ReactNode;
  /** The message (serif italic). */
  children?: React.ReactNode;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;

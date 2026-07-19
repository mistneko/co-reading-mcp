import * as React from "react";

/**
 * A book on the shelf — serif title, italic author, progress rail + counts.
 * Composes {@link ProgressRail}.
 */
export interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Book title (serif). */
  title: React.ReactNode;
  /** Author, shown italic beneath the title. */
  author?: React.ReactNode;
  /** Chunks read. */
  read?: number;
  /** Total chunks. */
  total?: number;
  /** Annotation tally (rendered as "✎N"; hidden when 0). */
  annotationCount?: number;
  /** Highlight as the open book. */
  active?: boolean;
  /** When provided, a delete affordance appears on hover. */
  onDelete?: (e: React.MouseEvent) => void;
}

export function BookCard(props: BookCardProps): JSX.Element;

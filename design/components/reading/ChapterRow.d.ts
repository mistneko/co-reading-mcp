import * as React from "react";

/**
 * A table-of-contents row with a read/unread/current status dot.
 */
export interface ChapterRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Chapter / chunk title. */
  title: React.ReactNode;
  /** Filled mint dot when read; hollow ring otherwise. */
  read?: boolean;
  /** Highlight this row as the one being read. */
  current?: boolean;
  /** Annotation count pill (hidden when 0). */
  annotationCount?: number;
}

export function ChapterRow(props: ChapterRowProps): JSX.Element;

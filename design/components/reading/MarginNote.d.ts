import * as React from "react";

/**
 * A margin annotation anchored to a passage. Composes {@link PersonaTag} and
 * {@link Badge}. 小奏 (ai) notes carry the inked paw stamp.
 */
export interface MarginNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Author — `ai` (小奏, snow-blue + paw) or `human` (小烟, warm paper). @default "ai" */
  persona?: "ai" | "human";
  /** Override the author name. */
  personaName?: string;
  /** The anchored passage, shown quoted above the note (corner brackets added). */
  quote?: React.ReactNode;
  /** Show the gold "未交" (unsubmitted) badge. */
  open?: boolean;
  /** Add the active glow. */
  active?: boolean;
  /** Count beside the reply link. */
  replyCount?: number;
  /** When provided, renders a "回应" reply link. */
  onReply?: (e: React.MouseEvent) => void;
  /** A rendered reply thread (e.g. nested notes), shown under a dashed spine. */
  replies?: React.ReactNode;
  /** The note body. */
  children?: React.ReactNode;
}

export function MarginNote(props: MarginNoteProps): JSX.Element;

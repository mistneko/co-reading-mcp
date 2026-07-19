import * as React from "react";

export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
  /** Optional small count shown after the label. */
  count?: number;
}

/**
 * The vk-seg segmented pill control — tab / sub-view switcher.
 */
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Options — objects `{value,label,count?}` or bare strings. */
  options: (SegmentedOption | string)[];
  /** Currently selected value. */
  value: string;
  /** Called with the newly-selected value. */
  onChange?: (value: string) => void;
}

export function SegmentedControl(props: SegmentedControlProps): JSX.Element;

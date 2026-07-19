import * as React from "react";

/**
 * 双声部 canon voice motif — a dotted bass-line contour. `first` (ice) leads;
 * `second` (gold) enters late and fades to reverberation.
 */
export interface VoiceStaffProps extends React.SVGAttributes<SVGSVGElement> {
  /** Which voice. @default "first" */
  voice?: "first" | "second";
  /** Animate the second voice's staggered entrance. @default true */
  animate?: boolean;
}

export function VoiceStaff(props: VoiceStaffProps): JSX.Element;

/** Color of a critical severity in the attack table chart: grey without a critical, A to E warmer, F-I darker. */
export const SEVERITY_COLORS: Record<string, string> = {
  none: '#9e9e9e',
  A: '#fdd835',
  B: '#ffb300',
  C: '#fb8c00',
  D: '#f4511e',
  E: '#d32f2f',
  F: '#b71c1c',
  G: '#880e4f',
  H: '#4a148c',
  I: '#1a237e',
};

export const severityColor = (severity: string | null | undefined): string =>
  SEVERITY_COLORS[severity ?? 'none'] ?? SEVERITY_COLORS.none;

/** Severities shown in the legend, in order. */
export const LEGEND_SEVERITIES = ['none', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

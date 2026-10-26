/** Palette color of an absolute or endurance result, from the worst to the best. */
export const resultColor = (result: string | undefined): 'error' | 'warning' | 'info' | 'success' | 'secondary' => {
  switch (result) {
    case 'absolute-failure':
    case 'failure':
      return 'error';
    case 'partial-success':
      return 'warning';
    case 'success':
      return 'info';
    case 'absolute-success':
      return 'success';
    default:
      return 'secondary';
  }
};

/** Palette color of a percent result: 100% or more is a full success. */
export const percentColor = (percent: number): 'error' | 'warning' | 'info' | 'success' =>
  percent >= 100 ? 'success' : percent >= 50 ? 'info' : percent > 0 ? 'warning' : 'error';

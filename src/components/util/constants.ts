const BORDER_COLOR = '#dadce0';
const BORDER_WIDTH = '1px';
const BORDER_STYLE = 'solid';

export default {
  BORDER_COLOR,
  BORDER_WIDTH,
  BORDER_STYLE,
  BORDER: `${BORDER_COLOR} ${BORDER_WIDTH} ${BORDER_STYLE}`,
} as const;
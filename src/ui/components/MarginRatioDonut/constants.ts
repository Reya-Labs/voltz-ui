import { BaseColorTokens } from 'brokoli-ui';

import { MarginAccountUI } from '../../../app/features/portfolio/types';

export const MARGIN_RATIO_COLOR_MAP: Record<MarginAccountUI['marginRatioHealth'], BaseColorTokens> =
  {
    danger: 'error',
    healthy: 'primary',
    warning: 'warning',
  };

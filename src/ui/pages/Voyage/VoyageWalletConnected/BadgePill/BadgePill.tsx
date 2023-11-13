import { Pill } from 'brokoli-ui';
import React from 'react';

import { VoyageBadgeUI } from '../../../../../app/features/voyage/types';
import { BADGE_ID_PILL_TEXT_MAP } from '../helpers';
import { Skeleton } from './BadgePill.styled';

export const BadgePill: React.FunctionComponent<{
  variant: VoyageBadgeUI['id'];
  loading?: boolean;
}> = ({ loading, variant }) => {
  if (loading) {
    return (
      <Skeleton
        colorToken="black300"
        data-testid="BadgePill-Skeleton"
        typographyToken="primaryBodySmallRegular"
        variant="rectangular"
      />
    );
  }

  return (
    <Pill
      colorToken="rainbow"
      data-testid={`BadgePill-Pill-${variant}`}
      typographyToken="primaryBodySmallRegular"
      variant="regular"
    >
      {BADGE_ID_PILL_TEXT_MAP[variant]}
    </Pill>
  );
};

import { Pill } from 'brokoli-ui';
import React from 'react';

import { VoyageBadgeUI } from '../../../../../app/features/voyage/types';
import { formatPOSIXTimestamp } from '../../../../../utilities/date';
import { BADGE_ID_PILL_TEXT_MAP, BADGE_ID_TITLE_COPY_MAP } from '../helpers';
import {
  AchievedAtTypography,
  AchievedContainerBox,
  BadgePillBox,
  ContainerBox,
  Skeleton,
  TitleTypography,
} from './VoyageBadgeEntry.styled';

export type VoyageBadgeEntryProps = {
  achievedAt?: number;
  loading?: boolean;
  onClick?: () => void;
  variant: VoyageBadgeUI['id'];
};
export const VoyageBadgeEntry: React.FunctionComponent<VoyageBadgeEntryProps> = ({
  achievedAt,
  loading,
  onClick,
  variant,
}) => {
  if (loading) {
    return (
      <Skeleton
        colorToken="liberty2"
        data-testid="AchievedBadge-Skeleton"
        typographyToken="primaryBodyMediumRegular"
        variant="rectangular"
      />
    );
  }
  const Container = Boolean(achievedAt) ? AchievedContainerBox : ContainerBox;
  const achievedText = achievedAt
    ? `Achieved: ${formatPOSIXTimestamp(achievedAt)}`
    : 'Keep trading...';

  return (
    <Container data-testid={`VoyageBadgeEntry-Container`} onClick={onClick}>
      <BadgePillBox>
        <div>
          <Pill colorToken="rainbow" typographyToken="primaryBodySmallRegular" variant="regular">
            {`Voltz v2 - ${BADGE_ID_PILL_TEXT_MAP[variant]}`}
          </Pill>
        </div>
      </BadgePillBox>
      <TitleTypography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        {BADGE_ID_TITLE_COPY_MAP[variant]}
      </TitleTypography>
      <AchievedAtTypography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        {achievedText}
      </AchievedAtTypography>
    </Container>
  );
};

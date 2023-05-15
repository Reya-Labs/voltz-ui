import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { selectLpFormAMM } from '../../../../../app/features/forms/rollover-lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { NewPositionDetailsUI } from './NewPositionDetailsUI';

type PositionDetailsProps = {};
export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const aMM = useAppSelector(selectLpFormAMM);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const actionLabelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyLargeBold'
    : 'primaryBodyMediumBold';

  const actionTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyMediumRegular'
    : 'secondaryBodySmallRegular';

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodySmallRegular'
    : 'secondaryBodyMediumRegular';

  if (!aMM) {
    return null;
  }

  return (
    <NewPositionDetailsUI
      actionLabelTypographyToken={actionLabelTypographyToken}
      actionTypographyToken={actionTypographyToken}
      labelTypographyToken={labelTypographyToken}
      typographyToken={typographyToken}
    />
  );
};
import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectLpFormAMM, selectLpFormMode } from '../../../../../app/features/forms/lps/lp';
import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import { EditPositionDetailsUI } from './EditPositionDetailsUI';
import { NewPositionDetailsUI } from './NewPositionDetailsUI';

type PositionDetailsProps = {};
export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const lpFormMode = useAppSelector(selectLpFormMode);
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

  return lpFormMode === 'new' ? (
    <NewPositionDetailsUI
      actionLabelTypographyToken={actionLabelTypographyToken}
      actionTypographyToken={actionTypographyToken}
      labelTypographyToken={labelTypographyToken}
      typographyToken={typographyToken}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  ) : (
    <EditPositionDetailsUI
      actionLabelTypographyToken={actionLabelTypographyToken}
      actionTypographyToken={actionTypographyToken}
      labelTypographyToken={labelTypographyToken}
      typographyToken={typographyToken}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};

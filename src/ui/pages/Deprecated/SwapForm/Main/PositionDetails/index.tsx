import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import {
  selectSwapFormAMM,
  selectSwapFormMode,
} from '../../../../../../app/features/forms/trader/deprecated/swap';
import { EditPositionDetailsUI } from './EditPositionDetailsUI';
import { NewPositionDetailsUI } from './NewPositionDetailsUI';

type PositionDetailsProps = {};
export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const swapForMode = useAppSelector(selectSwapFormMode);
  const aMM = useAppSelector(selectSwapFormAMM);

  const actionLabelTypographyToken: TypographyToken = 'primaryBodyMediumBold';
  const actionTypographyToken: TypographyToken = 'secondaryBodySmallRegular';
  const labelTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const typographyToken: TypographyToken = 'secondaryBodyMediumRegular';

  if (!aMM) {
    return null;
  }

  return swapForMode === 'new' ? (
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

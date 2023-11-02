import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectRolloverLpFormAMM } from '../../../../../app/features/forms/lps/rollover-lp';
import { NewPositionDetailsUI } from './NewPositionDetailsUI';
import { PreviousPositionDetailsUI } from './PreviousPositionDetailsUI';

type PositionDetailsProps = {};
export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const aMM = useAppSelector(selectRolloverLpFormAMM);

  const actionLabelTypographyToken: TypographyToken = 'primaryBodyMediumBold';
  const actionTypographyToken: TypographyToken = 'secondaryBodySmallRegular';
  const labelTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const typographyToken: TypographyToken = 'secondaryBodyMediumRegular';

  if (!aMM) {
    return null;
  }

  return (
    <React.Fragment>
      <PreviousPositionDetailsUI
        actionLabelTypographyToken={actionLabelTypographyToken}
        actionTypographyToken={actionTypographyToken}
        labelTypographyToken={labelTypographyToken}
        typographyToken={typographyToken}
        underlyingTokenName={aMM.underlyingToken.name}
      />
      <NewPositionDetailsUI
        actionLabelTypographyToken={actionLabelTypographyToken}
        actionTypographyToken={actionTypographyToken}
        labelTypographyToken={labelTypographyToken}
        typographyToken={typographyToken}
        underlyingTokenName={aMM.underlyingToken.name}
      />
    </React.Fragment>
  );
};

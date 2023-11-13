import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectGasInfoFormatted } from '../../../../../app/features/forms/lps/rollover-lp';
import { Icon } from '../../../../components/Icon/Icon';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

export const TransactionDetails: React.FunctionComponent = () => {
  const { gasFeeFormatted, gasTokenFormatted } = useAppSelector(selectGasInfoFormatted);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <IconTextWrapper>
          <Icon name="gasIcon" />
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="white"
          token={` ${gasTokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeFormatted}
        />
      </TransactionDetailBox>
    </React.Fragment>
  );
};

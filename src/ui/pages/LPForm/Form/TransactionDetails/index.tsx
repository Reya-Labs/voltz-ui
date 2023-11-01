import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectGasInfoFormatted } from '../../../../../app/features/forms/lps/lp';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const { gasFeeFormatted, gasTokenFormatted } = useAppSelector(selectGasInfoFormatted);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
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

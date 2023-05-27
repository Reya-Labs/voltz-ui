import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectGasFeeFormatted,
  selectGasFeeToken,
} from '../../../../../app/features/forms/lps/rollover-lp';
import { useAppSelector } from '../../../../../app/hooks';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const gasFeeFormatted = useAppSelector(selectGasFeeFormatted);
  const gasFeeToken = useAppSelector(selectGasFeeToken);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token={` ${gasFeeToken}`}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeFormatted}
        />
      </TransactionDetailBox>
    </React.Fragment>
  );
};

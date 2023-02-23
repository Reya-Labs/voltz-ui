import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { ReactComponent as GasIcon } from './gas-icon.svg';
import {
  IconTextWrapper,
  TransactionDetailBox,
  TransactionDetailsBox,
} from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  // todo: Alex handle fill in proper values
  return (
    <TransactionDetailsBox>
      <TransactionDetailBox>
        <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
          Fees
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" USDC"
          typographyToken="secondaryBodySmallRegular"
          value={100}
        ></TokenTypography>
      </TransactionDetailBox>
      <TransactionDetailBox>
        <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
          Estimated Slippage
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={0.3}
        ></TokenTypography>
      </TransactionDetailBox>
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" ETH"
          typographyToken="secondaryBodySmallRegular"
          value={0.003}
        ></TokenTypography>
      </TransactionDetailBox>
    </TransactionDetailsBox>
  );
};

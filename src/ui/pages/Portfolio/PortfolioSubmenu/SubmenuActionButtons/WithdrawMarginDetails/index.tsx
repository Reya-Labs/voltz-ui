import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { ReactComponent as GasIcon } from './gas-icon.svg';
import {
  IconTextWrapper,
  TransactionDetailBox,
  WithdrawMarginDetailsBox,
  WithdrawMarginDetailsWrapperBox,
} from './WithdrawMarginDetails.styled';

type TransactionDetailsProps = {};

export const WithdrawMarginDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const token = 'eth';
  const slippageFormatted = '123';
  const feeFormatted = '456';
  const { gasFeeFormatted, gasTokenFormatted } = {
    gasFeeFormatted: '123',
    gasTokenFormatted: 'K',
  };

  return (
    <WithdrawMarginDetailsWrapperBox>
      <WithdrawMarginDetailsBox>
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Account Margin
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={token}
            typographyToken="secondaryBodySmallRegular"
            value={feeFormatted}
          />
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Available To Withdraw
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value={slippageFormatted}
          />
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Account Margin Ratio
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value={slippageFormatted}
          />
        </TransactionDetailBox>
      </WithdrawMarginDetailsBox>
      <HorizontalLine />
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token={` ${gasTokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeFormatted}
        />
      </TransactionDetailBox>
    </WithdrawMarginDetailsWrapperBox>
  );
};

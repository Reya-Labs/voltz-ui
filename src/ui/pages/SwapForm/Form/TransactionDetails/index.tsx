import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectGasInfoFormatted,
  selectPoolTokenFormatted,
  selectProspectiveSwapAccountInitialMarginPostTradeCompactFormatted,
  selectProspectiveSwapFeeFormatted,
  selectReceivingRateFormatted,
  selectSlippageFormatted,
  selectUserInputNotionalCompactFormatted,
} from '../../../../../app/features/forms/trader/swap';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const tokenFormatted = useAppSelector(selectPoolTokenFormatted);
  const slippageFormatted = useAppSelector(selectSlippageFormatted);
  const accountInitialMarginPostTradeCompactFormatted = useAppSelector(
    selectProspectiveSwapAccountInitialMarginPostTradeCompactFormatted,
  );
  const notionalAmountFormatted = useAppSelector(selectUserInputNotionalCompactFormatted);
  const receivingRateFormatted = useAppSelector(selectReceivingRateFormatted);
  const feeFormatted = useAppSelector(selectProspectiveSwapFeeFormatted);
  const { gasFeeFormatted, gasTokenFormatted } = useAppSelector(selectGasInfoFormatted);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Account Initial Margin Post Trade
        </Typography>
        <TokenTypography
          colorToken="white"
          token={`${accountInitialMarginPostTradeCompactFormatted.compactSuffix}${tokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={accountInitialMarginPostTradeCompactFormatted.compactNumber}
        />
      </TransactionDetailBox>
      <TransactionDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Receiving rate
        </Typography>
        <TokenTypography
          colorToken="white"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={receivingRateFormatted}
        />
      </TransactionDetailBox>
      <TransactionDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Size
        </Typography>
        <TokenTypography
          colorToken="white"
          token={`${notionalAmountFormatted.compactSuffix}${tokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={notionalAmountFormatted.compactNumber}
        />
      </TransactionDetailBox>
      <TransactionDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Estimated Slippage
        </Typography>
        <TokenTypography
          colorToken="white"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={slippageFormatted}
        />
      </TransactionDetailBox>
      <TransactionDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Fees
        </Typography>
        <TokenTypography
          colorToken="white"
          token={tokenFormatted}
          typographyToken="secondaryBodySmallRegular"
          value={feeFormatted}
        />
      </TransactionDetailBox>
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="white"
          token={gasTokenFormatted}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeFormatted}
        />
      </TransactionDetailBox>
    </React.Fragment>
  );
};

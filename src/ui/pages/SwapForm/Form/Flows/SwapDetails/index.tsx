import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import {
  selectGasInfoFormatted,
  selectPoolMaturityFormatted,
  selectPoolTokenFormatted,
  selectProspectiveSwapAccountInitialMarginPostTradeCompactFormatted,
  selectProspectiveSwapFeeFormatted,
  selectReceivingRateFormatted,
  selectSlippageFormatted,
  selectSwapFormMarginAccountForSwapLPUI,
  selectSwapFormPool,
  selectUserInputNotionalCompactFormatted,
} from '../../../../../../app/features/forms/trader/swap';
import { IconTextWrapper } from '../../TransactionDetails/TransactionDetails.styled';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { HorizontalLineBox, SwapDetailBox, SwapDetailsBox } from './SwapDetails.styled';

type SwapDetailsProps = {};

export const SwapDetails: React.FunctionComponent<SwapDetailsProps> = () => {
  const pool = useAppSelector(selectSwapFormPool);
  const tokenFormatted = useAppSelector(selectPoolTokenFormatted);
  const slippageFormatted = useAppSelector(selectSlippageFormatted);
  const accountInitialMarginPostTradeCompactFormatted = useAppSelector(
    selectProspectiveSwapAccountInitialMarginPostTradeCompactFormatted,
  );
  const notionalAmountFormatted = useAppSelector(selectUserInputNotionalCompactFormatted);
  const receivingRateFormatted = useAppSelector(selectReceivingRateFormatted);
  const feeFormatted = useAppSelector(selectProspectiveSwapFeeFormatted);
  const { gasFeeFormatted, gasTokenFormatted } = useAppSelector(selectGasInfoFormatted);
  const selectedMarginAccountUI = useAppSelector(selectSwapFormMarginAccountForSwapLPUI);

  const poolMaturity = useAppSelector(selectPoolMaturityFormatted);
  if (!pool || !selectedMarginAccountUI) {
    return null;
  }

  const { balanceCompactFormatted } = selectedMarginAccountUI;

  return (
    <SwapDetailsBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Pool
        </Typography>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {pool.market}
        </Typography>
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Margin Account Balance
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={`${balanceCompactFormatted.compactSuffix}${tokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={balanceCompactFormatted.compactNumber}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Account Initial Margin Post Trade
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={`${accountInitialMarginPostTradeCompactFormatted.compactSuffix}${tokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={accountInitialMarginPostTradeCompactFormatted.compactNumber}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Receiving rate
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={receivingRateFormatted}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Size
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={`${notionalAmountFormatted.compactSuffix}${tokenFormatted}`}
          typographyToken="secondaryBodySmallRegular"
          value={notionalAmountFormatted.compactNumber}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Estimated Slippage
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={slippageFormatted}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Fees
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={tokenFormatted}
          typographyToken="secondaryBodySmallRegular"
          value={feeFormatted}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={poolMaturity}
        />
      </SwapDetailBox>
      <HorizontalLineBox>
        <HorizontalLine />
      </HorizontalLineBox>
      <SwapDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token={gasTokenFormatted}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeFormatted}
        />
      </SwapDetailBox>
    </SwapDetailsBox>
  );
};

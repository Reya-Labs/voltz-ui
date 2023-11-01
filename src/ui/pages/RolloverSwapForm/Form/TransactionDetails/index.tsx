import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectAMMTokenFormatted,
  selectGasInfoFormatted,
  selectProspectiveSwapFeeFormatted,
  selectSlippageFormatted,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const slippageFormatted = useAppSelector(selectSlippageFormatted);
  const feeFormatted = useAppSelector(selectProspectiveSwapFeeFormatted);
  const { gasFeeFormatted, gasTokenFormatted } = useAppSelector(selectGasInfoFormatted);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Fees
        </Typography>
        <TokenTypography
          colorToken="white"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={feeFormatted}
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

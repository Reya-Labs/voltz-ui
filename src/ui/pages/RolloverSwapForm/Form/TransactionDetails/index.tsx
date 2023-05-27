import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMTokenFormatted,
  selectGasFeeFormatted,
  selectGasFeeToken,
  selectProspectiveSwapFeeFormatted,
  selectSlippageFormatted,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { useAppSelector } from '../../../../../app/hooks';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const slippageFormatted = useAppSelector(selectSlippageFormatted);
  const feeFormatted = useAppSelector(selectProspectiveSwapFeeFormatted);
  const gasFeeFormatted = useAppSelector(selectGasFeeFormatted);
  const gasFeeToken = useAppSelector(selectGasFeeToken);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Fees
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
          Estimated Slippage
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={slippageFormatted}
        />
      </TransactionDetailBox>
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

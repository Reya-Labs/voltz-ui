import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMTokenFormatted,
  selectInfoPostSwap,
  selectProspectiveSwapFeeFormatted,
  selectSlippageFormatted,
} from '../../../../../app/features/forms/rollover-swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { formatNumber } from '../../../../../utilities/number';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const token = useAppSelector(selectAMMTokenFormatted);
  const slippageFormatted = useAppSelector(selectSlippageFormatted);
  const feeFormatted = useAppSelector(selectProspectiveSwapFeeFormatted);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
          Fees
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={feeFormatted}
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
          value={slippageFormatted}
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
          value={
            infoPostSwap.status === 'success'
              ? formatNumber(infoPostSwap.value.gasFeeETH, 2, 4)
              : '--'
          }
        ></TokenTypography>
      </TransactionDetailBox>
    </React.Fragment>
  );
};

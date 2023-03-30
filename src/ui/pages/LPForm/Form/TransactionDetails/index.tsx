import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { selectInfoPostLp } from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { formatNumber } from '../../../../../utilities/number';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const infoPostLp = useAppSelector(selectInfoPostLp);

  return (
    <React.Fragment>
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
            infoPostLp.status === 'success' ? formatNumber(infoPostLp.value.gasFeeETH, 2, 4) : '--'
          }
        ></TokenTypography>
      </TransactionDetailBox>
    </React.Fragment>
  );
};

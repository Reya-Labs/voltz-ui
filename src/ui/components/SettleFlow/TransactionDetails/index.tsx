import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { selectSettleGasFeeETH } from '../../../../app/features/settle-flow';
import { useAppSelector } from '../../../../app/hooks';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const gasFeeETH = useAppSelector(selectSettleGasFeeETH);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Gas Fee To Settle
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" ETH"
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeETH}
        />
      </TransactionDetailBox>
    </React.Fragment>
  );
};

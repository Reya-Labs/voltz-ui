import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { selectSettleGasFee, selectSettleGasFeeToken } from '../../../../app/features/settle-flow';
import { useAppSelector } from '../../../../app/hooks';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const gasFeeETH = useAppSelector(selectSettleGasFee);
  const gasFeeToken = useAppSelector(selectSettleGasFeeToken);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Gas Fee To Settle
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token={` ${gasFeeToken}`}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeETH}
        />
      </TransactionDetailBox>
    </React.Fragment>
  );
};

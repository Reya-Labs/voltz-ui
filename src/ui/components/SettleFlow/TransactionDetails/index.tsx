import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../app';
import { selectGasInfoFormatted } from '../../../../app/features/settle-flow';
import { Icon } from '../../Icon/Icon';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const { gasFeeFormatted, gasTokenFormatted } = useAppSelector(selectGasInfoFormatted);

  return (
    <React.Fragment>
      <TransactionDetailBox>
        <IconTextWrapper>
          <Icon name="gasIcon" />
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Gas Fee To Settle
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

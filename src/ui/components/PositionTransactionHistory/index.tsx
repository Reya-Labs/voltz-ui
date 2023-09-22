import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import { usePositionDetails } from '../../hooks/usePositionDetails';
import { RainbowLoaderBox } from './PositionTransactionHistory.styled';
import { TransactionHistoryList } from './TransactionHistoryList';

export const PositionTransactionHistory: React.FunctionComponent<{
  positionId: string;
}> = ({ positionId }) => {
  const { positionDetails, positionDetailsLoadingState } = usePositionDetails({ positionId });

  if (!positionDetails && positionDetailsLoadingState === 'error') {
    return (
      <Typography colorToken="wildStrawberry" typographyToken="primaryBodyMediumBold">
        Something went wrong while fetching history...
      </Typography>
    );
  }
  if (
    !positionDetails &&
    (positionDetailsLoadingState === 'pending' || positionDetailsLoadingState === 'idle')
  ) {
    return (
      <RainbowLoaderBox>
        <RainbowLoader height={2} text="Fetching history..." />
      </RainbowLoaderBox>
    );
  }
  if (!positionDetails) {
    return null;
  }
  return <TransactionHistoryList history={positionDetails.history} />;
};

import { Typography } from 'brokoli-ui';
import React from 'react';

import { PositionTransactionHistory } from '../PositionTransactionHistory';
import { FormTransactionHistoryBox } from './FormTransactionHistory.styled';

export const FormTransactionHistory: React.FunctionComponent<{
  positionId: string | null | undefined;
}> = ({ positionId }) => {
  if (!positionId) {
    return null;
  }
  return (
    <FormTransactionHistoryBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
        Transaction History
      </Typography>
      <PositionTransactionHistory positionId={positionId} />
    </FormTransactionHistoryBox>
  );
};

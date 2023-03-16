import React from 'react';

import {
  selectAMMTokenFormatted,
  selectMarginAccountName,
  selectPositionMarginFormatted,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MarginAccount as MarginAccountComponent } from '../../../../components/MarginAccount';

type MarginAccountProps = {};

export const MarginAccount: React.FunctionComponent<MarginAccountProps> = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const accountName = useAppSelector(selectMarginAccountName);
  const balanceValue = useAppSelector(selectPositionMarginFormatted);

  return (
    <MarginAccountComponent accountName={accountName} balanceValue={balanceValue} token={token} />
  );
};

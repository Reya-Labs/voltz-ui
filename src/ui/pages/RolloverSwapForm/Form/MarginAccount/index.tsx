import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectAMMTokenFormatted,
  selectMarginAccountName,
  selectPositionMarginFormatted,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { MarginAccountFormPreview } from '../../../../components/MarginAccountFormPreview';

export const MarginAccount: React.FunctionComponent = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const accountName = useAppSelector(selectMarginAccountName);
  const balanceValue = useAppSelector(selectPositionMarginFormatted);

  return (
    <MarginAccountFormPreview accountName={accountName} balanceValue={balanceValue} token={token} />
  );
};

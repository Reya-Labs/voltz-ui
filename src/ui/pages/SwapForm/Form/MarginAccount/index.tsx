import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectAMMTokenFormatted,
  selectMarginAccountName,
} from '../../../../../app/features/forms/trader/swap';
import { MarginAccountFormPreview } from '../../../../components/MarginAccountFormPreview';

export const MarginAccount: React.FunctionComponent = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const accountName = useAppSelector(selectMarginAccountName);

  return <MarginAccountFormPreview accountName={accountName} balanceValue={'123'} token={token} />;
};

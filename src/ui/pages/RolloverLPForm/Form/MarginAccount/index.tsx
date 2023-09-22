import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectAMMTokenFormatted,
  selectMarginAccountName,
  selectPositionMarginFormatted,
} from '../../../../../app/features/forms/lps/rollover-lp';
import { MarginAccountFormPreview } from '../../../../components/MarginAccountFormPreview';

type MarginAccountProps = {};

export const MarginAccount: React.FunctionComponent<MarginAccountProps> = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const accountName = useAppSelector(selectMarginAccountName);
  const balanceValue = useAppSelector(selectPositionMarginFormatted);

  return (
    <MarginAccountFormPreview accountName={accountName} balanceValue={balanceValue} token={token} />
  );
};

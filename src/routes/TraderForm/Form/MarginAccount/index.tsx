import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import { selectSwapFormAMM, selectWalletBalanceInfo } from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { formatTimestamp } from '../../../../utilities/date';
import { compactFormat } from '../../../../utilities/number';
import { AccountBox, BalanceBox, MarginAccountBox } from './MarginAccount.styled';

type MarginAccountProps = {};

export const MarginAccount: React.FunctionComponent<MarginAccountProps> = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const walletBalance = useAppSelector(selectWalletBalanceInfo);

  const balanceValue =
    walletBalance.status === 'success' ? compactFormat(walletBalance.value) : '--';
  const token = ` ${aMM ? aMM.underlyingToken.name.toUpperCase() : ''}`;

  const accountName = aMM ? `${aMM.protocol} ${formatTimestamp(aMM.termEndTimestampInMS)}` : '';

  return (
    <MarginAccountBox>
      <AccountBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Account"
          labelColorToken="lavenderWeb2"
          labelTypographyToken="primaryBodyXSmallRegular"
          token=""
          typographyToken="primaryBodyMediumBold"
          value={accountName}
        />
      </AccountBox>
      <BalanceBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Balance"
          labelColorToken="lavenderWeb2"
          labelTypographyToken="primaryBodyXSmallRegular"
          token={token}
          typographyToken="secondaryBodyMediumRegular"
          value={balanceValue}
        />
      </BalanceBox>
    </MarginAccountBox>
  );
};

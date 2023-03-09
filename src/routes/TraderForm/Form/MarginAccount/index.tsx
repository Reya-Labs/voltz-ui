import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMTokenFormatted,
  selectMarginAccountName,
  selectSwapFormPosition,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { compactFormat } from '../../../../utilities/number';
import { AccountBox, BalanceBox, MarginAccountBox } from './MarginAccount.styled';

type MarginAccountProps = {};

export const MarginAccount: React.FunctionComponent<MarginAccountProps> = () => {
  const position = useAppSelector(selectSwapFormPosition);
  const token = useAppSelector(selectAMMTokenFormatted);
  const accountName = useAppSelector(selectMarginAccountName);
  const balanceValue = position ? compactFormat(position.margin) : '--';

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
          label="Margin"
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

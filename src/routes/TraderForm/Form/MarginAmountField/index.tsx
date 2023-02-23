import { TokenField } from 'brokoli-ui';
import React, { useState } from 'react';

import { MarginAmountFieldBox } from './MarginAmountField.styled';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  // todo: Alex handle error logic, and other values
  // todo: Alex handle redux store logic transfer
  const [notionalAmount, handleOnChange] = useState<string | undefined>('0');
  return (
    <MarginAmountFieldBox>
      <TokenField
        bottomLeftText="Additional Margin Required"
        bottomLeftTextColorToken="lavenderWeb3"
        bottomLeftTextTypographyToken="primaryBodyXSmallRegular"
        bottomRightTextColorToken="lavenderWeb"
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={290000.34}
        error={false}
        label="Chosen Margin"
        token="usdc"
        tooltip="TODO: Tooltip message here!"
        topRightText="Wallet: --"
        topRightTextColorToken="lavenderWeb2"
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={notionalAmount}
        onChange={handleOnChange}
      />
    </MarginAmountFieldBox>
  );
};

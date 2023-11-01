import { TokenField, TokenFieldProps, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import { FormNumberLimits } from '../../../../../../app/features/forms/common';
import {
  selectAvailableNotional,
  selectUserInputNotionalInfo,
} from '../../../../../../app/features/forms/trader/deprecated/swap';
import { formatNumber } from '../../../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type NewNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  handleOnNotionalBlur: () => void;
  localNotional: string | null;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
  disabled: boolean;
};

export const NewNotionalAmountFieldUI: React.FunctionComponent<NewNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  handleOnNotionalBlur,
  localNotional,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
  disabled,
}) => {
  const notionalInfo = useAppSelector(selectUserInputNotionalInfo);
  const notionalAvailable = useAppSelector(selectAvailableNotional);

  return (
    <NotionalAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={notionalInfo.error ? notionalInfo.error : 'Liquidity Available'}
        bottomLeftTextColorToken={notionalInfo.error ? 'error100' : 'white400'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={notionalInfo.error ? 'error' : 'white'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        bottomRightTextValue={formatNumber(notionalAvailable)}
        decimalsLimit={FormNumberLimits.decimalLimit}
        disabled={disabled}
        error={notionalInfo.error !== null}
        label="Notional Amount"
        labelTypographyToken={labelTypographyToken}
        maxLength={FormNumberLimits.digitLimit}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="When trading rates, the amount you receive and pay is calculated as a percentage of the notional value you choose."
        value={localNotional !== null ? localNotional : undefined}
        onBlur={handleOnNotionalBlur}
        onChange={handleOnNotionalChange}
      />
    </NotionalAmountFieldBox>
  );
};

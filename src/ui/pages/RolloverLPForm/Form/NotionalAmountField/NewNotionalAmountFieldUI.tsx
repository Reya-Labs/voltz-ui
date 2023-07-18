import { TokenField, TokenFieldProps, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { FormNumberLimits } from '../../../../../app/features/forms/common';
import { selectUserInputNotionalInfo } from '../../../../../app/features/forms/lps/rollover-lp';
import { useAppSelector } from '../../../../../app/hooks';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type NewNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  handleOnNotionalBlur: () => void;
  disabled: boolean;
  localNotional: string | null;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
};

export const NewNotionalAmountFieldUI: React.FunctionComponent<NewNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  localNotional,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
  handleOnNotionalBlur,
  disabled,
}) => {
  const notionalInfo = useAppSelector(selectUserInputNotionalInfo);

  return (
    <NotionalAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={notionalInfo.error ? notionalInfo.error : 'Liquidity Available'}
        bottomLeftTextColorToken={notionalInfo.error ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={notionalInfo.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        decimalsLimit={FormNumberLimits.decimalLimit}
        disabled={disabled}
        error={notionalInfo.error !== null}
        label="Notional Amount"
        labelTypographyToken={labelTypographyToken}
        maxLength={FormNumberLimits.digitLimit}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="When providing liquidity, your profit or loss, generated from fees and funding rate cashflow, is calculated as a percentage of the notional value you choose."
        value={localNotional !== null ? localNotional : undefined}
        onBlur={handleOnNotionalBlur}
        onChange={handleOnNotionalChange}
      />
    </NotionalAmountFieldBox>
  );
};

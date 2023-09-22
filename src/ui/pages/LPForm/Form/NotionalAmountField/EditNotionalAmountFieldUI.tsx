import { TokenFieldProps, TokenSwitchField, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { FormNumberLimits } from '../../../../../app/features/forms/common';
import {
  selectSelectedPositionCompactNotional,
  selectUserInputNotionalAmountEditMode,
  selectUserInputNotionalInfo,
} from '../../../../../app/features/forms/lps/lp';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type EditNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  handleOnSwitchChange: (value: string) => void;
  handleOnNotionalBlur: () => void;
  disabled: boolean;
  localNotional: string | null;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
};

export const EditNotionalAmountFieldUI: React.FunctionComponent<EditNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  handleOnSwitchChange,
  localNotional,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
  disabled,
  handleOnNotionalBlur,
}) => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);

  const bottomLeftText = notionalAmount.error ? notionalAmount.error : '';

  const selectedPositionCompactNotional = useAppSelector(selectSelectedPositionCompactNotional);

  const notionalAmountEditMode = useAppSelector(selectUserInputNotionalAmountEditMode);

  const bottomRightText = notionalAmount.error
    ? selectedPositionCompactNotional.compactNotionalNumber
    : '';

  return (
    <NotionalAmountFieldBox>
      <TokenSwitchField
        allowNegativeValue={false}
        bottomLeftText={bottomLeftText}
        bottomLeftTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        bottomRightTextValue={bottomRightText}
        decimalsLimit={FormNumberLimits.decimalLimit}
        disabled={disabled}
        error={notionalAmount.error !== null}
        label="Notional Amount"
        labelTypographyToken={labelTypographyToken}
        maxLength={FormNumberLimits.digitLimit}
        switchOffText={'Remove'}
        switchOffValue={'remove'}
        switchOnText={'Add'}
        switchOnValue={'add'}
        switchValue={notionalAmountEditMode}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="When providing liquidity, your profit or loss, generated from fees and funding rate cashflow, is calculated as a percentage of the notional value you choose."
        value={localNotional !== null ? localNotional : undefined}
        onBlur={handleOnNotionalBlur}
        onChange={handleOnNotionalChange}
        onSwitchChange={handleOnSwitchChange}
      />
    </NotionalAmountFieldBox>
  );
};

import { TokenFieldProps, TokenSwitchField, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { FormNumberLimits } from '../../../../../app/features/forms/common';
import {
  selectAvailableNotional,
  selectUserInputNotionalInfo,
} from '../../../../../app/features/forms/trader/swap';
import { useAppSelector } from '../../../../../app/hooks';
import { formatNumber } from '../../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type EditNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  handleOnNotionalBlur: () => void;
  handleOnSwitchChange: (value: string) => void;
  localEditMode: 'add' | 'remove';
  localNotional: string | null;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
  disabled: boolean;
};

export const EditNotionalAmountFieldUI: React.FunctionComponent<EditNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  handleOnNotionalBlur,
  handleOnSwitchChange,
  localEditMode,
  localNotional,
  disabled,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
}) => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const notionalAvailable = useAppSelector(selectAvailableNotional);

  const bottomLeftText = notionalAmount.error
    ? notionalAmount.error
    : localEditMode === 'add'
    ? 'Liquidity Available'
    : 'Notional Available';

  return (
    <NotionalAmountFieldBox>
      <TokenSwitchField
        allowNegativeValue={false}
        bottomLeftText={bottomLeftText}
        bottomLeftTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        bottomRightTextValue={formatNumber(notionalAvailable)}
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
        switchValue={localEditMode}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="When trading rates, the amount you receive and pay is calculated as a percentage of the notional value you choose."
        value={localNotional !== null ? localNotional : undefined}
        onBlur={handleOnNotionalBlur}
        onChange={handleOnNotionalChange}
        onSwitchChange={handleOnSwitchChange}
      />
    </NotionalAmountFieldBox>
  );
};

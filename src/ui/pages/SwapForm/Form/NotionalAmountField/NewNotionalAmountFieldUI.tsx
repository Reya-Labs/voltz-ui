import { TokenField, TokenFieldProps, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { FormNumberLimits } from '../../../../../app/features/forms/common';
import {
  selectMaxAvailableNotionalFormatted,
  selectMaxAvailableNotionalForMaxButton,
  selectUserInputNotionalInfo,
} from '../../../../../app/features/forms/trader/swap';
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
  const maxAvailableNotionalAvailableFormatted = useAppSelector(
    selectMaxAvailableNotionalFormatted,
  );
  const maxAvailableNotionalForMaxButton = useAppSelector(selectMaxAvailableNotionalForMaxButton);

  return (
    <NotionalAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={notionalInfo.error ? notionalInfo.error : 'Max Notional Possible'}
        bottomLeftTextColorToken={notionalInfo.error ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={notionalInfo.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        bottomRightTextValue={maxAvailableNotionalAvailableFormatted}
        decimalsLimit={FormNumberLimits.decimalLimit}
        disabled={disabled}
        error={notionalInfo.error !== null}
        label="Notional Size"
        labelColorToken="lavenderWeb"
        labelTypographyToken={labelTypographyToken}
        max={maxAvailableNotionalForMaxButton}
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

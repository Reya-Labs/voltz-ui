import { Position } from '@voltz-protocol/v1-sdk';
import { TokenFieldProps, TokenSwitchField, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  LpFormNumberLimits,
  selectSelectedPositionCompactNotional,
  selectUserInputNotionalInfo,
} from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type EditNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  handleOnSwitchChange: (value: string) => void;
  localEditMode: 'add' | 'remove';
  localNotional: string | null;
  position: Position;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
};

export const EditNotionalAmountFieldUI: React.FunctionComponent<EditNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  handleOnSwitchChange,
  localEditMode,
  localNotional,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
}) => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);

  // todo: only applies in edit position mode -> consider adding that check as well

  const bottomLeftText = notionalAmount.error ? notionalAmount.error : '';

  const selectedPositionCompactNotional = useAppSelector(selectSelectedPositionCompactNotional);

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
        decimalsLimit={LpFormNumberLimits.decimalLimit}
        error={notionalAmount.error !== null}
        label="Notional Amount"
        labelTypographyToken={labelTypographyToken}
        maxLength={LpFormNumberLimits.digitLimit}
        switchOffText={'Remove'}
        switchOffValue={'remove'}
        switchOnText={'Add'}
        switchOnValue={'add'}
        switchValue={localEditMode}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="TODO: fix copy"
        value={localNotional !== null ? localNotional : undefined}
        onChange={handleOnNotionalChange}
        onSwitchChange={handleOnSwitchChange}
      />
    </NotionalAmountFieldBox>
  );
};

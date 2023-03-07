import { Position } from '@voltz-protocol/v1-sdk';
import { TokenFieldProps, TokenSwitchField } from 'brokoli-ui';
import React from 'react';

import {
  selectAvailableNotional,
  selectUserInputNotionalInfo,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type EditNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  handleOnSwitchChange: (value: string) => void;
  localEditMode: 'add' | 'remove';
  localNotional: string | null;
  position: Position;
  underlyingTokenName: string;
};

export const EditNotionalAmountFieldUI: React.FunctionComponent<EditNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  handleOnSwitchChange,
  localEditMode,
  localNotional,
  underlyingTokenName,
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
        bottomRightTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={formatNumber(notionalAvailable)}
        decimalsLimit={SwapFormNumberLimits.decimalLimit}
        error={notionalAmount.error !== null}
        label="Notional amount"
        maxLength={SwapFormNumberLimits.digitLimit}
        switchOffText={'Remove'}
        switchOffValue={'remove'}
        switchOnText={'Add'}
        switchOnValue={'add'}
        switchValue={localEditMode}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="When you swap rates, the amount you receive and pay is calculated as a percentage or the notional value you choose."
        value={localNotional !== null ? localNotional : undefined}
        onChange={handleOnNotionalChange}
        onSwitchChange={handleOnSwitchChange}
      />
    </NotionalAmountFieldBox>
  );
};

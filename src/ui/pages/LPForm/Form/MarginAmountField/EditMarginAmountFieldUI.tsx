import { TokenFieldProps, TokenSwitchField, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  LpFormNumberLimits,
  selectBottomRightMarginNumber,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectUserInputMarginAmountEditMode,
  selectUserInputMarginInfo,
  selectWalletBalance,
} from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MarginAmountFieldBox } from './MarginAmountField.styled';

type EditMarginAmountFieldUIProps = {
  handleOnMarginChange: (value?: string) => void;
  handleOnSwitchChange: (value: string) => void;
  localMargin: string | null;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  topRightTextTypographyToken: TypographyToken;
};

export const EditMarginAmountFieldUI: React.FunctionComponent<EditMarginAmountFieldUIProps> = ({
  handleOnMarginChange,
  handleOnSwitchChange,
  localMargin,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
  topRightTextTypographyToken,
}) => {
  const isMarginRequiredError = useAppSelector(selectIsMarginRequiredError);
  const isWalletMarginError = useAppSelector(selectIsWalletMarginError);
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const walletBalance = useAppSelector(selectWalletBalance);
  const marginAmountEditMode = useAppSelector(selectUserInputMarginAmountEditMode);

  const bottomLeftText = isMarginRequiredError
    ? (marginAmount.error as string)
    : marginAmountEditMode === 'add'
    ? 'Additional Margin Required'
    : 'Available margin to withdraw';

  const bottomRightNumber = useAppSelector(selectBottomRightMarginNumber);

  return (
    <MarginAmountFieldBox>
      <TokenSwitchField
        allowNegativeValue={false}
        bottomLeftText={bottomLeftText}
        bottomLeftTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        bottomRightTextValue={bottomRightNumber !== null ? bottomRightNumber : '--'}
        decimalsLimit={LpFormNumberLimits.decimalLimit}
        error={isMarginRequiredError || isWalletMarginError}
        label="Chosen Margin"
        labelTypographyToken={labelTypographyToken}
        maxLength={LpFormNumberLimits.digitLimit}
        switchOffText={'Withdraw'}
        switchOffValue={'remove'}
        switchOnText={'Deposit'}
        switchOnValue={'add'}
        switchValue={marginAmountEditMode}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="The protocol requires every lp position to have enough margin to support trades against their liquidity. Adding more than the minimum reduces liquidation risk."
        topRightText={`Wallet: ${walletBalance} ${underlyingTokenName.toUpperCase()}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry' : 'lavenderWeb2'}
        topRightTextTypographyToken={topRightTextTypographyToken}
        value={localMargin !== null ? localMargin : undefined}
        onChange={handleOnMarginChange}
        onSwitchChange={handleOnSwitchChange}
      />
    </MarginAmountFieldBox>
  );
};

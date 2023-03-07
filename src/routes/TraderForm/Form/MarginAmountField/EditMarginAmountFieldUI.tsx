import { TokenFieldProps, TokenSwitchField } from 'brokoli-ui';
import React from 'react';

import {
  selectBottomRightMarginNumber,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectUserInputMarginInfo,
  selectWalletBalanceInfo,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { compactFormat } from '../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';

type EditMarginAmountFieldUIProps = {
  handleOnMarginChange: (value?: string) => void;
  handleOnSwitchChange: (value: string) => void;
  localEditMode: 'add' | 'remove';
  localMargin: string | null;
  underlyingTokenName: string;
};

export const EditMarginAmountFieldUI: React.FunctionComponent<EditMarginAmountFieldUIProps> = ({
  handleOnMarginChange,
  handleOnSwitchChange,
  localEditMode,
  localMargin,
  underlyingTokenName,
}) => {
  const isMarginRequiredError = useAppSelector(selectIsMarginRequiredError);
  const isWalletMarginError = useAppSelector(selectIsWalletMarginError);
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const walletBalance = useAppSelector(selectWalletBalanceInfo);
  const walletValue =
    walletBalance.status === 'success' ? compactFormat(walletBalance.value) : '--';

  const bottomLeftText = isMarginRequiredError
    ? (marginAmount.error as string)
    : localEditMode === 'add'
    ? 'Additional Margin Required'
    : 'Available margin to withdraw';

  const bottomRightNumber = useAppSelector(selectBottomRightMarginNumber);

  return (
    <MarginAmountFieldBox>
      <TokenSwitchField
        allowNegativeValue={false}
        bottomLeftText={bottomLeftText}
        bottomLeftTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken="primaryBodyXSmallRegular"
        bottomRightTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={bottomRightNumber !== null ? bottomRightNumber : '--'}
        decimalsLimit={SwapFormNumberLimits.decimalLimit}
        error={isMarginRequiredError || isWalletMarginError}
        label="Chosen Margin"
        maxLength={SwapFormNumberLimits.digitLimit}
        switchOffText={'Remove'}
        switchOffValue={'remove'}
        switchOnText={'Add'}
        switchOnValue={'add'}
        switchValue={localEditMode}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="The protocol requires every position to have enough collateral to support the swap. You can add more than the minimum, but positions with lower leverage tend to be less capital efficient, albeit more secure."
        topRightText={`Wallet: ${`${walletValue} ${underlyingTokenName.toUpperCase()}`}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry' : 'lavenderWeb2'}
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={localMargin !== null ? localMargin : undefined}
        onChange={handleOnMarginChange}
        onSwitchChange={handleOnSwitchChange}
      />
    </MarginAmountFieldBox>
  );
};
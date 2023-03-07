import { TokenField, TokenFieldProps } from 'brokoli-ui';
import React from 'react';

import {
  selectInfoPostSwap,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectUserInputMarginInfo,
  selectWalletBalanceInfo,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { compactFormat, formatNumber } from '../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';

type NewMarginAmountFieldUIProps = {
  handleOnMarginChange: (value?: string) => void;
  localMargin: string | null;
  underlyingTokenName: string;
};

export const NewMarginAmountFieldUI: React.FunctionComponent<NewMarginAmountFieldUIProps> = ({
  handleOnMarginChange,
  localMargin,
  underlyingTokenName,
}) => {
  const isMarginRequiredError = useAppSelector(selectIsMarginRequiredError);
  const isWalletMarginError = useAppSelector(selectIsWalletMarginError);
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const walletBalance = useAppSelector(selectWalletBalanceInfo);
  const walletValue =
    walletBalance.status === 'success' ? compactFormat(walletBalance.value) : '--';

  return (
    <MarginAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={
          isMarginRequiredError ? (marginAmount.error as string) : 'Additional Margin Required'
        }
        bottomLeftTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken="primaryBodyXSmallRegular"
        bottomRightTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={
          infoPostSwap.status === 'success'
            ? formatNumber(infoPostSwap.value.marginRequirement)
            : '--'
        }
        decimalsLimit={SwapFormNumberLimits.decimalLimit}
        error={isMarginRequiredError || isWalletMarginError}
        label="Chosen Margin"
        maxLength={SwapFormNumberLimits.digitLimit}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="The protocol requires every position to have enough collateral to support the swap. You can add more than the minimum, but positions with lower leverage tend to be less capital efficient, albeit more secure."
        topRightText={`Wallet: ${`${walletValue} ${underlyingTokenName.toUpperCase()}`}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry' : 'lavenderWeb2'}
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={localMargin !== null ? localMargin : undefined}
        onChange={handleOnMarginChange}
      />
    </MarginAmountFieldBox>
  );
};

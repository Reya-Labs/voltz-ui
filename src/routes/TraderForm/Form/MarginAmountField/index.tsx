import { TokenField, TokenFieldProps } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectInfoPostSwap,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectMarginAmount,
  selectSwapFormAMM,
  selectWalletBalanceInfo,
  setMarginAmountAction,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { compactFormat, formatNumber } from '../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectMarginAmount);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const aMM = useAppSelector(selectSwapFormAMM);

  const isMarginRequiredError = useAppSelector(selectIsMarginRequiredError);
  const isWalletMarginError = useAppSelector(selectIsWalletMarginError);

  const walletBalance = useAppSelector(selectWalletBalanceInfo);
  let walletValue = walletBalance.status === 'success' ? compactFormat(walletBalance.value) : '--';
  if (aMM) {
    walletValue = walletValue.concat(` ${aMM.underlyingToken.name.toUpperCase()}`);
  }

  const handleOnChange = useCallback(
    (value?: string) => {
      if (!value) {
        return;
      }
      dispatch(
        setMarginAmountAction({
          value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <MarginAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={
          isMarginRequiredError ? (marginAmount.error as string) : 'Additional Margin Required'
        }
        bottomLeftTextColorToken={isMarginRequiredError ? 'wildStrawberry3' : 'lavenderWeb3'}
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
        token={
          aMM ? (aMM.underlyingToken.name.toLowerCase() as TokenFieldProps['token']) : undefined
        }
        tooltip="The protocol requires every position to have enough collateral to support the swap. You can add more than the minimum, but positions with lower leverage tend to be less capital efficient, albeit more secure."
        topRightText={`Wallet: ${walletValue}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry2' : 'lavenderWeb2'}
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={marginAmount.value}
        onChange={handleOnChange}
      />
    </MarginAmountFieldBox>
  );
};

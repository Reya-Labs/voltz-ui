import { TokenField, TokenFieldProps } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectInfoPostSwap,
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

  const marginRequiredError = marginAmount.error !== null && marginAmount.error !== 'WLT';
  const walletError = marginAmount.error === 'WLT';

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
          marginRequiredError ? (marginAmount.error as string) : 'Additional Margin Required'
        }
        bottomLeftTextColorToken={marginRequiredError ? 'wildStrawberry3' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken="primaryBodyXSmallRegular"
        bottomRightTextColorToken={marginRequiredError ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={
          infoPostSwap.status === 'success'
            ? formatNumber(infoPostSwap.value.marginRequirement)
            : '--'
        }
        decimalsLimit={SwapFormNumberLimits.decimalLimit}
        error={marginRequiredError || walletError}
        label="Chosen Margin"
        maxLength={SwapFormNumberLimits.digitLimit}
        token={
          aMM ? (aMM.underlyingToken.name.toLowerCase() as TokenFieldProps['token']) : undefined
        }
        tooltip="The protocol requires every position to have enough collateral to support the swap. You can add more than the minimum, but positions with lower leverage tend to be less capital efficient, albeit more secure."
        topRightText={`Wallet: ${walletValue}`}
        topRightTextColorToken={walletError ? 'wildStrawberry2' : 'lavenderWeb2'}
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={marginAmount.value}
        onChange={handleOnChange}
      />
    </MarginAmountFieldBox>
  );
};

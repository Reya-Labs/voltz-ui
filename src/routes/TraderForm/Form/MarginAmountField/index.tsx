import { TokenField, TokenFieldProps } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  selectInfoPostSwap,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectSwapFormAMM,
  selectUserInputMarginInfo,
  selectWalletBalanceInfo,
  setMarginAmountAction,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { compactFormat, formatNumber, stringToBigFloat } from '../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const aMM = useAppSelector(selectSwapFormAMM);

  const isMarginRequiredError = useAppSelector(selectIsMarginRequiredError);
  const isWalletMarginError = useAppSelector(selectIsWalletMarginError);

  const [localMargin, setLocalMargin] = useState<string | null>(marginAmount.value.toString());

  const walletBalance = useAppSelector(selectWalletBalanceInfo);

  useEffect(() => {
    setLocalMargin(marginAmount.value.toString());
  }, [marginAmount.value]);

  const debouncedSetMarginAmount = useMemo(
    () =>
      debounce((value: number) => {
        dispatch(
          setMarginAmountAction({
            value,
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnChange = useCallback(
    (value?: string) => {
      setLocalMargin(value ?? null);

      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : 0;
      debouncedSetMarginAmount(valueAsNumber);
    },
    [debouncedSetMarginAmount],
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetMarginAmount.cancel();
    };
  }, []);

  if (!aMM) {
    return null;
  }

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
        token={aMM.underlyingToken.name.toLowerCase() as TokenFieldProps['token']}
        tooltip="The protocol requires every position to have enough collateral to support the swap. You can add more than the minimum, but positions with lower leverage tend to be less capital efficient, albeit more secure."
        topRightText={`Wallet: ${`${walletValue} ${aMM.underlyingToken.name.toUpperCase()}`}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry' : 'lavenderWeb2'}
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={localMargin !== null ? localMargin : undefined}
        onChange={handleOnChange}
      />
    </MarginAmountFieldBox>
  );
};

import { TokenField, TokenFieldProps } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectInfoPostSwap,
  selectMarginAmount,
  selectWalletBalanceInfo,
  setMarginAmountAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSwapFormAMM } from '../../../../hooks/useSwapFormAMM';
import { compactFormat, formatNumber } from '../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectMarginAmount);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);

  const { aMM } = useSwapFormAMM();

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
        bottomLeftText={marginAmount.error ? marginAmount.error : 'Additional Margin Required'}
        bottomLeftTextColorToken={marginAmount.error ? 'wildStrawberry3' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken="primaryBodyXSmallRegular"
        bottomRightTextColorToken={marginAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={
          infoPostSwap.status === 'success'
            ? formatNumber(infoPostSwap.value.marginRequirement)
            : '--'
        }
        error={marginAmount.error !== null}
        label="Chosen Margin"
        token={
          aMM ? (aMM.underlyingToken.name.toLowerCase() as TokenFieldProps['token']) : undefined
        }
        tooltip="TODO: Tooltip message here!"
        topRightText={`Wallet: ${walletValue}`}
        topRightTextColorToken="lavenderWeb2"
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={marginAmount.value}
        onChange={handleOnChange}
      />
    </MarginAmountFieldBox>
  );
};

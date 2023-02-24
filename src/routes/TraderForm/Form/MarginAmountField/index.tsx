import { TokenField } from 'brokoli-ui';
// eslint-disable-next-line no-restricted-imports
import { TokenIconProps } from 'brokoli-ui/dist/esm/types/components/TokenField/TokenIcon';
import React, { useCallback } from 'react';

import {
  selectInfoPostSwap,
  selectMarginAmount,
  setMarginAmountAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSwapFormAMM } from '../../../../hooks/useSwapFormAMM';
import { formatNumber } from '../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectMarginAmount);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);

  const { aMM } = useSwapFormAMM();

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
        token={aMM ? (aMM.underlyingToken.name.toLowerCase() as TokenIconProps['token']) : 'usdc'} // TODO Alex
        tooltip="TODO: Tooltip message here!"
        topRightText="Wallet: --"
        topRightTextColorToken="lavenderWeb2"
        topRightTextTypographyToken="secondaryBodySmallRegular"
        value={marginAmount.value}
        onChange={handleOnChange}
      />
    </MarginAmountFieldBox>
  );
};

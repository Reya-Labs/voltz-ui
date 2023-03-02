import { LeverageField as BrokoliLeverageField } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectLeverage,
  selectLeverageOptions,
  selectNotionalAmount,
  setLeverageAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { LeverageFieldBox } from './LeverageField.styled';
type NotionalAmountProps = {};

export const LeverageField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();

  const notionalInfo = useAppSelector(selectNotionalAmount);
  const leverage = useAppSelector(selectLeverage);

  const { maxLeverage, leverageOptions } = useAppSelector(selectLeverageOptions);

  const handleOnChange = useCallback(
    (value: number) => {
      dispatch(
        setLeverageAction({
          value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <LeverageFieldBox>
      <BrokoliLeverageField
        disabled={notionalInfo.error !== null || notionalInfo.value === '0'}
        label="Leverage"
        labelColorToken="lavenderWeb2"
        labelTypographyToken="primaryBodySmallRegular"
        leverageOptions={leverageOptions}
        maxLeverageColorToken="lavenderWeb3"
        maxLeverageText={`Max ${maxLeverage}x Leverage`}
        maxLeverageTypographyToken="primaryBodySmallRegular"
        tooltip="Leverage is notional amount divided by margin amount, and represents the maximum delta between the rates your position is collateralized to withstand."
        tooltipColorToken="lavenderWeb2"
        value={leverage || undefined}
        onLeverageChange={handleOnChange}
      />
    </LeverageFieldBox>
  );
};

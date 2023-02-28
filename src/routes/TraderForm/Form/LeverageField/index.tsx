import { LeverageField as BrokoliLeverageField } from 'brokoli-ui';
import React, { useState } from 'react';

import { LeverageFieldBox } from './LeverageField.styled';
type NotionalAmountProps = {};

export const LeverageField: React.FunctionComponent<NotionalAmountProps> = () => {
  // todo: Alex handle error logic, and other values
  // todo: Alex handle redux store logic transfer
  const [leverage, setLeverage] = useState<number>(5);
  return (
    <LeverageFieldBox>
      <BrokoliLeverageField
        label="Leverage"
        labelColorToken="lavenderWeb2"
        labelTypographyToken="primaryBodySmallRegular"
        leverageOptions={[10, 50, 100]}
        maxLeverageColorToken="lavenderWeb3"
        maxLeverageText="Max 8,000x Leverage"
        maxLeverageTypographyToken="primaryBodySmallRegular"
        tooltip="Leverage is notional amount divided by margin amount, and represents the maximum delta between the rates your position is collateralized to withstand."
        tooltipColorToken="lavenderWeb2"
        value={leverage}
        onLeverageChange={setLeverage}
      />
    </LeverageFieldBox>
  );
};

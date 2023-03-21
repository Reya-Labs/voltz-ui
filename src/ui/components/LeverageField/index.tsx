import { LeverageField as BrokoliLeverageField, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../hooks/useResponsiveQuery';
import { LeverageFieldBox } from './LeverageField.styled';

type LeverageFieldProps = {
  disabled: boolean;
  leverageOptions: number[];
  maxLeverage: string;
  leverage: number | undefined;
  onLeverageChange: (leverage: number, changeType: 'button' | 'input') => void;
};
export const LeverageField: React.FunctionComponent<LeverageFieldProps> = ({
  leverageOptions,
  leverage,
  onLeverageChange,
  maxLeverage,
  disabled,
}) => {
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const maxLeverageTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return (
    <LeverageFieldBox>
      <BrokoliLeverageField
        disabled={disabled}
        label="Leverage"
        labelColorToken="lavenderWeb2"
        labelTypographyToken={labelTypographyToken}
        leverageOptions={leverageOptions}
        maxLeverageColorToken="lavenderWeb3"
        maxLeverageText={`Max ${maxLeverage}x Leverage`}
        maxLeverageTypographyToken={maxLeverageTypographyToken}
        tooltip="Leverage is the notional amount divided by the margin amount. The more leverage you take the higher your potential profit or loss."
        tooltipColorToken="lavenderWeb2"
        value={leverage}
        onLeverageChange={onLeverageChange}
      />
    </LeverageFieldBox>
  );
};

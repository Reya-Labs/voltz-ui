import React from 'react';

import { IconLabel } from '../../../../../components/composite/IconLabel/IconLabel';
import { formatCurrency } from '../../../../../utilities/number';
import {
  GasCostBox,
  GasCostInputLabel,
  GasCostTokenTypography,
  GasCostTypography,
  GasIcon,
} from './GasCost.styled';

type GasCostProps = {
  gasCost: number;
};

export const GasCost = ({ gasCost }: GasCostProps) => (
  <GasCostBox data-testid="GasCost-GasCostBox">
    <GasIcon data-testid="GasCost-GasIcon" />
    <GasCostTokenTypography>
      {gasCost === -1 ? (
        <GasCostTypography data-testid="GasCost-GasCostLoading">---</GasCostTypography>
      ) : (
        <>
          $
          <GasCostTypography data-testid="GasCost-GasCostUSD">
            {formatCurrency(gasCost)}
          </GasCostTypography>
        </>
      )}
    </GasCostTokenTypography>
    <GasCostInputLabel shrink>
      <IconLabel
        data-testid="GasCost-IconLabel"
        icon="information-circle"
        info="This gas calculation is only an estimation, and the final gas cost will be defined when the transaction is executed. You can change configurations on gas prices in your wallet provider."
        label=""
      />
    </GasCostInputLabel>
  </GasCostBox>
);

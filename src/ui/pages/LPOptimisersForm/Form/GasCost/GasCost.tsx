import { ExclaimTooltip, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../app/features/forms/common';
import { Icon } from '../../../../components/Icon/Icon';
import { GasCostBox } from './GasCost.styled';

type GasCostProps = {
  gasCost: number;
};

export const GasCost = ({ gasCost }: GasCostProps) => (
  <GasCostBox data-testid="GasCost-GasCostBox">
    <Icon data-testid="GasCost-GasIcon" name="gasIcon" />
    {gasCost === -1 ? (
      <Typography
        colorToken="white400"
        data-testid="GasCost-GasCostLoading"
        typographyToken="primaryBodyMediumRegular"
      >
        ---
      </Typography>
    ) : (
      <TokenTypography
        colorToken="white"
        data-testid="GasCost-GasCostUSD"
        prefixToken="$"
        token=""
        typographyToken="primaryBodyMediumRegular"
        value={formFormatNumber(gasCost)}
      />
    )}
    <ExclaimTooltip>
      This gas calculation is only an estimation, and the final gas cost will be defined when the
      transaction is executed. You can change configurations on gas prices in your wallet provider.
    </ExclaimTooltip>
  </GasCostBox>
);

import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { ProgressBar } from '../../../../components/atomic/ProgressBar/ProgressBar';
import { Typography } from '../../../../components/atomic/Typography/Typography';
import { formatCurrency } from '../../../../utilities/number';
import { VaultField } from '../../Common/VaultField';
import { MellowProduct } from '../../types';
import {
  CapBarBox,
  CapBarTitleTypography,
  PositionBox,
  PositionLabelTypography,
  PositionValueTypography,
  VaultInfoBox,
} from './LPMellowVaultDepositInfo.styled';

export type LPMellowVaultDepositInfoProps = {
  mellowProduct: MellowProduct;
};
export const LPMellowVaultDepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  mellowProduct,
}: LPMellowVaultDepositInfoProps) => {
  const getCapBar = () => {
    if (
      isUndefined(mellowProduct.vault.vaultCap) ||
      isUndefined(mellowProduct.vault.vaultCumulative)
    ) {
      return;
    }

    const percentage = Math.floor(mellowProduct.vault.vaultCap * 100 + 0.5) / 100;

    return (
      <CapBarBox>
        <CapBarTitleTypography>DEPOSITS</CapBarTitleTypography>
        <ProgressBar
          leftContent={
            <Typography color="#E5E1F9" marginLeft="0px" variant="h6">
              {mellowProduct.metadata.token}
            </Typography>
          }
          middleContent={
            <Typography color="#E5E1F9" marginLeft="0px" variant="h6">
              {formatCurrency(mellowProduct.vault.vaultCumulative, true)}
            </Typography>
          }
          percentageComplete={percentage}
          rightContent={
            <Typography color="#E5E1F9" marginLeft="0px" variant="h6">
              {`${percentage.toString()}%`}
            </Typography>
          }
        />
      </CapBarBox>
    );
  };

  return (
    <VaultInfoBox>
      <VaultField
        expectedApy={mellowProduct.metadata.estimatedHistoricApy}
        maturity={mellowProduct.metadata.maturity}
        title={mellowProduct.metadata.title}
        token={mellowProduct.metadata.token}
      />

      {getCapBar()}

      <PositionBox>
        <PositionLabelTypography>YOUR POSITION:</PositionLabelTypography>
        <PositionValueTypography>
          {isUndefined(mellowProduct.vault.userDeposit)
            ? '---'
            : `${formatCurrency(mellowProduct.vault.userDeposit, true)} ${
                mellowProduct.metadata.token
              }`}
        </PositionValueTypography>
      </PositionBox>
    </VaultInfoBox>
  );
};

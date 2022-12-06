import isUndefined from 'lodash.isundefined';
import React from 'react';

import { MellowProduct } from '../../../../../store/features/ecosystem/getMellowLPVaults/config';
import { formatCurrency } from '../../../../../utilities/number';
import { VaultField } from '../../../VaultField/VaultField';
import {
  PositionBox,
  PositionLabelTypography,
  PositionValueTypography,
  VaultInfoBox,
} from './DepositInfo.styled';

export type LPMellowVaultDepositInfoProps = {
  mellowProduct: MellowProduct;
};
export const DepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  mellowProduct,
}: LPMellowVaultDepositInfoProps) => (
  <VaultInfoBox>
    <VaultField
      expectedApy={mellowProduct.metadata.estimatedHistoricApy}
      maturity={mellowProduct.metadata.maturity}
      title={mellowProduct.metadata.title}
      token={mellowProduct.metadata.token}
    />
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

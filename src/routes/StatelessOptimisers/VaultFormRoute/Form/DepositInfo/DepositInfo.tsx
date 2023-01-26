import isUndefined from 'lodash.isundefined';
import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/stateless-optimisers';
import { formatCurrency } from '../../../../../utilities/number';
import { VaultField } from '../../../VaultField/VaultField';
import {
  PendingDepositAmountSpan,
  PendingDepositTypography,
  PositionBox,
  PositionLabelTypography,
  PositionValueTypography,
  VaultInfoBox,
} from './DepositInfo.styled';

export type LPMellowVaultDepositInfoProps = {
  mellowProduct: OptimiserInfo;
  weights: number[];
};

export const DepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  mellowProduct,
  weights,
}: LPMellowVaultDepositInfoProps) => (
  <VaultInfoBox>
    <VaultField
      expectedApys={mellowProduct.vaults.map((v) => v.estimatedHistoricApy)}
      title={mellowProduct.title}
      token={mellowProduct.tokenName}
      weights={weights}
    />
    <PositionBox>
      <PositionLabelTypography>YOUR POSITION:</PositionLabelTypography>
      <PositionValueTypography>
        {isUndefined(mellowProduct.userRouterDeposit)
          ? '---'
          : `${formatCurrency(mellowProduct.userRouterDeposit, true)} ${mellowProduct.tokenName}`}
      </PositionValueTypography>
    </PositionBox>
    {mellowProduct.userRouterPendingDeposit > 0 && (
      <PendingDepositTypography>
        {`Pending `}
        <PendingDepositAmountSpan>
          {`${mellowProduct.userRouterPendingDeposit.toFixed(2)} ${mellowProduct.tokenName}`}
        </PendingDepositAmountSpan>
        {` will be deposited at 7PM UTC`}
      </PendingDepositTypography>
    )}
  </VaultInfoBox>
);

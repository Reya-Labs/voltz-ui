import { MellowLpRouter, MellowProduct } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React from 'react';

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
  mellowProduct: MellowProduct;
  weights: number[];
};

export const DepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  mellowProduct,
  weights,
}: LPMellowVaultDepositInfoProps) => (
  <VaultInfoBox>
    <VaultField
      expectedApys={mellowProduct.metadata.vaults.map((v) => v.estimatedHistoricApy)}
      title={mellowProduct.metadata.title}
      token={mellowProduct.metadata.token}
      weights={weights}
    />
    <PositionBox>
      <PositionLabelTypography>YOUR POSITION:</PositionLabelTypography>
      <PositionValueTypography>
        {isUndefined(mellowProduct.userDeposit)
          ? '---'
          : `${formatCurrency(mellowProduct.userDeposit, true)} ${mellowProduct.metadata.token}`}
      </PositionValueTypography>
    </PositionBox>
    {mellowProduct instanceof MellowLpRouter && mellowProduct.userPendingDeposit > 0 && (
      <PendingDepositTypography>
        {`Pending `}
        <PendingDepositAmountSpan>
          {`${mellowProduct.userPendingDeposit.toFixed(2)} ${mellowProduct.metadata.token}`}
        </PendingDepositAmountSpan>
        {` will be deposited at 7PM UTC`}
      </PendingDepositTypography>
    )}
  </VaultInfoBox>
);

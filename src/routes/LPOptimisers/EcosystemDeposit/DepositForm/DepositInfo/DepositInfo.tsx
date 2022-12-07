import { MellowLpRouter } from '@voltz-protocol/v1-sdk/';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { MellowProduct } from '../../../../../store/features/ecosystem/getMellowLPVaults/config';
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
        {isUndefined(mellowProduct.vault.userDeposit)
          ? '---'
          : `${formatCurrency(mellowProduct.vault.userDeposit, true)} ${
              mellowProduct.metadata.token
            }`}
      </PositionValueTypography>
    </PositionBox>
    {mellowProduct.vault instanceof MellowLpRouter && mellowProduct.vault.userPendingDeposit > 0 && (
      <PendingDepositTypography>
        {`Pending `}
        <PendingDepositAmountSpan>
          {`${mellowProduct.vault.userPendingDeposit.toFixed(2)} ${mellowProduct.metadata.token}`}
        </PendingDepositAmountSpan>
        {` will be deposited at 7PM UTC`}
      </PendingDepositTypography>
    )}
  </VaultInfoBox>
);

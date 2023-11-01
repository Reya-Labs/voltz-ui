import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../app/features/forms/common';
import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { VaultField } from '../../../../components/VaultField/VaultField';
import {
  PendingDepositAmountSpan,
  PendingDepositTypography,
  PositionBox,
  VaultInfoBox,
} from './DepositInfo.styled';

export type LPMellowVaultDepositInfoProps = {
  mellowProduct: OptimiserInfo;
  weights: number[];
};

export const DepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  mellowProduct,
  weights,
}: LPMellowVaultDepositInfoProps) => {
  const userOptimiserPendingDeposit = mellowProduct.userOptimiserPendingDeposit;
  const userOptimiserDeposit = mellowProduct.userOptimiserDeposit;
  return (
    <VaultInfoBox>
      <VaultField
        expectedApys={mellowProduct.vaults.map((v) => v.estimatedHistoricApy)}
        title={mellowProduct.title}
        token={mellowProduct.tokenName}
        weights={weights}
      />
      <PositionBox>
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          Your Position:
        </Typography>
        <TokenTypography
          colorToken="white"
          token={` ${mellowProduct.tokenName}`}
          typographyToken="primaryBodySmallRegular"
          value={
            userOptimiserDeposit === undefined ? '---' : formFormatNumber(userOptimiserDeposit)
          }
        />
      </PositionBox>
      {userOptimiserPendingDeposit > 0 && (
        <PendingDepositTypography colorToken="white400" typographyToken="primaryBodySmallRegular">
          {`Pending `}
          <PendingDepositAmountSpan>
            {`${userOptimiserPendingDeposit.toFixed(2)} ${mellowProduct.tokenName}`}
          </PendingDepositAmountSpan>
          {` will be deposited at 7PM UTC`}
        </PendingDepositTypography>
      )}
    </VaultInfoBox>
  );
};

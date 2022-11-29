import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { ProgressBar } from '../../../../components/atomic/ProgressBar/ProgressBar';
import { Typography } from '../../../../components/atomic/Typography/Typography';
import { formatCurrency } from '../../../../utilities/number';
import { VaultField } from '../../Common/VaultField';
import { MellowProduct } from '../../types';

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
      <Box sx={{ marginTop: '16px' }}>
        <Typography sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }} variant="h6">
          DEPOSITS
        </Typography>
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
      </Box>
    );
  };

  return (
    <Box>
      <VaultField
        expectedApy={mellowProduct.metadata.estimatedHistoricApy}
        maturity={mellowProduct.metadata.maturity}
        title={mellowProduct.metadata.title}
        token={mellowProduct.metadata.token}
      />

      {getCapBar()}

      <Box
        sx={{
          display: 'flex',
          borderRadius: '4px',
          padding: '8px 16px',
          border: '1px solid #1E1933',
          background: '#1E1933',
          marginTop: '16px',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#8B879D' }} variant="h6">
          YOUR POSITION:
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#4DE5FF', paddingLeft: '8px' }} variant="h6">
          {isUndefined(mellowProduct.vault.userDeposit)
            ? '---'
            : `${formatCurrency(mellowProduct.vault.userDeposit, true)} ${
                mellowProduct.metadata.token
              }`}
        </Typography>
      </Box>
    </Box>
  );
};

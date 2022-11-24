import { Box } from '@mui/material';
import { ProgressBar } from '@components/composite';
import { Typography } from '@components/atomic';
import { formatCurrency } from '../../../../utilities';
import { isUndefined } from 'lodash';
import { VaultField } from '../../Common/VaultField';
import { MellowProduct } from '../../types';

export type LPMellowVaultDepositInfoProps = {
  mellowProduct: MellowProduct;
};
const LPMellowVaultDepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
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
        <Typography variant="h6" sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }}>
          DEPOSITS
        </Typography>
        <ProgressBar
          leftContent={
            <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
              {mellowProduct.metadata.token}
            </Typography>
          }
          middleContent={
            <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
              {formatCurrency(mellowProduct.vault.vaultCumulative, true)}
            </Typography>
          }
          rightContent={
            <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
              {percentage.toString() + '%'}
            </Typography>
          }
          percentageComplete={percentage}
        />
      </Box>
    );
  };

  const renderContent = () => {
    return (
      <Box>
        <VaultField
          title={mellowProduct.metadata.title}
          token={mellowProduct.metadata.token}
          maturity={mellowProduct.metadata.maturity}
          expectedApy={mellowProduct.metadata.estimatedHistoricApy}
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
          <Typography variant="h6" sx={{ fontSize: '14px', color: '#8B879D' }}>
            YOUR POSITION:
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '14px', color: '#4DE5FF', paddingLeft: '8px' }}>
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

  return renderContent();
};

export default LPMellowVaultDepositInfo;

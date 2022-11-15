import { Box, Skeleton, Typography } from '@mui/material';
import { AugmentedMellowLpVault, formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';
import { ProgressBar } from '@components/composite';

export type LPMellowVaultInfoProps = {
  lpVault: AugmentedMellowLpVault;
};
const LPMellowVaultInfo: React.FunctionComponent<LPMellowVaultInfoProps> = ({
  lpVault,
}: LPMellowVaultInfoProps) => {
  const getCapBar = () => {
    const loading = isUndefined(lpVault.vaultCap) || isUndefined(lpVault.vaultAccumulative);
    const percentage = loading ? 0 : Math.floor((lpVault?.vaultCap || 0) * 100 + 0.5) / 100;

    return (
      <Box>
        {loading ? (
          <Skeleton variant="rectangular" sx={{ height: '70px' }} />
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{ fontSize: '12px', lineHeight: '14px', color: '#9B97AD', marginLeft: '0px' }}
            >
              DEPOSITS
            </Typography>
            <ProgressBar
              isMaturity={true}
              leftContent={
                <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                  {lpVault.tokenName}
                </Typography>
              }
              middleContent={
                <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                  {formatCurrency(lpVault?.vaultAccumulative || 0, true)}
                </Typography>
              }
              rightContent={
                <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                  {percentage.toString() + '%'}
                </Typography>
              }
              percentageComplete={percentage}
            />
          </>
        )}
      </Box>
    );
  };

  return getCapBar();
};

export default LPMellowVaultInfo;

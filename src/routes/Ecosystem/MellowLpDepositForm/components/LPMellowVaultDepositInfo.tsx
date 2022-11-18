import { Box } from '@mui/material';
import { ProgressBar } from '@components/composite';
import { Panel, Typography } from '@components/atomic';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';
import { VaultField } from '../../Common/VaultField';

export type LPMellowVaultDepositInfoProps = {
  vaultCap?: number;
  vaultCumulative?: number;
  tokenName: string;
  protocol?: string;
  expectedApy: string;
  maturity: string;
  userDeposit?: number;
};
const LPMellowVaultDepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  vaultCap,
  vaultCumulative,
  tokenName,
  expectedApy,
  maturity,
  userDeposit,
}: LPMellowVaultDepositInfoProps) => {
  const getCapBar = () => {
    if (isUndefined(vaultCap) || isUndefined(vaultCumulative)) {
      return;
    }

    const percentage = Math.floor(vaultCap * 100 + 0.5) / 100;

    return (
      <Box sx={{ marginTop: '16px' }}>
        <Typography variant="h6" sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }}>
          DEPOSITS
        </Typography>
        <ProgressBar
          isMaturity={true}
          leftContent={
            <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
              {tokenName}
            </Typography>
          }
          middleContent={
            <Typography variant="h6" color="#E5E1F9" marginLeft="0px">
              {formatCurrency(vaultCumulative, true)}
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
      <Panel variant="dark" sx={{ width: '100%', maxWidth: '366px', background: 'transparent' }}>
        <VaultField maturity={maturity} expectedApy={expectedApy} />

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
            {isUndefined(userDeposit) ? '---' : `${formatCurrency(userDeposit, true)} ${tokenName}`}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ fontSize: '14px', color: '#9B97AD', marginTop: '8px' }}>
          The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides
          liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and
          maximise yield for depositors.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '14px', color: '#9B97AD', marginTop: '8px' }}>
          In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen
          fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and
          automatically chooses an optimal amount of leverage and tick ranges for liquidity
          supplied.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '14px', color: '#9B97AD', marginTop: '8px' }}>
          For this pool, users simply deposit ETH in order to get access to optimised LP yields on
          the Voltz Protocol stETH pool.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '14px', color: '#9B97AD', marginTop: '8px' }}>
          Remember, returns are not guaranteed and you may get back less than you put in.
        </Typography>
      </Panel>
    );
  };

  return renderContent();
};

export default LPMellowVaultDepositInfo;

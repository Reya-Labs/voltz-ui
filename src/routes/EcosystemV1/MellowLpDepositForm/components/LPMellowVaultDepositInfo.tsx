import { Box } from '@mui/material';
import { PoolField, IconLabel, ProgressBar } from '@components/composite';
import { Agents } from '@contexts';
import { Panel, Typography } from '@components/atomic';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type LPMellowVaultDepositInfoProps = {
  lpVault: MellowLpVault;
};
const LPMellowVaulDepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({
  lpVault,
}: LPMellowVaultDepositInfoProps) => {
  const getCapBar = () => {
    if (isUndefined(lpVault.vaultCap) || isUndefined(lpVault.vaultCumulative)) {
      return null;
    }

    const percentage = Math.floor(lpVault.vaultCap * 100 + 0.5) / 100;

    return (
      <Box sx={{ marginTop: '16px' }}>
        <Typography variant="h6" sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }}>
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
              {formatCurrency(lpVault.vaultCumulative ?? 0, true)}
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
        <PoolField
          agent={Agents.LIQUIDITY_PROVIDER}
          protocol={lpVault.protocol}
          isBorrowing={false}
          isBorrowTable={true}
        />

        <Box sx={{ marginTop: '16px', display: 'flex' }}>
          <Typography
            variant="body2"
            sx={{ fontSize: '24px', color: '#FF4AA9', fontFamily: 'DM Sans', fontWeight: '700' }}
            label={
              <IconLabel
                label="Estimated Historic APY"
                icon="information-circle"
                info="This shows the estimated returns that would have been generated had the strategy been running from Jul 22 to Oct 22."
              />
            }
          >
            {isUndefined(lpVault.vaultExpectedApy)
              ? '---'
              : `${lpVault.vaultExpectedApy > 30 ? '>30' : lpVault.vaultExpectedApy.toFixed(2)}%`}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: '16px',
              color: '#E5E1F9',
              fontFamily: 'DM Sans',
              fontWeight: '700',
              marginTop: '8px',
            }}
            label={
              <IconLabel
                label="Running until"
                icon="information-circle"
                info="This strategy will run until 31 Dec 22. At this point depositors can collect any returns that may have been generated and withdraw their funds."
              />
            }
          >
            {isUndefined(lpVault.maturity) ? '---' : lpVault.maturity}
          </Typography>
        </Box>

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
            {isUndefined(lpVault.userDeposit)
              ? '---'
              : `${formatCurrency(lpVault.userDeposit, true)} ${lpVault.tokenName}`}
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

export default LPMellowVaulDepositInfo;

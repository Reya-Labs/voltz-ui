import Box from '@mui/material/Box';

import { Agents } from '../../../contexts/AgentContext/types';
import { Typography } from '../../atomic/Typography/Typography';
import { ReactComponent as Aave } from './aave-icon.svg';
import { ReactComponent as Compound } from './compound-icon.svg';
import { CustomPoolField } from './CustomPoolField';
import { ReactComponent as DAI } from './dai-icon.svg';
import { ReactComponent as ETH } from './eth-icon.svg';
import { ReactComponent as Lido } from './lido-icon.svg';
import { ReactComponent as Rocket } from './rocket-icon.svg';
import { ReactComponent as USDC } from './usdc-icon.svg';
import { ReactComponent as USDT } from './usdt-icon.svg';
import { ReactComponent as ETH } from './eth-icon.svg';
import { colors } from '@theme';

export type PoolFieldProps = {
  agent?: Agents;
  protocol: string;
  isBorrowing: boolean;
  isBorrowTable?: boolean;
};

export const PoolField = ({ agent, protocol, isBorrowing, isBorrowTable }: PoolFieldProps) => {
  const protocolIcon = () => {
    // todo: this seems duplicated in other files as well
    // extract a component
    const prefix = protocol[0];
    switch (prefix) {
      case 'c':
        return ['Compound', <Compound key="Compound" />];
      case 'a':
        return ['Aave', <Aave key="Aave" />];
      case 's':
        return ['Lido', <Lido key="Lido" />];
      case 'r':
        return ['Rocket', <Rocket key="Rocket" />];
      default:
        return ['', ''];
    }
  };

  const tokenIcon = () => {
    const token = protocol.substring(1);
    switch (token) {
      case 'DAI':
        return ['DAI', <DAI key="DAI" />];
      case 'USDC':
        return ['USDC', <USDC key="USDC" />];
      case 'ETH':
        return ['ETH', <ETH key="ETH" />];
      case 'tETH':
        return ['ETH', <ETH key="tETH" />];
      case 'USDT':
        return ['USDT', <USDT key="USDT" />];
      default:
        return ['', ''];
    }
  };

  const protocolInfo = protocolIcon();
  const tokenInfo = tokenIcon();

  const getPoolLabel = () => (
    <>
      <Box component="span" sx={{ color: colors.lavenderWeb2 }}>
        POOL
      </Box>
      {isBorrowing && (
        <Box component="span" sx={{ color: colors.wildStrawberry }}>
          {'  '}
          <strong>BORROWING</strong>
        </Box>
      )}
    </>
  );

  const renderPool = () => (
    <Typography
      sx={{
        fontSize: 18,
        textTransform: 'uppercase',
        verticalAlign: 'middle',
        fontWeight: 700,
        letterSpacing: '0.02em',
        lineHeight: '100%',
        marginTop: (theme) => theme.spacing(1),
      }}
      variant="body2"
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            marginRight: (theme) => theme.spacing(-1),
            marginBottom: (theme) => theme.spacing(-1),
          }}
        >
          {' '}
          {protocolInfo[1]}
        </Box>
        <Box
          sx={{
            marginRight: (theme) => theme.spacing(2),
            marginBottom: (theme) => theme.spacing(-1),
          }}
        >
          {tokenInfo[1]}
        </Box>
        {protocolInfo[0]} - {tokenInfo[0]}
      </Box>
    </Typography>
  );

  if (isBorrowTable) {
    return renderPool();
  }

  if (agent === Agents.LIQUIDITY_PROVIDER) {
    return (
      <CustomPoolField label={getPoolLabel()}>
        <Box sx={{ width: '100%' }}>{renderPool()}</Box>
      </CustomPoolField>
    );
  } else {
    return <CustomPoolField label={getPoolLabel()}>{renderPool()}</CustomPoolField>;
  }
};

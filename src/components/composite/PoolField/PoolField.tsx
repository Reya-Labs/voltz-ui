import Box from '@mui/material/Box';

import { Agents } from '../../../contexts/AgentContext/types';
import { Typography } from '../../atomic/Typography/Typography';
import { ReactComponent as Aave } from './aave-icon.svg';
import { ReactComponent as Compound } from './compound-icon.svg';
import { CustomPoolField } from './CustomPoolField';
import { ReactComponent as DAI } from './dai-icon.svg';
import { ReactComponent as ETH } from './eth-icon.svg';
import { ReactComponent as GLP } from './glp-icon.svg';
import { ReactComponent as Lido } from './lido-icon.svg';
import { ReactComponent as Rocket } from './rocket-icon.svg';
import { ReactComponent as USDC } from './usdc-icon.svg';
import { ReactComponent as USDT } from './usdt-icon.svg';

export type PoolFieldProps = {
  agent?: Agents;
  protocol: string;
  isBorrowing: boolean;
  isAaveV3: boolean;
  isBorrowTable?: boolean;
};

export const PoolField = ({
  isAaveV3,
  agent,
  protocol,
  isBorrowing,
  isBorrowTable,
}: PoolFieldProps) => {
  const protocolIcon = () => {
    // todo: this seems duplicated in other files as well
    // extract a component
    let prefix = protocol[0];
    if (prefix === 's') {
      prefix = prefix.concat(protocol[1]);
    }
    switch (prefix) {
      case 'c':
        return ['Compound', <Compound key="Compound" />];
      case 'a':
        return ['Aave', <Aave key="Aave" />];
      case 'st':
        return ['Lido', <Lido key="Lido" />];
      case 'r':
        return ['Rocket', <Rocket key="Rocket" />];
      case 'g':
        return ['GMX:GLP', <GLP key="GLP" />];
      case 'so':
        return ['SOFR', '']; //todo: filip
      default:
        return ['', ''];
    }
  };

  const tokenIcon = () => {
    // todo: refactor this
    const token = protocol.substring(1);
    switch (token) {
      case 'DAI':
        return ['DAI', <DAI key="DAI" />];
      case 'USDC':
        return ['USDC', <USDC key="USDC" />];
      case 'ofrUSDC':
        return ['USDC', <USDC key="USDC" />];
      case 'ETH':
        return ['ETH', <ETH key="ETH" />];
      case 'tETH':
        return ['ETH', <ETH key="tETH" />];
      case 'USDT':
        return ['USDT', <USDT key="USDT" />];
      case 'VUSD':
        return ['VUSD', ''];
      case 'ofrVUSD':
        return ['VUSD', ''];
      default:
        return ['', ''];
    }
  };

  const protocolInfo = protocolIcon();
  const tokenInfo = tokenIcon();

  const getPoolLabel = () => (
    <>
      <Box component="span" sx={{ color: '#9B97AD' }}>
        POOL
      </Box>
      {isAaveV3 && (
        <Box component="span" sx={{ color: '#FF4AA9' }}>
          {'  '}
          <strong>AAVE V3</strong>
        </Box>
      )}
      {isBorrowing && (
        <Box component="span" sx={{ color: '#FF4AA9' }}>
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
        {protocolInfo[0]} {tokenInfo[0] ? '-' : null} {tokenInfo[0]}
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

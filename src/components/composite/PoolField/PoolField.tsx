import { Agents } from '@contexts';
import Box from '@mui/material/Box';
import { ProgressBar } from '@components/composite';
import CustomPoolField from './CustomPoolField';
import { isNumber } from 'lodash';
import { Typography } from '@components/atomic';

import { ReactComponent as Aave } from './aave-ico.svg';
import { ReactComponent as Compound } from './compound-ico.svg';
import { ReactComponent as DAI } from './dai-ico.svg';
import { ReactComponent as USDC } from './usdc-ico.svg';
import { ReactComponent as USDT } from './usdt-ico.svg';
import { ReactComponent as ETH } from './eth-ico.svg';

export type PoolFieldProps = {
    agent?: Agents;
    protocol: string;
    isBorrowing: boolean;
    capLoading: boolean;
    cap: number | void | null;
    isBorrowTable?: boolean;
}

const PoolField = ({agent, protocol, isBorrowing, capLoading, cap, isBorrowTable}: PoolFieldProps) => {

  const protocolIcon = () => {
    const prefix = protocol[0];
    switch(prefix) {
        case 'c': return [" Compound", <Compound/>];
        case 'a': return [" Aave", <Aave/>];
        default: return ['',''];
    }
  };

  const tokenIcon = () => {
    const token = protocol.substring(1);
    switch(token) {
        case 'DAI': return ['DAI',<DAI/>];
        case 'USDC': return ['USDC',<USDC/>];
        case 'ETH': return ['ETH',<DAI/>];
        case 'USDT': return ['USDT',<USDT/>];
        default: return ['','']
    }
  };

  const protocolInfo = protocolIcon();
  const tokenInfo = tokenIcon();

  const getPoolLabel = () => (
      <>
        <Box component='span' sx={{ color: '#9B97AD' }}>
        POOL
          </Box>
          {(isBorrowing) && (<Box component='span' sx={{ color: '#FF4AA9' }}>
            {'  '}
            <strong>BORROWING</strong>
          </Box>)}
      </>
    );

    if (isBorrowTable) {
      return (
          <Typography variant="body2" sx={{fontSize: 18, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
            <Box sx={{display:'flex', alignContent: 'center'}}>
                {protocolInfo[1]}{tokenInfo[1]} &thinsp; {protocolInfo[0]} - {tokenInfo[0]}
            </Box> 
          </Typography>);
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      if (capLoading) {
        return (
          <CustomPoolField label={getPoolLabel()}>
            <ProgressBar
                leftContent={<>{protocolInfo[0]} - {tokenInfo[0]}</>}
                rightContent={"Loading..."}
                percentageComplete={0}
              />
          </CustomPoolField>
        );
      }

      if (!isNumber(cap)) {
        return (
          <CustomPoolField label={getPoolLabel()}>
            <Box sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{fontSize: 18, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
              <Box sx={{display:'flex', alignContent: 'center'}}>
                  {protocolInfo[0]} - {tokenInfo[0]}
              </Box> 
            </Typography>
            </Box>
          </CustomPoolField>);
      }

      return (
        <CustomPoolField label={getPoolLabel()}>
          <ProgressBar
            leftContent={<> {protocolInfo[0]} - {tokenInfo[0]}</>}
            rightContent={<>{cap.toFixed(2)}% CAP</>}
            percentageComplete={cap}
          />
        </CustomPoolField>
      );
    }
    else {
      return (
        <CustomPoolField label={getPoolLabel()}>
          <Typography variant="body2" sx={{fontSize: 18, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
            <Box sx={{display:'flex', alignContent: 'center'}}>
                {protocolInfo[1]}{tokenInfo[1]} &thinsp; {protocolInfo[0]} - {tokenInfo[0]}
            </Box> 
          </Typography>
        </CustomPoolField>);
    }
}

export default PoolField;
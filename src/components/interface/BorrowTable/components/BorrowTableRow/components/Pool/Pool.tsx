import React from 'react';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@components/atomic';
import { ReactComponent as Aave } from './aave-ico.svg';
import { ReactComponent as Compound } from './compound-ico.svg';
import { ReactComponent as DAI } from './dai-ico.svg';
import { ReactComponent as USDC } from './usdc-ico.svg';
import { ReactComponent as USDT } from './usdt-ico.svg';
import { ReactComponent as ETH } from './eth-ico.svg';
import { Box } from '@mui/material';

export type PoolProps = {
  underlying: string;
};


const Pool: React.FunctionComponent<PoolProps> = ({underlying}) => {

  const protocolIcon = () => {
    const prefix = underlying[0];
    switch(prefix) {
        case 'c': return [" Compound", <Compound/>];
        case 'a': return [" Aave", <Aave/>];
        default: return ['',''];
    }
  };

  const tokenIcon = () => {
    const token = underlying.substring(1);
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

  return (
    <TableCell key={"protocol"} width="35%" >
      <Typography variant="body2" sx={{fontSize: 18, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
        <Box sx={{display:'flex', alignContent: 'center'}}>
            {protocolInfo[1]}{tokenInfo[1]} &nbsp; {protocolInfo[0]} - {tokenInfo[0]}
        </Box> 
      </Typography>
    </TableCell>
  );
};

export default Pool;
import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext, usePositionContext } from '@contexts';
import { Typography } from '@components/atomic';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { ReactComponent as Aave } from './aave-ico.svg';
import { ReactComponent as Compound } from './compound-ico.svg';
import { ReactComponent as DAI } from './dai-ico.svg';
import { ReactComponent as USDC } from './usdc-ico.svg';
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
        default: return ['','']
    }
  };

  const protocolInfo = protocolIcon();
  const tokenInfo = tokenIcon();

  return (
    <TableCell key={"protocol"} width="25%" >
      <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
        <Box sx={{display:'flex', alignContent: 'center'}}>
            {protocolInfo[1]}{tokenInfo[1]} &nbsp; {protocolInfo[0]} - {tokenInfo[0]}
        </Box> 
      </Typography>
    </TableCell>
  );
};

export default Pool;
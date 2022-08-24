import React from 'react';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { themes } from '@theme';
import { formatNumber } from '@utilities';

export type DebtProps = {
  debtInUSD: number | null | void;
  debtInToken: number | null | void;
  tokenName: string | undefined;
};


const Debt: React.FunctionComponent<DebtProps> = ({debtInUSD, debtInToken, tokenName }) => {

  const renderValueInUSD = () => {
    // if (loading) {
    //   return '---';
    // }

    if (!debtInUSD) {
      return '$0';
    }

    return `$${formatNumber(debtInUSD)}`;
  };

  const renderValueInToken = () => {
    // if (loading) {
    //   return '---';
    // }

    if (!debtInToken) {
      return '$0';
    }

    let decimals = 2;
    if (tokenName === 'ETH') {
      decimals = 4;
    }
    return `${formatNumber(debtInToken, decimals, decimals)} ${tokenName ? tokenName : ''}`;
  };

  return (
    <TableCell align="left" width="25%"> 
      <Typography variant="body2" sx={{fontSize: 18, fontWeight: 400, letterSpacing: '0.02em',lineHeight: '100%'}}>
        {renderValueInUSD()}
        <Box sx={{color: "#A6A2B4", fontSize: 12, align:'left', marginLeft: (theme) => theme.spacing(-1.7)}}> &nbsp; 
          {renderValueInToken()}
        </Box>
      </Typography>
    </TableCell>
  );
};

export default Debt;

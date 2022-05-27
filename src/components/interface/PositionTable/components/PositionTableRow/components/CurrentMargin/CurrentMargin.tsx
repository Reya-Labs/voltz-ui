import React from 'react';
import TableCell from '@mui/material/TableCell';

import { useWallet } from '@hooks';
import { Typography } from '@components/atomic';
import { Button } from '@components/atomic';
import isNull from 'lodash/isNull';
import { isUndefined } from 'lodash';

export type CurrentMarginProps = {
  marginEdit?: boolean;
  margin?: number;
  accruedCashflow?: number;
  token: string;
  onSelect: () => void;
};

const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({ marginEdit, margin, accruedCashflow, token, onSelect}) => {
  const wallet = useWallet();

  const handleClick = () => {
    if (isNull(wallet.account)) {
      wallet.setRequired(true);
    } else {
      onSelect();
    }
  };

  return (
    <TableCell>
      <Typography variant="body2" label={"Margin"} sx={{ fontSize: 18 }}>
        {!isUndefined(margin) ? `${margin.toFixed(2)} ${token}` : 'No Data'}
      </Typography>

        {marginEdit && (<Button sx={{
          display: "flex",
          paddingTop: (theme) => theme.spacing(0),
          paddingBottom: (theme) => theme.spacing(0),
          paddingLeft: (theme) => theme.spacing(0),
          paddingRight: (theme) => theme.spacing(0),
          borderStyle: "solid",
          borderColor: "#5C0026",
          borderRadius: 1,
          flex: "none",
          width: "100%",
          background: "transparent",
          color: "#FF4AA9",
          '&:hover': {
            borderColor: '#FF4AA9',
            background: "transparent",
          },
        }} onClick={handleClick}>
            Edit 
        </Button>)}
    </TableCell>
  );
};

// border: 1px solid #5C0026;
// box-sizing: border-box;
// border-radius: 4px;

export default CurrentMargin;
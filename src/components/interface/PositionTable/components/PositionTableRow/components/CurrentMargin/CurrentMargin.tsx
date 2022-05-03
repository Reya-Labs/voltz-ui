import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useAMMContext, useWallet } from '@hooks';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';
import { Button } from '@components/atomic';
import isNull from 'lodash/isNull';

export type CurrentMarginProps = {
  source?: string;
  tickLower?: number;
  tickUpper?: number;
  displayEditButton?: boolean;
  protocol: string;
  onSelect: () => void;
};

const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({source, tickLower, tickUpper, displayEditButton, protocol, onSelect}) => {
  const { currentMargin } = useAMMContext();
  const { result, loading, call } = currentMargin;

  useEffect(() => {
    if (!isUndefined(source) && !isUndefined(tickLower) && !isUndefined(tickUpper)) {
      call({ source, tickLower, tickUpper });
    }
  }, [call, tickLower, tickUpper]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return 'No data';
    }

    if (!source) {
      return 'Cannot get source of positions';
    }

    if (source.includes("FCM")) {
      return `${result.toFixed(2)} ${protocol}`;
    }

    const token = protocol.substring(1);
    
    return `${result.toFixed(2)} ${token}`;
  };

  const wallet = useWallet();

  const handleClick = () => {
    if (isNull(wallet.account)) {
      wallet.setRequired(true);
    } else {
      // todo: fix
      onSelect();
    }
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Current Margin" sx={{ fontSize: 18 }}>
        {renderValue()}
      </Typography>

        <Button sx={{
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
        </Button>


    </TableCell>
  );
};


// border: 1px solid #5C0026;
// box-sizing: border-box;
// border-radius: 4px;

export default CurrentMargin;
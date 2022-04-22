import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useAMMContext, useWallet } from '@hooks';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';
import { Button } from 'src/components/atomic';
import isNull from 'lodash/isNull';

export type CurrentMarginProps = {
  tickLower?: number;
  tickUpper?: number;
  displayEditButton?: boolean;
  token: string;
  onSelect: () => void;
};

const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({tickLower, tickUpper, displayEditButton, token, onSelect}) => {
  const { currentMargin } = useAMMContext();
  const { result, loading, call } = currentMargin;

  useEffect(() => {
    if (!isUndefined(tickLower) && !isUndefined(tickUpper)) {
      call({ tickLower, tickUpper });
    }
  }, [call, tickLower, tickUpper]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return 'No data';
    }

    
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
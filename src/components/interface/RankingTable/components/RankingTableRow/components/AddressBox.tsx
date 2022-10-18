import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Typography } from '@components/atomic';

export type AddressBoxProps = {
  address: string;
};

const AddressBox: React.FunctionComponent<AddressBoxProps> = ({address}) => {

  const renderValue = () => {
      return `${address.substring(0, 8) + "..." + address.substring(36)}`;
  };

  return (
    <TableCell align="left">
      <Typography variant="body2" sx={{fontSize: 18, fontWeight: 400, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default AddressBox;
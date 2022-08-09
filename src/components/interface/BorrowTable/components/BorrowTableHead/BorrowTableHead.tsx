import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';

import { data } from '@utilities';
import { FixedBorrowTableFields, labels } from '../../types';


export type BorrowTableHeadProps = {
  order: data.TableOrder;
  orderBy: FixedBorrowTableFields;
  onSort: (field: FixedBorrowTableFields) => void;
};

const BorrowTableHead: React.FunctionComponent<BorrowTableHeadProps> = ({ order, orderBy, onSort }) => {
  const createSortHandler = (field: FixedBorrowTableFields) => (_event: React.MouseEvent<unknown>) =>
    onSort(field);

  const cellSx: SystemStyleObject<Theme> = {
    '&.MuiTableCell-root': {
      borderBottom: 0,
      padding: 0,
      paddingLeft: (theme) => theme.spacing(4),
      paddingRight: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(1),
      paddingBottom: (theme) => theme.spacing(1),
    },
  };

  return (
    <TableHead>
    </TableHead>
  );
};

export default BorrowTableHead;
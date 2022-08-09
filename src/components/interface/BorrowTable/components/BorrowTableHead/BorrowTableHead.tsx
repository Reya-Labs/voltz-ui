import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';

import { data } from '@utilities';
import { VariableBorrowTableFields, labelsVariable } from '../../types';


export type BorrowTableHeadProps = {
  order: data.TableOrder;
  orderBy: VariableBorrowTableFields;
  onSort: (field: VariableBorrowTableFields) => void;
};

const BorrowTableHead: React.FunctionComponent<BorrowTableHeadProps> = ({ order, orderBy, onSort }) => {
  const createSortHandler = (field: VariableBorrowTableFields) => (_event: React.MouseEvent<unknown>) =>
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
      <TableRow>
        {labelsVariable.map(([field, label]) => (
          <TableCell
            key={field}
            align="left"
            padding="normal"
            sortDirection={orderBy === field ? order : false}
            sx={cellSx}
          >
            {/* <TableSortLabel
              active={orderBy === field}
              direction={orderBy === field ? order : 'asc'}
              onClick={createSortHandler(field)}
            > */}
              {/* {label} */}
              <Typography
              variant="subtitle1"
              sx={{
                textTransform: "uppercase",
                fontWeight: 400, 
                fontSize: 12,
                color: "#5A576D"
              }}
              >
              {label}
            </Typography>
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
        <TableCell align="left" padding="normal" sx={cellSx}></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BorrowTableHead;
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';

import { data } from '@utilities';
import { VariableBorrowTableFields, FixedBorrowTableFields, FixedBorrowTableLabels } from '../../types';


export type BorrowTableHeadProps = {
  order: data.TableOrder;
  orderBy: VariableBorrowTableFields | FixedBorrowTableFields;
  labels: [VariableBorrowTableFields | FixedBorrowTableFields, string][];
  isFixedPositions: boolean;
};

const BorrowTableHead: React.FunctionComponent<BorrowTableHeadProps> = ({ order, orderBy, labels, isFixedPositions }) => {

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

  const cellWidth = new Map<string, string>();
  cellWidth.set('pool', '35%');
  cellWidth.set('debt', '25%');
  cellWidth.set('variableApy', '20%');
  cellWidth.set('fixedApr', '20%');
  cellWidth.set('maturity', '20%');

  const maturityLabel: ["protocol" | "debt" | "variableApy" | "fixedApr" | "maturity", string] = ['maturity', FixedBorrowTableLabels.maturity];
  const loadExtraCell = isFixedPositions ? <></> : (
    <TableCell width={cellWidth.get("maturity")} align="left" padding="normal" sx={cellSx}></TableCell>
  ) ;
  
  return (
    <TableHead>
      <TableRow>
        {
        labels.map(([field, label]) => (
          <TableCell
            key={field}
            align={(['fixedApr','variableApy'].includes(field)) ? "center": "left"}
            padding="normal"
            sortDirection={orderBy === field ? order : false}
            sx={cellSx}
            width={cellWidth.get(field)}
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
                color: "#9B97AD"
              }}
              >
              {label}
            </Typography>
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
        {loadExtraCell}
      </TableRow>
    </TableHead>
  );
}

export default BorrowTableHead;
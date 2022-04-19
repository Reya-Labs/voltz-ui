import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { SystemStyleObject, Theme } from '@mui/system';

import { data } from '@utilities';
import { PositionTableFields } from '../../types';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { Agents } from '@components/contexts';

export type PositionTableHeadProps = {
  order: data.TableOrder;
  orderBy: PositionTableFields;
  onSort: (field: PositionTableFields) => void;
  agent: Agents;
};

const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({ order, orderBy, onSort, agent }) => {
  const createSortHandler = (field: PositionTableFields) => (_event: React.MouseEvent<unknown>) =>
    onSort(field);

  const cellSx: SystemStyleObject<Theme> = {
    '&.MuiTableCell-root': {
      borderBottom: 0,
      padding: 0,
      paddingLeft: (theme) => theme.spacing(4),
      paddingRight: (theme) => theme.spacing(4),
    },
  };

  let labels: [PositionTableFields, string][];
  
  if (agent === Agents.LIQUIDITY_PROVIDER) {
    labels = lpLabels;
  } else {
    labels = traderLabels;
  }

  return (
    <TableHead>
      <TableRow>
        {labels.map(([field, label]) => (
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
              {label}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
        <TableCell align="left" padding="normal" sx={cellSx}></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PositionTableHead;

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';
import React from 'react';

import { colors } from '../../../../../theme';
import { Typography } from '../../../../atomic/Typography/Typography';
import { FixedBorrowTableFields, VariableBorrowTableFields } from '../../types';

export type BorrowTableHeadProps = {
  labels: [VariableBorrowTableFields | FixedBorrowTableFields, string][];
  isFixedPositions: boolean;
};

export const BorrowTableHead: React.FunctionComponent<BorrowTableHeadProps> = ({
  labels,
  isFixedPositions,
}) => {
  const cellSx: SystemStyleObject<Theme> = {
    '&.MuiTableCell-root': {
      borderBottom: 0,
      padding: 0,
      paddingLeft: (theme) => theme.spacing(5.1),
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

  const loadExtraCell = isFixedPositions ? (
    <></>
  ) : (
    <TableCell
      align="left"
      padding="normal"
      sx={cellSx}
      width={cellWidth.get('maturity')}
    ></TableCell>
  );

  return (
    <TableHead>
      <TableRow>
        {labels.map(([field, label]) => (
          <TableCell
            key={field}
            align={['fixedApr', 'variableApy'].includes(field) ? 'center' : 'left'}
            padding="normal"
            sortDirection={'debt' === field ? 'desc' : false}
            sx={cellSx}
            width={cellWidth.get(field)}
          >
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 400,
                fontSize: 12,
                color: colors.lavenderWeb2,
              }}
              variant="subtitle1"
            >
              {label}
            </Typography>
          </TableCell>
        ))}
        {loadExtraCell}
      </TableRow>
    </TableHead>
  );
};

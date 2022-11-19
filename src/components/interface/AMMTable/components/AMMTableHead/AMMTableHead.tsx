import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';
import { labels } from '../../constants';

const AMMTableHead: React.FunctionComponent = () => {
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
        {labels.map(([field, label]) => (
          <TableCell
            key={field}
            align="left"
            padding="normal"
            sortDirection={'maturity' === field ? 'desc' : false}
            sx={cellSx}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 400,
                fontSize: 12,
                color: '#5A576D',
              }}
            >
              {label}
            </Typography>
          </TableCell>
        ))}
        <TableCell align="left" padding="normal" sx={cellSx}></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default AMMTableHead;

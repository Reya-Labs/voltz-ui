import React from 'react';
import TableCell from '@mui/material/TableCell';
import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import { Button } from '@components/atomic';

export type HealthFactorProps = {
  status: string;
};

const HealthFactor: React.FunctionComponent<HealthFactorProps> = ({status}) => {
  if (status === 'HEALTHY') {
    return (
      <TableCell>
        <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
          <Button
            variant='healthy'
            sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16, borderWidth: 0 }}
            startIcon={<CircleIcon sx={{ width: 4, height: 4, borderRadius: 200, color: "#00d395" }} />}
          >
            {status}
          </Button>
        </Box>
      </TableCell>
    );
  }

  if (status === 'WARNING') {
    return (
      <TableCell>
        <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
          <Button
            variant='warning'
            sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16, borderWidth: 0 }}
            startIcon={<CircleIcon sx={{ width: 4, height: 4, borderRadius: 200, color: "#F1D302" }} />}
          >
            {status}
          </Button>
        </Box>
      </TableCell>
    );
  }

  if (status === 'DANGER') {
    return (
      <TableCell>
        <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
          <Button
            variant='danger'
            sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16, borderWidth: 0 }}
            startIcon={<CircleIcon sx={{ width: 4, height: 4, borderRadius: 200, color: "#F61067" }} />}
          >
            {status}
          </Button>
        </Box>
      </TableCell>
    );
  }

  return (
    <TableCell>
      <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
        <Button
          variant='dark'
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16, borderWidth: 0 }}
          startIcon={<CircleIcon sx={{ width: 4, height: 4, borderRadius: 200, color: "#ff4aa9" }} />}
        >
          {status}
        </Button>
      </Box>
    </TableCell>
  );
};

// border: 1px solid #5C0026;
// box-sizing: border-box;
// border-radius: 4px;

export default HealthFactor;
import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';

import { Icon, Button } from '../../atomic';

const Nav: React.FunctionComponent = () => {
  const buttonSx: SystemStyleObject<Theme> = {
    color: 'secondary.light',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: (theme) => theme.spacing(4),
        marginTop: (theme) => theme.spacing(4),
        '& > .MuiButton-root': {
          paddingLeft: '20px',
          paddingRight: '20px',
        },
      }}
    >
      <Icon name="voltz" sx={{ marginRight: (theme) => theme.spacing(4) }} />
      <Button variant="text" sx={buttonSx} href="/swap">
        SWAP
      </Button>
      <Button variant="text" sx={buttonSx} href="/pools">
        POOLS
      </Button>
      <Button variant="text" sx={buttonSx} href="/portfolio">
        PORTFOLIO
      </Button>
      <Button variant="text" sx={buttonSx} href="/farm">
        LP FARM
      </Button>
    </Box>
  );
};

export default Nav;

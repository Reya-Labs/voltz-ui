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
        '& > .MuiButton-root': {
          paddingLeft: '20px',
          paddingRight: '20px',
        },
      }}
    >
      <Icon
        name="voltz"
        sx={{ marginRight: (theme) => theme.spacing(4), cursor: 'pointer' }}
        link="/"
      />
      <Button variant="text" sx={buttonSx}>
        SWAP
      </Button>
      <Button variant="text" sx={buttonSx} link="/pools">
        POOLS
      </Button>
      <Button variant="text" sx={buttonSx}>
        PORTFOLIO
      </Button>
      <Button variant="text" sx={buttonSx}>
        LP FARM
      </Button>
    </Box>
  );
};

export default Nav;

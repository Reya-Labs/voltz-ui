import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';

import { routes } from '@routes';
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
        link={`/${routes.SWAP}`}
      />

      
      {/* <Box>
        <img> </img>
      </Box> */}

      {/* todo: add the logo as a png inside the box */}

      <Button variant="text" sx={buttonSx} link={`/${routes.SWAP}`}>
        SWAP
      </Button>
      <Button variant="text" sx={buttonSx} link={`/${routes.POOLS}`}>
        POOLS
      </Button>
      <Button variant="text" sx={buttonSx} link={`/${routes.PORTFOLIO}`}>
        PORTFOLIO
      </Button>
      <Button variant="text" sx={buttonSx} link={`/${routes.LP_FARM}`}>
        LP FARM
      </Button>
    </Box>
  );
};

export default Nav;

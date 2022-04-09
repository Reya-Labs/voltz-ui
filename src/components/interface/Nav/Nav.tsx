import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';
import { routes } from '@routes';
import { Button } from '../../atomic';
import Popover from '@mui/material/Popover';
import ButtonGroup from '@mui/material/ButtonGroup';

const Nav: React.FunctionComponent = () => {
  
  const buttonGroupSx: SystemStyleObject<Theme> = {    
    '& .MuiButtonGroup-grouped:not(:last-of-type):hover': {
      borderBottomColor: 'transparent'
    },
  };
  
  const buttonSx: SystemStyleObject<Theme> = {
    // color: 'secondary.light',
    color: '#B3AFC6',

    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      color: 'secondary.light',
    },

    '&:active': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      color: 'secondary.light',
    },
  };

  const popoverOverride: SystemStyleObject<Theme> = {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      background: 'none',
    },
  };

  // todo: duplicate
  const popoverOverride2: SystemStyleObject<Theme> = {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      background: 'none',
      marginLeft: 3,
    },
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null);

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id2 = open ? 'simple-popover' : undefined;

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
      {/* Old svg logo that has a bottom cutoff, unclear what the cause is */}
      {/* <Icon
        name="voltz"
        sx={{ marginRight: (theme) => theme.spacing(4), cursor: 'pointer' }}
        link={`/${routes.SWAP}`}
      /> */}

      {/* todo: add the correct logo in place of png */}

      <Box sx={{ height: 30, width: 22.5 }}>
        <img src="/images/voltz.png" alt="Done" height="100%" width="100%" />
      </Box>

      {/* todo: below logic can be simplified by wrapping duplicate code below into a reusable component */}
      <Button aria-describedby={id} sx={buttonSx} variant="text" onClick={handleClick}>
        TRADERS
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ ...popoverOverride }}
        elevation={0}
      >
        <ButtonGroup orientation="vertical" sx={buttonGroupSx}  aria-label="vertical outlined button group">
          <Button variant="text" sx={buttonSx} link={`/${routes.SWAP}`}>
            TRADER POOLS
          </Button>

          <Button variant="text" sx={buttonSx} link={`/${routes.PORTFOLIO}`}>
            PORTFOLIO
          </Button>
        </ButtonGroup>
      </Popover>

      <Button aria-describedby={id2} sx={buttonSx} variant="text" onClick={handleClick2}>
        POSITIONS
      </Button>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ ...popoverOverride2 }}
        elevation={0}
      >
        <ButtonGroup orientation="vertical" sx={buttonGroupSx} aria-label="vertical outlined button group">
          <Button variant="text" sx={buttonSx} link={`/${routes.POOLS}`}>
            LP POOLS
          </Button>

          <Button variant="text" sx={buttonSx} link={`/${routes.LP_FARM}`}>
            POSITIONS
          </Button>
        </ButtonGroup>
      </Popover>
    </Box>
  );
};

export default Nav;

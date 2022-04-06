import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';
import { routes } from '@routes';
import { Button } from '../../atomic';
import Popover from '@mui/material/Popover';
import ButtonGroup from '@mui/material/ButtonGroup';




const Nav: React.FunctionComponent = () => {
  const buttonSx: SystemStyleObject<Theme> = {
    color: 'secondary.dark',
    
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      color: 'secondary.light'

    },
  };

  
  const popoverOverride: SystemStyleObject<Theme> = {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
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
  
  const voltzLogo = require('./voltz.png') as string;

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
      
      <Box>
        <img src={voltzLogo} alt="voltz logo" ></img>
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
      >

      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        
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

        sx={{ ...popoverOverride }}
      >

      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >


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

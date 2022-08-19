import React from 'react';
import { SystemStyleObject, Theme } from '@theme';
import Box from '@mui/material/Box';
import { routes } from '@routes';
import { Button, Icon } from '../../atomic';
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
    fontSize: '16px',
    lineHeight: '14px',
    fontWeight: 400,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'secondary.darken010',
    padding: (theme) => `${theme.spacing(2)}`,
    marginLeft: (theme) => theme.spacing(6),

    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      color: 'secondary.light',
      textShadow: '0px 0px 11px rgba(229, 225, 249, 0.7)'
    },

    '&:active': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      color: 'secondary.light',
      textShadow: '0px 0px 11px rgba(229, 225, 249, 0.7)'
    },

    '&.open': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      color: 'secondary.light',
      textShadow: '0px 0px 11px rgba(229, 225, 249, 0.7)'
    }
  };

  const subMenuButtonSx: SystemStyleObject<Theme> = {
    ...buttonSx,
    marginTop: (theme) => `${theme.spacing(2)} !important`,
    marginLeft: 0,
    textAlign: 'left',
    justifyContent: 'flex-start'
  };

  const popoverOverride: SystemStyleObject<Theme> = {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      background: 'none',
      backdropFilter: 'blur(8px)',
      borderRadius: '4px',
      border: '1px solid rgba(15,12,29,.24)',
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

  const id3 = open ? 'simple-popover' : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Old svg logo that has a bottom cutoff, unclear what the cause is */}
      {/* <Icon
        name="voltz"
        sx={{ marginRight: (theme) => theme.spacing(4), cursor: 'pointer' }}
        link={`/${routes.SWAP}`}
      /> */}

      {/* todo: add the correct logo in place of png */}

      <Box sx={{ height: 30, width: 22.5, marginRight: (theme) => theme.spacing(2) }}>
        <Icon name={'voltz'} viewBox={'0 0 20 30'} sx={{
          width: '100%', 
          height: '100%',
          filter: (theme) => `drop-shadow(0px 4px 20px ${theme.palette.error.base}) drop-shadow(0px 0px 40px ${theme.palette.error.base})`
        }} />
      </Box>

      {/* todo: below logic can be simplified by wrapping duplicate code below into a reusable component */}
      <Button aria-describedby={id} sx={buttonSx} variant="text" onClick={handleClick} className={open ? 'open' : undefined}>
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
          <Button variant="text" sx={subMenuButtonSx} link={`/${routes.SWAP}`}>
            TRADER POOLS
          </Button>

          <Button variant="text" sx={subMenuButtonSx} link={`/${routes.PORTFOLIO}`}>
            PORTFOLIO
          </Button>
        </ButtonGroup>
      </Popover>

      <Button aria-describedby={id2} sx={buttonSx} variant="text" onClick={handleClick2} className={open2 ? 'open' : undefined}>
        LIQUIDITY PROVIDERS
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
        elevation={0}
      >
        <ButtonGroup orientation="vertical" sx={buttonGroupSx} aria-label="vertical outlined button group">
          <Button variant="text" sx={subMenuButtonSx} link={`/${routes.POOLS}`}>
            LP POOLS
          </Button>

          <Button variant="text" sx={subMenuButtonSx} link={`/${routes.LP_FARM}`}>
            POSITIONS
          </Button>
        </ButtonGroup>
      </Popover>

      {
        process.env.REACT_APP_FIXED_BORROW &&
        <Button aria-describedby={id3} sx={buttonSx} variant="text" link={`/${routes.BORROW_POS}`}>
          FIXED BORROW
        </Button>
      } 
    </Box>
  );
};

export default Nav;

import React from 'react';
import Box from '@mui/material/Box';
import { routes } from '@routes';
import { Icon } from '../../atomic';
import { NavLink } from './NavLink/NavLink';
import { iconSx } from './NavLink/style';
import { colors } from '@theme';

const Nav: React.FunctionComponent = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Box
      onClick={() => {
        window.open('https://voltz.xyz', '_blank');
      }}
      sx={{
        cursor: 'pointer',
        marginRight: (theme) => theme.spacing(4),
        filter: `drop-shadow(0px 4px 20px ${colors.wildStrawberry.base}) drop-shadow(0px 0px 40px ${colors.wildStrawberry.base})`,
      }}
    >
<<<<<<< HEAD
      <Icon name="voltz" viewBox={'0 0 20 30'} sx={iconSx} />
=======
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
        process.env.REACT_APP_FIXED_BORROW && process.env.REACT_APP_FIXED_BORROW !== `UNPROVIDED` &&
        <Button aria-describedby={id3} sx={buttonSx} variant="text" link={`/${routes.BORROW_POS}`}>
          FIXED BORROW
        </Button>
      } 

      {
        process.env.REACT_APP_ECOSYSTEM && process.env.REACT_APP_ECOSYSTEM !== `UNPROVIDED` && 
        <Button aria-describedby={id3} sx={buttonSx} variant="text" link={`/${routes.ECOSYSTEM}`}>
          Ecosystem
        </Button>
      }
>>>>>>> 1e776ed3 (feat: vault page styled)
    </Box>

    <NavLink
      subLinks={[
        {
          text: 'TRADER POOLS',
          link: `/${routes.SWAP}`,
        },
        {
          text: 'PORTFOLIO',
          link: `/${routes.PORTFOLIO}`,
        },
      ]}
    >
      Traders
    </NavLink>

    <NavLink
      subLinks={[
        {
          text: 'LP POOLS',
          link: `/${routes.POOLS}`,
        },
        {
          text: 'POSITIONS',
          link: `/${routes.LP_FARM}`,
        },
      ]}
    >
      Liquidity Providers
    </NavLink>

    {process.env.REACT_APP_FIXED_BORROW && process.env.REACT_APP_FIXED_BORROW !== `UNPROVIDED` && (
      <NavLink link={`/${routes.BORROW_POS}`}>Fixed Borrow</NavLink>
    )}

    {process.env.REACT_APP_COMMUNITY && process.env.REACT_APP_COMMUNITY !== `UNPROVIDED` && (
      <NavLink
        isNew={true}
        subLinks={[
          {
            text: 'PROFILE',
            link: `/${routes.PROFILE}`,
          },
          {
            text: 'TRADING LEAGUE',
            link: `/${routes.TRADING_LEAGUE}`,
          },
        ]}
      >
        Community
      </NavLink>
    )}
  </Box>
);

export default Nav;

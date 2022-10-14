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
      <Icon name="voltz" viewBox={'0 0 20 30'} sx={iconSx} />
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
      TRADERS
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
      LIQUIDITY PROVIDERS
    </NavLink>

    {process.env.REACT_APP_FIXED_BORROW && process.env.REACT_APP_FIXED_BORROW !== `UNPROVIDED` && (
      <NavLink link={`/${routes.BORROW_POS}`}>FIXED BORROW</NavLink>
    )}

    {process.env.REACT_APP_PROFILE && process.env.REACT_APP_PROFILE !== `UNPROVIDED` && (
      <NavLink link={`/${routes.PROFILE}`}>PROFILE</NavLink>
    )}
  </Box>
);

export default Nav;

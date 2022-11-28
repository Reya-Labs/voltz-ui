import React from 'react';
import { routes } from '../../../routes/paths';
import { NavLink } from './NavLink/NavLink';
import { NavBox, VoltzIcon, VoltzIconBox } from './Nav.styled';

export const Nav: React.FunctionComponent = React.memo(() => (
  <NavBox>
    <VoltzIconBox
      onClick={() => {
        window.open('https://voltz.xyz', '_blank');
      }}
    >
      <VoltzIcon name="voltz" />
    </VoltzIconBox>

    <NavLink
      subLinks={[
        {
          text: 'TRADER POOLS',
          link: `/${routes.TRADER_POOLS}`,
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
      isNew={true}
      subLinks={[
        {
          text: 'LP POOLS',
          link: `/${routes.LP_POOLS}`,
        },
        {
          text: 'LP OPTIMISERS',
          link: `/${routes.LP_OPTIMISERS}`,
        },
        {
          text: 'POSITIONS',
          link: `/${routes.LP_PORTFOLIO}`,
        },
      ]}
    >
      Liquidity Providers
    </NavLink>
    <NavLink link={`/${routes.BORROW_POS}`}>Fixed Borrow</NavLink>
    <NavLink isNew={true} link={`/${routes.TRADING_LEAGUE}`}>
      Leaderboard
    </NavLink>
    <NavLink isNew={true} link={`/${routes.PROFILE}`}>
      Profile
    </NavLink>
  </NavBox>
));

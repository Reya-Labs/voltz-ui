import React from 'react';

import { routes } from '../../../../routes/paths';
import { NavBox, VoltzIcon, VoltzIconBox } from './Nav.styled';
import { NavLink } from './NavLink/NavLink';

export const Nav: React.FunctionComponent = React.memo(() => (
  <NavBox>
    <VoltzIconBox
      data-testid="Nav-VoltzIconBox"
      onClick={() => {
        window.open('https://voltz.xyz', '_blank');
      }}
    >
      <VoltzIcon data-testid="Nav-VoltzIcon" name="voltz" />
    </VoltzIconBox>

    <NavLink
      subLinks={[
        {
          text: 'POOLS',
          link: `/${routes.TRADER_POOLS}`,
        },
        {
          text: 'PORTFOLIO',
          link: `/${routes.TRADER_PORTFOLIO}`,
        },
      ]}
    >
      Traders
    </NavLink>

    <NavLink
      isNew={true}
      subLinks={[
        {
          text: 'POOLS',
          link: `/${routes.LP_POOLS}`,
        },
        {
          text: 'OPTIMISERS',
          link: `/${routes.LP_OPTIMISERS}`,
        },
        {
          text: 'PORTFOLIO',
          link: `/${routes.LP_PORTFOLIO}`,
          isNew: true,
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

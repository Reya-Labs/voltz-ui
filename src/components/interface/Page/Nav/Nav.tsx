import React from 'react';

import { selectChainId } from '../../../../app/features/network';
import { useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { isArbitrumChain } from '../../../../utilities/network/is-arbitrum-chain';
import { NavBox, VoltzIcon, VoltzIconBox } from './Nav.styled';
import { NavLink } from './NavLink/NavLink';

export const Nav: React.FunctionComponent = React.memo(() => {
  const chainId = useAppSelector(selectChainId);
  const isArbitrum = isArbitrumChain(chainId);

  return (
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
        hidden={false}
        subLinks={[
          {
            text: 'POOLS',
            link: `/${routes.TRADER_POOLS}`,
            hidden: false,
          },
          {
            text: 'PORTFOLIO',
            link: `/${routes.TRADER_PORTFOLIO}`,
            hidden: false,
          },
        ]}
      >
        Traders
      </NavLink>

      <NavLink
        hidden={false}
        isNew={true}
        subLinks={[
          {
            text: 'POOLS',
            link: `/${routes.LP_POOLS}`,
            hidden: false,
          },
          {
            text: 'OPTIMISERS',
            link: `/${routes.LP_OPTIMISERS}`,
            hidden: isArbitrum,
          },
          {
            text: 'PORTFOLIO',
            link: `/${routes.LP_PORTFOLIO}`,
            isNew: true,
            hidden: false,
          },
        ]}
      >
        Liquidity Providers
      </NavLink>
      <NavLink hidden={false} link={`/${routes.BORROW_POS}`}>
        Fixed Borrow
      </NavLink>
      <NavLink hidden={isArbitrum} isNew={true} link={`/${routes.TRADING_LEAGUE}`}>
        Leaderboard
      </NavLink>
      <NavLink hidden={isArbitrum} isNew={true} link={`/${routes.PROFILE}`}>
        Profile
      </NavLink>
    </NavBox>
  );
});

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

      <NavLink hidden={false} link={`/${routes.POOLS}`}>
        Pools
      </NavLink>

      <NavLink
        hidden={false}
        subLinks={[
          {
            text: 'TRADER PORTFOLIO',
            link: `/${routes.TRADER_PORTFOLIO}`,
            hidden: false,
          },
          {
            text: 'LP PORTFOLIO',
            link: `/${routes.LP_PORTFOLIO}`,
            hidden: false,
          },
        ]}
      >
        Portfolio
      </NavLink>

      <NavLink hidden={isArbitrum} isNew={false} link={`/${routes.LP_OPTIMISERS}`}>
        Optimisers
      </NavLink>
      <NavLink hidden={false} isNew={false} link={`/${routes.TRADING_LEAGUE}`}>
        Leaderboard
      </NavLink>
      <NavLink hidden={false} isNew={false} link={`/${routes.PROFILE}`}>
        Profile
      </NavLink>
    </NavBox>
  );
});

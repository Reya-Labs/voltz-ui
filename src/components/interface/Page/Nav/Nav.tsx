import React from 'react';

import { isArbitrumChain, isAvalancheChain, selectChainId } from '../../../../app/features/network';
import { useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { isVoyageEnabled } from '../../../../utilities/isEnvVarProvided/is-voyage-enabled';
import { NavBox, VoltzIcon, VoltzIconBox } from './Nav.styled';
import { NavLink } from './NavLink/NavLink';

export const Nav: React.FunctionComponent = React.memo(() => {
  const chainId = useAppSelector(selectChainId);
  const isArbitrum = isArbitrumChain(chainId);
  const isAvalanche = isAvalancheChain(chainId);

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

      <NavLink hidden={isAvalanche || isArbitrum} isNew={false} link={`/${routes.LP_OPTIMISERS}`}>
        Optimisers
      </NavLink>
      <NavLink hidden={isAvalanche} isNew={false} link={`/${routes.TRADING_LEAGUE}`}>
        Leaderboard
      </NavLink>
      <NavLink hidden={isAvalanche} isNew={false} link={`/${routes.PROFILE}`}>
        Profile
      </NavLink>
      <NavLink hidden={!isVoyageEnabled() || isAvalanche} isNew={true} link={`/${routes.VOYAGE}`}>
        Voyage
      </NavLink>
    </NavBox>
  );
});

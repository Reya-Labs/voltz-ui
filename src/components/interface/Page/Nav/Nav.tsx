import React from 'react';

import { isArbitrumChain, isAvalancheChain, selectChainId } from '../../../../app/features/network';
import { isSpruceChain } from '../../../../app/features/network/helpers/is-spruce-chain';
import { useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { isPortfolioNextEnabled } from '../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { NavBox, VoltzIcon, VoltzIconBox } from './Nav.styled';
import { NavLink } from './NavLink/NavLink';

export const Nav: React.FunctionComponent = React.memo(() => {
  const chainId = useAppSelector(selectChainId);
  const isArbitrum = isArbitrumChain(chainId);
  const isAvalanche = isAvalancheChain(chainId);
  const isSpruce = isSpruceChain(chainId);

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

      {isPortfolioNextEnabled() ? (
        <NavLink hidden={false} isNew={false} link={`/${routes.PORTFOLIO_POSITIONS}`}>
          Portfolio
        </NavLink>
      ) : (
        <NavLink
          hidden={false}
          subLinks={[
            {
              text: 'TRADER PORTFOLIO',
              link: `/${routes.DEPRECATED_PORTFOLIO}`,
              hidden: false,
            },
            {
              text: 'LP PORTFOLIO',
              link: `/${routes.DEPRECATED_LP_PORTFOLIO_2}`,
              hidden: false,
            },
          ]}
        >
          Portfolio
        </NavLink>
      )}

      <NavLink
        hidden={isAvalanche || isArbitrum || isSpruce}
        isNew={false}
        link={`/${routes.LP_OPTIMISERS}`}
      >
        Optimisers
      </NavLink>
      <NavLink hidden={isAvalanche || isSpruce} isNew={false} link={`/${routes.TRADING_LEAGUE}`}>
        Leaderboard
      </NavLink>
      <NavLink hidden={isAvalanche || isSpruce} isNew={false} link={`/${routes.PROFILE}`}>
        Profile
      </NavLink>
      <NavLink hidden={isAvalanche || isSpruce} isNew={true} link={`/${routes.VOYAGE}`}>
        Voyage
      </NavLink>
    </NavBox>
  );
});

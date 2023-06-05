import React from 'react';
import { useLocation } from 'react-router-dom';

import { isArbitrumChain, isAvalancheChain, selectChainId } from '../../../../app/features/network';
import { useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { ReactComponent as OptimisersIcon } from './assets/optimisers.svg';
import { ReactComponent as PositionsIcon } from './assets/positions.svg';
import { PortfolioSubmenuBox } from './PortfolioSubmenu.styled';
import { SubmenuLink } from './SubmenuLink';

export const PortfolioSubmenu: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  const chainId = useAppSelector(selectChainId);

  const subpages = [
    {
      label: 'Positions',
      to: `/${routes.PORTFOLIO_POSITIONS}`,
      Icon: PositionsIcon,
    },
    {
      label: 'Optimisers',
      to: `/${routes.PORTFOLIO_OPTIMISERS}`,
      Icon: OptimisersIcon,
      hidden: isAvalancheChain(chainId) || isArbitrumChain(chainId),
    },
  ];

  return (
    <PortfolioSubmenuBox>
      {subpages
        .filter(({ hidden }) => !hidden)
        .map(({ label, Icon, to }) => (
          <SubmenuLink key={to} Icon={Icon} isActive={pathname.indexOf(to) !== -1} to={to}>
            {label}
          </SubmenuLink>
        ))}
    </PortfolioSubmenuBox>
  );
};

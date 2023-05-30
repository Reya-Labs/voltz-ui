import React from 'react';
import { useLocation } from 'react-router-dom';

import { routes } from '../../../../routes/paths';
import { ReactComponent as OptimisersIcon } from './assets/optimisers.svg';
import { ReactComponent as PositionsIcon } from './assets/positions.svg';
import { PortfolioSubmenuBox } from './PortfolioSubmenu.styled';
import { SubmenuLink } from './SubmenuLink';

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
  },
];

export const PortfolioSubmenu: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  return (
    <PortfolioSubmenuBox>
      {subpages.map(({ label, Icon, to }) => (
        <SubmenuLink key={to} Icon={Icon} isActive={pathname.indexOf(to) !== -1} to={to}>
          {label}
        </SubmenuLink>
      ))}
    </PortfolioSubmenuBox>
  );
};

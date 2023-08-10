import React from 'react';
import { useLocation } from 'react-router-dom';

import { isArbitrumChain, isAvalancheChain, selectChainId } from '../../../../app/features/network';
import { useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { isMarginAccountsLive } from '../../../../utilities/is-margin-accounts-live';
import { ReactComponent as MarginAccountsIcon } from './assets/margin-accounts.svg';
import { ReactComponent as OptimisersIcon } from './assets/optimisers.svg';
import { ReactComponent as OverviewIcon } from './assets/overview.svg';
import { ReactComponent as PositionsIcon } from './assets/positions.svg';
import { PortfolioSubmenuBox, SubpagesBox } from './PortfolioSubmenu.styled';
import { SubmenuActionButtons } from './SubmenuActionButtons';
import { SubmenuLink } from './SubmenuLink';

export const PortfolioSubmenu: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  const chainId = useAppSelector(selectChainId);

  const subpages = isMarginAccountsLive()
    ? [
        {
          label: 'Overview',
          to: `/${routes.PORTFOLIO_OVERVIEW}`,
          Icon: OverviewIcon,
        },
        {
          label: 'Margin Accounts',
          to: `/${routes.PORTFOLIO_MARGIN_ACCOUNTS}`,
          Icon: MarginAccountsIcon,
        },
        {
          label: 'Optimisers',
          to: `/${routes.PORTFOLIO_OPTIMISERS}`,
          Icon: OptimisersIcon,
          hidden: isAvalancheChain(chainId) || isArbitrumChain(chainId),
        },
      ]
    : [
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
      <SubpagesBox>
        {subpages
          .filter(({ hidden }) => !hidden)
          .map(({ label, Icon, to }) => (
            <SubmenuLink key={to} Icon={Icon} isActive={pathname.indexOf(to) !== -1} to={to}>
              {label}
            </SubmenuLink>
          ))}
      </SubpagesBox>
      <SubmenuActionButtons />
    </PortfolioSubmenuBox>
  );
};

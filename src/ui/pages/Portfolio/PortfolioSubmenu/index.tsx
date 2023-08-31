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
          disabled: false,
          label: 'Overview',
          to: `/${routes.PORTFOLIO_MARGIN_ACCOUNTS_OVERVIEW}`,
          Icon: OverviewIcon,
        },
        {
          disabled: true,
          label: 'Margin Accounts',
          to: `/${routes.PORTFOLIO_MARGIN_ACCOUNTS_DETAILS}`,
          Icon: MarginAccountsIcon,
        },
        {
          disabled: false,
          label: 'Optimisers',
          to: `/${routes.PORTFOLIO_OPTIMISERS}`,
          Icon: OptimisersIcon,
          hidden: isAvalancheChain(chainId) || isArbitrumChain(chainId),
        },
      ]
    : [
        {
          disabled: false,
          label: 'Positions',
          to: `/${routes.PORTFOLIO_POSITIONS}`,
          Icon: PositionsIcon,
        },
        {
          disabled: false,
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
          .map(({ label, Icon, to, disabled }) => (
            <SubmenuLink
              key={to}
              disabled={disabled}
              Icon={Icon}
              isActive={pathname.indexOf(to) !== -1}
              to={to}
            >
              {label}
            </SubmenuLink>
          ))}
      </SubpagesBox>
      <SubmenuActionButtons />
    </PortfolioSubmenuBox>
  );
};

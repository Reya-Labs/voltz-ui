import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Nav as BrokoliNav, NavProps } from 'brokoli-ui';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { routes, useAppSelector } from '../../../../../app';
import {
  isArbitrumChain,
  isAvalancheChain,
  selectChainId,
} from '../../../../../app/features/network';
import { isSpruceChain } from '../../../../../app/features/network/helpers/is-spruce-chain';

const getLinks = (chainId?: SupportedChainId | null) =>
  !chainId
    ? []
    : ([
        {
          isHidden: false,
          text: 'Pools',
          link: `/${routes.POOLS}`,
        },
        {
          text: 'Portfolio',
          link: `/${routes.PORTFOLIO_POSITIONS}`,
        },
        {
          isHidden: isAvalancheChain(chainId) || isArbitrumChain(chainId) || isSpruceChain(chainId),
          text: 'Optimisers',
          link: `/${routes.LP_OPTIMISERS}`,
        },
        {
          isHidden: isAvalancheChain(chainId) || isSpruceChain(chainId),
          text: 'Leaderboard',
          link: `/${routes.TRADING_LEAGUE}`,
        },
        {
          isHidden: isAvalancheChain(chainId) || isSpruceChain(chainId),
          text: 'Profile',
          link: `/${routes.PROFILE}`,
        },
        {
          isHidden: isAvalancheChain(chainId) || isSpruceChain(chainId),
          colorToken: 'rainbow',
          text: 'Voyage',
          link: `/${routes.VOYAGE}`,
        },
      ] as NavProps['links']);

export const Nav: React.FunctionComponent = () => {
  const chainId = useAppSelector(selectChainId);
  const links = useMemo(() => getLinks(chainId), [chainId]);

  return <BrokoliNav Component={Link} links={links} />;
};

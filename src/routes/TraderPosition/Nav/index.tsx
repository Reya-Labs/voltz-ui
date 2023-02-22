import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Nav as BrokoliNav, NavProps } from 'brokoli-ui';
import React, { useMemo } from 'react';

import { selectChainId } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { isArbitrumChain } from '../../../utilities/network/is-arbitrum-chain';
import { routes } from '../../paths';

const getLinks = (chainId?: SupportedChainId | null) =>
  !chainId
    ? []
    : ([
        {
          text: 'Traders',
          subLinks: [
            {
              text: 'Pools',
              link: `/${routes.TRADER_POOLS}`,
            },
            {
              text: 'Portfolio',
              link: `/${routes.TRADER_PORTFOLIO}`,
            },
          ],
        },
        {
          text: 'Liquidity Providers',
          subLinks: [
            {
              text: 'Pools',
              link: `/${routes.LP_POOLS}`,
            },
            {
              text: 'Optimisers',
              link: `/${routes.LP_OPTIMISERS}`,
              isHidden: isArbitrumChain(chainId),
            },
            {
              text: 'Portfolio',
              link: `/${routes.LP_PORTFOLIO}`,
              isNew: true,
              isHidden: false,
            },
          ],
        },
        {
          isHidden: isArbitrumChain(chainId),
          text: 'Leaderboard',
          link: `/${routes.TRADING_LEAGUE}`,
        },
        {
          isHidden: isArbitrumChain(chainId),
          text: 'Profile',
          link: `/${routes.PROFILE}`,
        },
      ] as NavProps['links']);

export const Nav: React.FunctionComponent = () => {
  const chainId = useAppSelector(selectChainId);
  const links = useMemo(() => getLinks(chainId), [chainId]);

  return <BrokoliNav links={links} />;
};

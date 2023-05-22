import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Nav as BrokoliNav, NavProps } from 'brokoli-ui';
import React, { useMemo } from 'react';

import {
  isArbitrumChain,
  isAvalancheChain,
  selectChainId,
} from '../../../../../app/features/network';
import { useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { isPortfolioNextEnabled } from '../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { isVoyageEnabled } from '../../../../../utilities/isEnvVarProvided/is-voyage-enabled';

const getLinks = (chainId?: SupportedChainId | null) =>
  !chainId
    ? []
    : ([
        {
          isHidden: false,
          text: 'Pools',
          link: `/${routes.POOLS}`,
        },
        isPortfolioNextEnabled()
          ? {
              text: 'Portfolio',
              link: `/${routes.PORTFOLIO}`,
            }
          : {
              text: 'Portfolio',
              subLinks: [
                {
                  text: 'Trader Portfolio',
                  link: `/${routes.PORTFOLIO}`,
                },
                {
                  text: 'LP Portfolio',
                  link: `/${routes.DEPRECATED_LP_PORTFOLIO_2}`,
                },
              ],
            },
        {
          isHidden: isAvalancheChain(chainId) || isArbitrumChain(chainId),
          text: 'Optimisers',
          link: `/${routes.LP_OPTIMISERS}`,
        },
        {
          isHidden: isAvalancheChain(chainId),
          text: 'Leaderboard',
          link: `/${routes.TRADING_LEAGUE}`,
        },
        {
          isHidden: isAvalancheChain(chainId),
          text: 'Profile',
          link: `/${routes.PROFILE}`,
        },
        {
          isHidden: !isVoyageEnabled() || isAvalancheChain(chainId),
          colorToken: 'rainbow',
          text: 'Voyage',
          link: `/${routes.VOYAGE}`,
        },
      ] as NavProps['links']);

export const Nav: React.FunctionComponent = () => {
  const chainId = useAppSelector(selectChainId);
  const links = useMemo(() => getLinks(chainId), [chainId]);

  return <BrokoliNav links={links} />;
};

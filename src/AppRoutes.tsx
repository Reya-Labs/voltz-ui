import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from './app';
import { isArbitrumChain, isAvalancheChain, selectChainId } from './app/features/network';
import { isSpruceChain } from './app/features/network/helpers/is-spruce-chain';
import { selectRedirects } from './app/features/redirects';
import { routes } from './app/paths';
import { NetworkProtectedPage } from './ui/components/NetworkProtectedPage';
import { NotFoundPageContent } from './ui/components/NotFoundPageContent';
import { Page } from './ui/components/Page';
import { useChainChange } from './ui/hooks/useChainChange';
import { useInitializeGoogleTagManager } from './ui/hooks/useInitializeGoogleTagManager';
import { useReferrer } from './ui/hooks/useReferrer';
import { SwapFormPage } from './ui/pages/Deprecated/SwapForm';
import { LPFormPage } from './ui/pages/LPForm';
import { LPOptimisersPage } from './ui/pages/LPOptimisers';
import { LPOptimisersFormPage } from './ui/pages/LPOptimisersForm';
import { PoolsPage } from './ui/pages/Pools';
import { MarginAccountsDetailsPage } from './ui/pages/Portfolio/MarginAccountsDetailsPage';
import { MarginAccountsOverviewPage } from './ui/pages/Portfolio/MarginAccountsOverviewPage';
import { PortfolioOptimisersPage } from './ui/pages/Portfolio/PortfolioOptimisers';
import { PortfolioPositionsPage } from './ui/pages/Portfolio/PortfolioPositions';
import { ProfilePage } from './ui/pages/Profile';
import { RolloverLPFormPage } from './ui/pages/RolloverLPForm';
import { RolloverSwapFormPage } from './ui/pages/RolloverSwapForm';
import { TradingLeaguePage } from './ui/pages/TradingLeague';
import { VoyagePage } from './ui/pages/Voyage';
import { isMarginAccountsLive } from './utilities/is-margin-accounts-live';

export const AppRoutes = () => {
  const chainId = useAppSelector(selectChainId);
  const redirects = useAppSelector(selectRedirects);

  useInitializeGoogleTagManager();
  useChainChange();
  useReferrer();

  return (
    <Routes>
      <Route element={<Page mainSlot={<NotFoundPageContent />} />} path="*" />
      <Route path="/">
        <Route element={<Navigate to={routes.POOLS} />} index />
        <Route
          element={
            <NetworkProtectedPage>
              <PoolsPage />
            </NetworkProtectedPage>
          }
          path={routes.POOLS}
        />
        {isMarginAccountsLive() ? (
          <Route
            element={
              <NetworkProtectedPage>
                <MarginAccountsOverviewPage />
              </NetworkProtectedPage>
            }
            path={routes.PORTFOLIO_MARGIN_ACCOUNTS_OVERVIEW}
          />
        ) : (
          <Route
            element={
              <NetworkProtectedPage>
                <PortfolioPositionsPage />
              </NetworkProtectedPage>
            }
            path={routes.PORTFOLIO_POSITIONS}
          />
        )}
        {isMarginAccountsLive() ? (
          <Route
            element={
              <NetworkProtectedPage>
                <MarginAccountsDetailsPage />
              </NetworkProtectedPage>
            }
            path={routes.PORTFOLIO_MARGIN_ACCOUNTS_DETAILS}
          />
        ) : null}
        <Route
          element={
            <NetworkProtectedPage
              hidden={
                isAvalancheChain(chainId) || isArbitrumChain(chainId) || isSpruceChain(chainId)
              }
            >
              <PortfolioOptimisersPage />
            </NetworkProtectedPage>
          }
          path={routes.PORTFOLIO_OPTIMISERS}
        />
        <Route
          element={
            <NetworkProtectedPage
              hidden={
                isAvalancheChain(chainId) || isArbitrumChain(chainId) || isSpruceChain(chainId)
              }
            >
              <LPOptimisersPage />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS}
        />
        <Route
          element={
            <NetworkProtectedPage
              hidden={
                isAvalancheChain(chainId) || isArbitrumChain(chainId) || isSpruceChain(chainId)
              }
            >
              <LPOptimisersFormPage />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS_DEPOSIT_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <SwapFormPage />
            </NetworkProtectedPage>
          }
          path={routes.TRADER_SWAP_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <RolloverSwapFormPage />
            </NetworkProtectedPage>
          }
          path={routes.TRADER_ROLLOVER_SWAP_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <LPFormPage />
            </NetworkProtectedPage>
          }
          path={routes.LP_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <RolloverLPFormPage />
            </NetworkProtectedPage>
          }
          path={routes.LP_ROLLOVER_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage
              hidden={
                isAvalancheChain(chainId) || isArbitrumChain(chainId) || isSpruceChain(chainId)
              }
            >
              <LPOptimisersFormPage />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage hidden={isAvalancheChain(chainId) || isSpruceChain(chainId)}>
              <ProfilePage />
            </NetworkProtectedPage>
          }
          path={routes.PROFILE}
        />
        <Route
          element={
            <NetworkProtectedPage hidden={isAvalancheChain(chainId) || isSpruceChain(chainId)}>
              <VoyagePage />
            </NetworkProtectedPage>
          }
          path={routes.VOYAGE}
        />
        <Route
          element={
            <NetworkProtectedPage hidden={isAvalancheChain(chainId) || isSpruceChain(chainId)}>
              <TradingLeaguePage />
            </NetworkProtectedPage>
          }
          path={routes.TRADING_LEAGUE}
        />
        {/*deprecated redirects*/}
        {redirects.map(({ path, redirectsTo }) => (
          <Route
            key={path}
            element={<Navigate replace={true} to={`/${redirectsTo}`} />}
            path={path}
          />
        ))}
      </Route>
    </Routes>
  );
};

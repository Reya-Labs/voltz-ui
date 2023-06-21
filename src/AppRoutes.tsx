import 'normalize.css';

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { isArbitrumChain, isAvalancheChain, selectChainId } from './app/features/network';
import { isSpruceChain } from './app/features/network/helpers/is-spruce-chain';
import { useAppSelector } from './app/hooks';
import { useChainChange } from './hooks/useChainChange';
import { useInitializeGoogleTagManager } from './hooks/useInitializeGoogleTagManager';
import { useReferrer } from './hooks/useReferrer';
import { routes } from './routes/paths';
import { NetworkProtectedPage } from './ui/components/NetworkProtectedPage';
import { NotFoundPageContent } from './ui/components/NotFoundPageContent';
import { Page } from './ui/components/Page';
import { LPFormPage } from './ui/pages/LPForm';
import { LPOptimisersPage } from './ui/pages/LPOptimisers';
import { LPOptimisersFormPage } from './ui/pages/LPOptimisersForm';
import { PoolsPage } from './ui/pages/Pools';
import { PortfolioOptimisersPage } from './ui/pages/Portfolio/PortfolioOptimisers';
import { PortfolioPositionsPage } from './ui/pages/Portfolio/PortfolioPositions';
import { ProfilePage } from './ui/pages/Profile';
import { RolloverLPFormPage } from './ui/pages/RolloverLPForm';
import { RolloverSwapFormPage } from './ui/pages/RolloverSwapForm';
import { SwapFormPage } from './ui/pages/SwapForm';
import { TradingLeaguePage } from './ui/pages/TradingLeague';
import { VoyagePage } from './ui/pages/Voyage';

export const AppRoutes = () => {
  const chainId = useAppSelector(selectChainId);

  useInitializeGoogleTagManager();
  useChainChange();
  useReferrer();

  return (
    <Routes>
      <Route element={<Page mainSlot={<NotFoundPageContent />} />} path="*" />
      <Route path="/">
        <Route element={<Navigate to={routes.POOLS} />} index />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.WELCOME}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <PoolsPage />
            </NetworkProtectedPage>
          }
          path={routes.POOLS}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <PortfolioPositionsPage />
            </NetworkProtectedPage>
          }
          path={routes.PORTFOLIO_POSITIONS}
        />
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
        <Route
          element={<Navigate replace={true} to={`/${routes.LP_OPTIMISERS}`} />}
          path={routes.DEPRECATED_PRODUCTS}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.DEPRECATED_LP_PORTFOLIO_2}`} />}
          path={routes.DEPRECATED_LP_PORTFOLIO}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.PORTFOLIO_POSITIONS}`} />}
          path={routes.DEPRECATED_PORTFOLIO}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.DEPRECATED_TRADER_POOLS}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.DEPRECATED_LP_POOLS}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.PORTFOLIO_POSITIONS}`} />}
          path={routes.DEPRECATED_LP_PORTFOLIO_2}
        />
      </Route>
    </Routes>
  );
};

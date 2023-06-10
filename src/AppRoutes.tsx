import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { isArbitrumChain, isAvalancheChain, selectChainId } from './app/features/network';
import { isSpruceChain } from './app/features/network/helpers/is-spruce-chain';
import { useAppSelector } from './app/hooks';
import { NetworkProtectedPage } from './components/interface/NetworkProtectedPage/NetworkProtectedPage';
import { NotFoundPage } from './components/interface/NotFoundPage/NotFoundPage';
import { useChainChange } from './hooks/useChainChange';
import { useInitializeGoogleTagManager } from './hooks/useInitializeGoogleTagManager';
import { useReferrer } from './hooks/useReferrer';
import { VaultFormRoute } from './routes/LPOptimisers/VaultFormRoute/VaultFormRoute';
import { Vaults } from './routes/LPOptimisers/Vaults/Vaults';
import { routes } from './routes/paths';
import { NetworkProtectedVoltzPage } from './ui/components/NetworkProtectedVoltzPage';
import { LPFormPage } from './ui/pages/LPForm';
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
      <Route element={<NotFoundPage />} path="*" />
      <Route path="/">
        <Route element={<Navigate to={routes.POOLS} />} index />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.WELCOME}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <PoolsPage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.POOLS}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <PortfolioPositionsPage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.PORTFOLIO_POSITIONS}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage
              hidden={
                isAvalancheChain(chainId) || isArbitrumChain(chainId) || isSpruceChain(chainId)
              }
            >
              <PortfolioOptimisersPage />
            </NetworkProtectedVoltzPage>
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
              <Vaults />
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
              <VaultFormRoute />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS_DEPOSIT_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <SwapFormPage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.TRADER_SWAP_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <RolloverSwapFormPage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.TRADER_ROLLOVER_SWAP_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <LPFormPage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.LP_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <RolloverLPFormPage />
            </NetworkProtectedVoltzPage>
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
              <VaultFormRoute />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage hidden={isAvalancheChain(chainId) || isSpruceChain(chainId)}>
              <ProfilePage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.PROFILE}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage hidden={isAvalancheChain(chainId) || isSpruceChain(chainId)}>
              <VoyagePage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.VOYAGE}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage hidden={isAvalancheChain(chainId) || isSpruceChain(chainId)}>
              <TradingLeaguePage />
            </NetworkProtectedVoltzPage>
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

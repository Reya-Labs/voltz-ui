import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { isArbitrumChain, isAvalancheChain, selectChainId } from './app/features/network';
import { useAppSelector } from './app/hooks';
import { NetworkProtectedPage } from './components/interface/NetworkProtectedPage/NetworkProtectedPage';
import { NotFoundPage } from './components/interface/NotFoundPage/NotFoundPage';
import { useChainChange } from './hooks/useChainChange';
import { useInitializeGoogleTagManager } from './hooks/useInitializeGoogleTagManager';
import { useReferrer } from './hooks/useReferrer';
import { VaultFormRoute } from './routes/LPOptimisers/VaultFormRoute/VaultFormRoute';
import { Vaults } from './routes/LPOptimisers/Vaults/Vaults';
import { LPPortfolio } from './routes/LPPortfolio/LPPortfolio';
import { routes } from './routes/paths';
import { TraderPortfolio } from './routes/TraderPortfolio/TraderPortfolio';
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
import { isPortfolioNextEnabled } from './utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { isVoyageNextEnabled } from './utilities/isEnvVarProvided/is-voyage-next-enabled';

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
            <NetworkProtectedPage>
              <TraderPortfolio />
            </NetworkProtectedPage>
          }
          path={routes.DEPRECATED_PORTFOLIO}
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
              hidden={isAvalancheChain(chainId) || isArbitrumChain(chainId)}
            >
              <PortfolioOptimisersPage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.PORTFOLIO_OPTIMISERS}
        />
        {isPortfolioNextEnabled() ? null : (
          <Route
            element={
              <NetworkProtectedPage>
                <LPPortfolio />
              </NetworkProtectedPage>
            }
            path={routes.DEPRECATED_LP_PORTFOLIO_2}
          />
        )}
        <Route
          element={
            <NetworkProtectedPage hidden={isAvalancheChain(chainId) || isArbitrumChain(chainId)}>
              <Vaults />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS}
        />
        <Route
          element={
            <NetworkProtectedPage hidden={isAvalancheChain(chainId) || isArbitrumChain(chainId)}>
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
            <NetworkProtectedPage hidden={isAvalancheChain(chainId) || isArbitrumChain(chainId)}>
              <VaultFormRoute />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage hidden={isAvalancheChain(chainId)}>
              <ProfilePage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.PROFILE}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage
              hidden={isAvalancheChain(chainId) ? !isVoyageNextEnabled() : false}
            >
              <VoyagePage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.VOYAGE}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage hidden={isAvalancheChain(chainId)}>
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
          element={<Navigate replace={true} to={`/${routes.DEPRECATED_PORTFOLIO}`} />}
          path={routes.PORTFOLIO_POSITIONS}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.DEPRECATED_TRADER_POOLS}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.DEPRECATED_LP_POOLS}
        />
        {isPortfolioNextEnabled() ? (
          <Route
            element={<Navigate replace={true} to={`/${routes.PORTFOLIO_POSITIONS}`} />}
            path={routes.DEPRECATED_LP_PORTFOLIO_2}
          />
        ) : null}
      </Route>
    </Routes>
  );
};

import { Navigate, Route, Routes } from 'react-router-dom';

import { isArbitrumChain, selectChainId } from './app/features/network';
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
import { ProfilePage } from './ui/pages/Profile';
import { RolloverSwapFormPage } from './ui/pages/RolloverSwapForm';
import { SwapFormPage } from './ui/pages/SwapForm';
import { TradingLeaguePage } from './ui/pages/TradingLeague';

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
            <NetworkProtectedPage>
              <TraderPortfolio />
            </NetworkProtectedPage>
          }
          path={routes.TRADER_PORTFOLIO}
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
              <LPPortfolio />
            </NetworkProtectedPage>
          }
          path={routes.LP_PORTFOLIO}
        />
        <Route
          element={
            <NetworkProtectedPage hidden={isArbitrumChain(chainId)}>
              <Vaults />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS}
        />
        <Route
          element={
            <NetworkProtectedPage hidden={isArbitrumChain(chainId)}>
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
            <NetworkProtectedPage hidden={isArbitrumChain(chainId)}>
              <VaultFormRoute />
            </NetworkProtectedPage>
          }
          path={routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
              <ProfilePage />
            </NetworkProtectedVoltzPage>
          }
          path={routes.PROFILE}
        />
        <Route
          element={
            <NetworkProtectedVoltzPage>
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
          element={<Navigate replace={true} to={`/${routes.LP_PORTFOLIO}`} />}
          path={routes.DEPRECATED_LP_PORTFOLIO}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.DEPRECATED_TRADER_POOLS}
        />
        <Route
          element={<Navigate replace={true} to={`/${routes.POOLS}`} />}
          path={routes.DEPRECATED_LP_POOLS}
        />
      </Route>
    </Routes>
  );
};

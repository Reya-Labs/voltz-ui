import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { setChainIdThunk } from './app/features/network/thunks';
import { useAppDispatch } from './app/hooks';
import { NetworkProtectedPage } from './components/interface/NetworkProtectedPage/NetworkProtectedPage';
import { getDefaultChainId } from './components/interface/NetworkSelector/get-default-chain-id';
import { useWallet } from './hooks/useWallet';
import { VaultFormRoute as DeprecatedVaultFormRoute } from './routes/DeprecatedLPOptimisers/VaultFormRoute/VaultFormRoute';
import { Vaults as DeprecatedVaults } from './routes/DeprecatedLPOptimisers/Vaults/Vaults';
import { FixedBorrower } from './routes/FixedBorrower/FixedBorrower';
import { VaultFormRoute } from './routes/LPOptimisers/VaultFormRoute/VaultFormRoute';
import { Vaults } from './routes/LPOptimisers/Vaults/Vaults';
import { LPPools } from './routes/LPPools/LPPools';
import { LPPortfolio } from './routes/LPPortfolio/LPPortfolio';
import { routes } from './routes/paths';
import { Profile } from './routes/Profile/Profile';
import { TraderPools } from './routes/TraderPools/TraderPools';
import { TraderPortfolio } from './routes/TraderPortfolio/TraderPortfolio';
import { TradingLeague } from './routes/TradingLeague/TradingLeague';
import { isStatelessSDKEnabled } from './utilities/is-stateless-sdk-enabled';
import { deleteChainId, getChainId, setChainId } from './utilities/network/chain-store';
import { detectIfNetworkSupported } from './utilities/network/detect-if-network-supported';
import {
  deleteReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  setReferrer,
} from './utilities/referrer-store';
import { REFERRER_QUERY_PARAM_KEY } from './utilities/referrer-store/constants';

export const AppRoutes = () => {
  const [searchParams] = useSearchParams();
  const searchParamsReferrer = searchParams.get(REFERRER_QUERY_PARAM_KEY);
  const dispatch = useAppDispatch();
  const { connect } = useWallet();

  useEffect(() => {
    if (process.env.REACT_APP_GTM_CODE) {
      TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_CODE });
    }
  }, []);

  const handlePageReloadAfterChainChanged = async () => {
    const storedChainId = getChainId();
    if (!storedChainId) {
      return;
    }
    const nextChainId = parseInt(storedChainId.replace('0x', ''), 10);
    const networkValidation = detectIfNetworkSupported(nextChainId);
    if (!networkValidation.isSupported || !networkValidation.chainId) {
      await dispatch(
        setChainIdThunk({
          chainId: getDefaultChainId(),
          isSupportedNetwork: false,
        }),
      );
    } else {
      await dispatch(
        setChainIdThunk({
          chainId: networkValidation.chainId,
          isSupportedNetwork: true,
        }),
      );
    }
    deleteChainId();
    await connect('metamask');
  };

  useEffect(() => {
    void handlePageReloadAfterChainChanged();
    (
      window.ethereum as {
        on: (event: string, cb: (chainId: string) => void) => void;
      }
    )?.on('chainChanged', (chainId: string) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      setChainId(chainId);
      window.location.reload();
    });
  }, []);

  // referrer logic - run everytime params change for ${REFERRER_QUERY_PARAM_KEY}
  useEffect(() => {
    // Earlier, pre-release keys may have used more than 8 characters, but we overwrite these
    if (!isValidReferrerStored()) {
      deleteReferrer();
    }

    const isValidReferrer = isValidReferrerValue(searchParamsReferrer);
    if (!isValidReferrer) {
      return;
    }

    // Referrer is set in URL and has not already been saved in storage; save to storage now
    // We do deliberately do not overwrite any existing value because we want to credit the first referral link that was followed
    if (!isRefererStored()) {
      setReferrer(searchParamsReferrer!);
    }
  }, [searchParamsReferrer]);

  return (
    <Routes>
      <Route path="/">
        <Route element={<Navigate to={routes.TRADER_POOLS} />} index />
        <Route
          element={<Navigate replace={true} to={`/${routes.TRADER_POOLS}`} />}
          path={routes.WELCOME}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <TraderPools />
            </NetworkProtectedPage>
          }
          path={routes.TRADER_POOLS}
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
            <NetworkProtectedPage>
              <LPPools />
            </NetworkProtectedPage>
          }
          path={routes.LP_POOLS}
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
            isStatelessSDKEnabled() ? (
              <NetworkProtectedPage>
                <Vaults />
              </NetworkProtectedPage>
            ) : (
              <NetworkProtectedPage>
                <DeprecatedVaults />
              </NetworkProtectedPage>
            )
          }
          path={routes.LP_OPTIMISERS}
        />
        <Route
          element={
            isStatelessSDKEnabled() ? (
              <NetworkProtectedPage>
                <VaultFormRoute />
              </NetworkProtectedPage>
            ) : (
              <NetworkProtectedPage>
                <DeprecatedVaultFormRoute />
              </NetworkProtectedPage>
            )
          }
          path={routes.LP_OPTIMISERS_DEPOSIT_FORM}
        />
        <Route
          element={
            isStatelessSDKEnabled() ? (
              <NetworkProtectedPage>
                <VaultFormRoute />
              </NetworkProtectedPage>
            ) : (
              <NetworkProtectedPage>
                <DeprecatedVaultFormRoute />
              </NetworkProtectedPage>
            )
          }
          path={routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <FixedBorrower />
            </NetworkProtectedPage>
          }
          path={routes.BORROW_POS}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <Profile />
            </NetworkProtectedPage>
          }
          path={routes.PROFILE}
        />
        <Route
          element={
            <NetworkProtectedPage>
              <TradingLeague />
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
          element={<Navigate replace={true} to={`/${routes.LP_PORTFOLIO}`} />}
          path={routes.DEPRECATED_LP_PORTFOLIO}
        />
      </Route>
    </Routes>
  );
};

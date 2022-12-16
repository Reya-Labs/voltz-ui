import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { Page } from './components/interface/Page/Page';
import { DeprecatedLPPortfolio } from './routes/deprecated/LPPortfolio/LPPortfolio';
import { FixedBorrower } from './routes/FixedBorrower/FixedBorrower';
import { VaultFormRoute } from './routes/LPOptimisers/VaultFormRoute/VaultFormRoute';
import { Vaults } from './routes/LPOptimisers/Vaults/Vaults';
import { LPPools } from './routes/LPPools/LPPools';
import { LPPortfolio } from './routes/LPPortfolio/LPPortfolio';
import { routes } from './routes/paths';
import { Portfolio } from './routes/Portfolio/Portfolio';
import { Profile } from './routes/Profile/Profile';
import { TraderPools } from './routes/TraderPools/TraderPools';
import { TradingLeague } from './routes/TradingLeague/TradingLeague';
import { isEnvVarProvided } from './utilities/is-env-var-provided';
import {
  deleteReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  REFERRER_QUERY_PARAM_KEY,
  setReferrer,
} from './utilities/referrer-store/referrer-store';

export const App = () => {
  const [searchParams] = useSearchParams();
  const searchParamsReferrer = searchParams.get(REFERRER_QUERY_PARAM_KEY);

  useEffect(() => {
    if (process.env.REACT_APP_GTM_CODE) {
      TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_CODE });
    }
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

  // todo: temporary until Mellow updates on their page
  const redirects = [
    {
      from: 'lp-optimisers/deposit/0xF875B4BD81b1be40775652d8fDC174512C36DB20-0',
      to: '/lp-optimisers/deposit/mellow-usdc',
    },
    {
      from: 'lp-optimisers/deposit/0xF875B4BD81b1be40775652d8fDC174512C36DB20-1',
      to: '/lp-optimisers/deposit/mellow-usdc',
    },
    {
      from: 'lp-optimisers/deposit/0x1963efb3B756e7D17D0e54645339e7E037705cc1-0',
      to: '/lp-optimisers/deposit/mellow-eth',
    },
    {
      from: 'lp-optimisers/deposit/0xD6e133B9C82F04734B48d5808800078038231a22-0',
      to: '/lp-optimisers/deposit/mellow-dai',
    },
    {
      from: 'lp-optimisers/deposit/0x9c1100A321ab778cE5d3B42c7b99f44afc3A4c41-0',
      to: '/lp-optimisers/deposit/mellow-usdt',
    },
  ];

  return (
    <Page>
      <Routes>
        <Route path="/">
          <Route element={<Navigate to={routes.TRADER_POOLS} />} index />
          {redirects.map((r) => (
            <Route key={r.from} element={<Navigate replace={true} to={r.to} />} path={r.from} />
          ))}
          <Route
            element={<Navigate replace={true} to={`/${routes.TRADER_POOLS}`} />}
            path={routes.WELCOME}
          />
          <Route element={<TraderPools />} path={routes.TRADER_POOLS} />
          <Route element={<Portfolio />} path={routes.PORTFOLIO} />
          <Route element={<LPPools />} path={routes.LP_POOLS} />
          <Route
            element={
              isEnvVarProvided(process.env.REACT_APP_ROLLOVER_PORTFOLIO) ? (
                <LPPortfolio />
              ) : (
                <DeprecatedLPPortfolio />
              )
            }
            path={routes.LP_PORTFOLIO}
          />
          <Route
            element={<Navigate replace={true} to={`/${routes.LP_OPTIMISERS}`} />}
            path={routes.PRODUCTS}
          />
          <Route element={<Vaults />} path={routes.LP_OPTIMISERS} />
          <Route element={<VaultFormRoute />} path={routes.LP_OPTIMISERS_VAULT_FORM} />
          <Route element={<VaultFormRoute />} path={routes.LP_OPTIMISERS_VAULT_FORM} />
          <Route element={<FixedBorrower />} path={routes.BORROW_POS} />
          <Route element={<Profile />} path={routes.PROFILE} />
          <Route element={<TradingLeague />} path={routes.TRADING_LEAGUE} />
        </Route>
      </Routes>
    </Page>
  );
};

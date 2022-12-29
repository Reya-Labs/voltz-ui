import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { Page } from './components/interface/Page/Page';
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
import {
  deleteReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  setReferrer,
} from './utilities/referrer-store';
import { REFERRER_QUERY_PARAM_KEY } from './utilities/referrer-store/constants';

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

  return (
    <Page>
      <Routes>
        <Route path="/">
          <Route element={<Navigate to={routes.TRADER_POOLS} />} index />
          <Route
            element={<Navigate replace={true} to={`/${routes.TRADER_POOLS}`} />}
            path={routes.WELCOME}
          />
          <Route element={<TraderPools />} path={routes.TRADER_POOLS} />
          <Route element={<Portfolio />} path={routes.PORTFOLIO} />
          <Route element={<LPPools />} path={routes.LP_POOLS} />
          <Route element={<LPPortfolio />} path={routes.LP_PORTFOLIO} />
          <Route
            element={<Navigate replace={true} to={`/${routes.LP_OPTIMISERS}`} />}
            path={routes.PRODUCTS}
          />
          <Route element={<Vaults />} path={routes.LP_OPTIMISERS} />
          <Route element={<VaultFormRoute />} path={routes.LP_OPTIMISERS_DEPOSIT_FORM} />
          <Route element={<VaultFormRoute />} path={routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM} />
          <Route element={<FixedBorrower />} path={routes.BORROW_POS} />
          <Route element={<Profile />} path={routes.PROFILE} />
          <Route element={<TradingLeague />} path={routes.TRADING_LEAGUE} />
        </Route>
      </Routes>
    </Page>
  );
};

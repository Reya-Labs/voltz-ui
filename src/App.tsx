import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import TagManager from 'react-gtm-module';

import {
  routes,
  TradingLeague,
  Profile,
  FixedBorrower,
  Ecosystem,
  ProfileV1,
  Portfolio,
  TraderPools,
  LPPools,
  LPPortfolio,
} from './routes';
import { AlphaBanner, GweiBar } from '@components/composite';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import {
  deleteReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  REFERRER_QUERY_PARAM_KEY,
  setReferrer,
} from './utilities/referrer-store/referrer-store';

const App = () => {
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
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to={routes.TRADER_POOLS} />} />
          <Route path={routes.TRADER_POOLS} element={<TraderPools />} />
          <Route path={routes.PORTFOLIO} element={<Portfolio />} />
          <Route path={routes.LP_POOLS} element={<LPPools />} />
          <Route path={routes.LP_PORTFOLIO} element={<LPPortfolio />} />
          <Route path={routes.LP_OPTIMISERS} element={<Ecosystem />} />
          <Route path={routes.BORROW_POS} element={<FixedBorrower />} />
          <Route
            path={routes.PROFILE}
            element={
              process.env.REACT_APP_COMMUNITY_P2 &&
              process.env.REACT_APP_COMMUNITY_P2 !== `UNPROVIDED` ? (
                <Profile />
              ) : (
                <ProfileV1 />
              )
            }
          />
          <Route path={routes.TRADING_LEAGUE} element={<TradingLeague />} />
        </Route>
      </Routes>
      <Box sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
        <GweiBar />
        <AlphaBanner />
      </Box>
    </>
  );
};

export default App;

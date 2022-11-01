import { Routes, Route, Navigate } from 'react-router-dom';
import TagManager from 'react-gtm-module';

import {
  routes,
  TradingLeague,
  Profile,
  LiquidityProvider,
  Trader,
  FixedBorrower,
  Ecosystem,
} from '@routes';
import { AlphaBanner, GweiBar } from '@components/composite';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    if (process.env.REACT_APP_GTM_CODE) {
      TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_CODE });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to={routes.SWAP} />} />
          <Route path={routes.SWAP} element={<Trader />} />
          <Route path={routes.PORTFOLIO} element={<Trader />} />
          <Route path={routes.POOLS} element={<LiquidityProvider />} />
          <Route path={routes.LP_FARM} element={<LiquidityProvider />} />
          <Route path={routes.PRODUCTS} element={<Ecosystem />} />
          <Route path={routes.BORROW_POS} element={<FixedBorrower />} />
          {process.env.REACT_APP_COMMUNITY && process.env.REACT_APP_COMMUNITY !== `UNPROVIDED` && (
            <Route path={routes.PROFILE} element={<Profile />} />
          )}
          {process.env.REACT_APP_COMMUNITY && process.env.REACT_APP_COMMUNITY !== `UNPROVIDED` && (
            <Route path={routes.TRADING_LEAGUE} element={<TradingLeague />} />
          )}
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

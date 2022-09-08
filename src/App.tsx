import { Routes, Route, Navigate } from 'react-router-dom';

import { routes } from '@routes';
import { LiquidityProvider, Trader, FixedBorrower, Ecosystem } from './routes';
import { AlphaBanner, GweiBar } from '@components/composite';
import Box from '@mui/material/Box';

const App = () => (
  <>
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={routes.SWAP} />} />
        <Route path={routes.SWAP} element={<Trader />} />
        <Route path={routes.PORTFOLIO} element={<Trader />} />
        <Route path={routes.POOLS} element={<LiquidityProvider />} />
        <Route path={routes.LP_FARM} element={<LiquidityProvider />} />
        {process.env.REACT_APP_FIXED_BORROW && process.env.REACT_APP_FIXED_BORROW !== `UNPROVIDED` && <Route path={routes.BORROW_POS} element={<FixedBorrower />} />}
        <Route path={routes.ECOSYSTEM} element={<Ecosystem />} />
      </Route>
    </Routes>
    <Box sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
      <GweiBar />
      <AlphaBanner />
    </Box>
  </>
);

export default App;

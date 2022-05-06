import { Routes, Route, Navigate } from 'react-router-dom';

import { routes } from '@routes';
import { LiquidityProvider, Trader } from './components';

const App = () => (
   <Routes>
    <Route path="/">
      <Route index element={<Navigate to={routes.SWAP} />} />
      <Route path={routes.SWAP} element={<Trader />} />
      <Route path={routes.PORTFOLIO} element={<Trader />} />
      <Route path={routes.POOLS} element={<LiquidityProvider />} />
      <Route path={routes.LP_FARM} element={<LiquidityProvider />} />
    </Route>
  </Routes>
);

export default App;

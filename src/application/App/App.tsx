import { Routes, Route } from 'react-router-dom';

import { routes } from '@routes';
import { LPFarm, Pools, Portfolio, Swap } from './components';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Swap />} />
        <Route path={routes.LP_FARM} element={<LPFarm />} />
        <Route path={routes.POOLS} element={<Pools />} />
        <Route path={routes.PORTFOLIO} element={<Portfolio />} />
        <Route path={routes.SWAP} element={<Swap />} />
      </Route>
    </Routes>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';

import { routes } from '@routes';
import { Home, Pools } from './components';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path={routes.POOLS} element={<Pools />} />
      </Route>
    </Routes>
  );
};

export default App;

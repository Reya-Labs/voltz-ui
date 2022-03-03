import { Routes, Route, Navigate } from 'react-router-dom';

import { routes } from '@routes';
import { Home } from './components';

const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Navigate to={routes.SWAP} />} />
      <Route path="/:path" element={<Home />} />
    </Route>
  </Routes>
);

export default App;

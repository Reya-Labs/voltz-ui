import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { Pools } from './Pools';

export const PoolsPage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<Pools />} />;
};

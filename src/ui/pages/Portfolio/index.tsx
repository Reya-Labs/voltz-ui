import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { Portfolio } from './Portfolio';

export const PortfolioPage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<Portfolio />} />;
};

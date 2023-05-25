import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { PortfolioPositions } from './PortfolioPositions';

export const PortfolioPositionsPage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<PortfolioPositions />} />;
};

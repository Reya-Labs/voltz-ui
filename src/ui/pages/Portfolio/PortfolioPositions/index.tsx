import React from 'react';

import { VoltzPage } from '../../../components/VoltzPage';
import { PortfolioPositions } from './PortfolioPositions';
import { PortfolioSubmenu } from './PortfolioSubmenu';

export const PortfolioPositionsPage: React.FunctionComponent = () => {
  return <VoltzPage leftPanelSubmenu={<PortfolioSubmenu />} mainSlot={<PortfolioPositions />} />;
};

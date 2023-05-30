import React from 'react';

import { VoltzPage } from '../../../components/VoltzPage';
import { PortfolioSubmenu } from '../PortfolioSubmenu';
import { PortfolioPositions } from './PortfolioPositions';

export const PortfolioPositionsPage: React.FunctionComponent = () => {
  return <VoltzPage leftPanelSubmenu={<PortfolioSubmenu />} mainSlot={<PortfolioPositions />} />;
};

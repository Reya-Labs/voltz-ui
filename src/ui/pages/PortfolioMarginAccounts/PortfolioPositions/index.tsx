import React from 'react';

import { Page } from '../../../components/Page';
import { PortfolioSubmenu } from '../PortfolioSubmenu';
import { PortfolioPositions } from './PortfolioPositions';

export const PortfolioMarginAccountsPositionsPage: React.FunctionComponent = () => {
  return <Page leftPanelSubmenu={<PortfolioSubmenu />} mainSlot={<PortfolioPositions />} />;
};

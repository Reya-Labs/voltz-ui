import React from 'react';

import { Page } from '../../../components/Page';
import { PortfolioSubmenu } from '../PortfolioSubmenu';
import { PortfolioOverview } from './PortfolioOverview';

export const MarginAccountsOverviewPage: React.FunctionComponent = () => {
  return <Page leftPanelSubmenu={<PortfolioSubmenu />} mainSlot={<PortfolioOverview />} />;
};

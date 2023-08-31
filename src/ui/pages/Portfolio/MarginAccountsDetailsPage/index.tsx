import React from 'react';

import { Page } from '../../../components/Page';
import { PortfolioSubmenu } from '../PortfolioSubmenu';
import { DetailsPage } from './Details';

export const MarginAccountsDetailsPage: React.FunctionComponent = () => {
  return <Page leftPanelSubmenu={<PortfolioSubmenu />} mainSlot={<DetailsPage />} />;
};

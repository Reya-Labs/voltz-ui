import React from 'react';

import { Page } from '../../../components/Page';
import { PortfolioSubmenu } from '../PortfolioSubmenu';
import { Optimisers } from './Optimisers';
import { PortfolioOptimisersBox } from './PortfolioOptimisers.styled';

export const PortfolioOptimisersPage: React.FunctionComponent = () => {
  return (
    <Page
      leftPanelSubmenu={<PortfolioSubmenu />}
      mainSlot={
        <PortfolioOptimisersBox>
          <Optimisers />
        </PortfolioOptimisersBox>
      }
    />
  );
};

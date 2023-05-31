import React from 'react';

import { VoltzPage } from '../../../components/VoltzPage';
import { PortfolioSubmenu } from '../PortfolioSubmenu';
import { Optimisers } from './Optimisers';
import { PortfolioOptimisersBox } from './PortfolioOptimisers.styled';

export const PortfolioOptimisersPage: React.FunctionComponent = () => {
  return (
    <VoltzPage
      leftPanelSubmenu={<PortfolioSubmenu />}
      mainSlot={
        <PortfolioOptimisersBox>
          <Optimisers />
        </PortfolioOptimisersBox>
      }
    />
  );
};

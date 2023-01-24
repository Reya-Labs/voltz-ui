import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { doNothing } from '../../../../../utilities/doNothing';
import { routes } from '../../../../paths';
import { BatchBudgetTrigger } from '../BatchBudgetTrigger/BatchBudgetTrigger';
import {
  BottomBox,
  CircledBlueCheckmark,
  ContentBox,
  GotoYourPortfolioLink,
  TitleTypography,
  TopBox,
  ViewOnEtherScanLink,
} from './DepositSuccessModalContent.styled';

type Props = {
  lpVault: MellowProduct;
  onBatchBudgetModalOpen: () => void;
  onBatchBudgetModalClose: () => void;
  isBatchFlowOpen: boolean;
};

export const DepositSuccessModalContent: React.FunctionComponent<Props> = ({
  onBatchBudgetModalOpen = doNothing,
  onBatchBudgetModalClose = doNothing,
  lpVault,
  isBatchFlowOpen,
}) => (
  <ContentBox
    sx={{
      display: isBatchFlowOpen ? 'none' : undefined,
    }}
  >
    <TopBox>
      <CircledBlueCheckmark />
      <TitleTypography>TRANSACTION SUBMITTED</TitleTypography>
      <ViewOnEtherScanLink href={'https://voltz.xyz'}>VIEW ON ETHERSCAN</ViewOnEtherScanLink>
      <GotoYourPortfolioLink to={`${routes.LP_PORTFOLIO}`}>
        GO TO YOUR PORTFOLIO
      </GotoYourPortfolioLink>
    </TopBox>
    <BottomBox>
      <BatchBudgetTrigger
        lpVault={lpVault}
        onClose={onBatchBudgetModalClose}
        onOpen={onBatchBudgetModalOpen}
      />
    </BottomBox>
  </ContentBox>
);

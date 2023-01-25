import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { doNothing } from '../../../../../utilities/doNothing';
import { getViewOnEtherScanLink } from '../../../../../utilities/getViewOnEtherScanLink';
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
  depositTransactionId: string;
};

export const DepositSuccessModalContent: React.FunctionComponent<Props> = ({
  onBatchBudgetModalOpen = doNothing,
  onBatchBudgetModalClose = doNothing,
  lpVault,
  isBatchFlowOpen,
  depositTransactionId,
}) => (
  <ContentBox
    data-testid="DepositSuccessModalContent-ContentBox"
    sx={{
      display: isBatchFlowOpen ? 'none' : undefined,
    }}
  >
    <TopBox>
      <CircledBlueCheckmark />
      <TitleTypography>TRANSACTION SUBMITTED</TitleTypography>
      <ViewOnEtherScanLink
        data-testid="DepositSuccessModalContent-ViewOnEtherScanLink"
        href={getViewOnEtherScanLink(
          process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK,
          depositTransactionId,
        )}
      >
        VIEW ON ETHERSCAN
      </ViewOnEtherScanLink>
      <GotoYourPortfolioLink
        data-testid="DepositSuccessModalContent-GotoYourPortfolioLink"
        to={`/${routes.LP_PORTFOLIO}`}
      >
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

import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';
import { CloseButton, ExternalLink, Typography } from 'brokoli-ui';
import React from 'react';

import { routes, useAppSelector } from '../../../../../app';
import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { selectChainId } from '../../../../../app/features/network';
import { doNothing } from '../../../../../utilities/doNothing';
import { TitleBox } from '../../../../components/SettleFlow/SettleConfirmationStep/SettleConfirmationStep.styled';
import { VoltzAppLink } from '../../../../components/VoltzAppLink';
import { BatchBudgetTrigger } from '../BatchBudgetTrigger/BatchBudgetTrigger';
import { BottomBox, ContentBox, TopBox } from './DepositSuccessModalContent.styled';

type Props = {
  lpVault: OptimiserInfo;
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
}) => {
  const chainId = useAppSelector(selectChainId);
  if (isBatchFlowOpen) {
    return null;
  }
  return (
    <ContentBox data-testid="DepositSuccessModalContent-ContentBox">
      <TopBox>
        <TitleBox>
          <Typography
            colorToken="white100"
            data-testid="ConfirmBatchBudgetModalContent-TitleTypography"
            typographyToken="primaryHeader3Bold"
          >
            Transaction Submitted
          </Typography>
          <CloseButton onClick={onBatchBudgetModalClose} />
        </TitleBox>
        <ExternalLink
          colorToken="primary"
          data-testid="DepositSuccessModalContent-ViewOnEtherScanLink"
          href={getViewOnEtherScanLink(chainId, depositTransactionId)}
          typographyToken="primaryBodyMediumRegular"
        >
          View on Etherscan
        </ExternalLink>
        <VoltzAppLink
          colorToken="primary"
          data-testid="DepositSuccessModalContent-GotoYourPortfolioLink"
          to={`/${routes.PORTFOLIO_POSITIONS}`}
          typographyToken="primaryBodyMediumRegular"
        >
          Go to Your Portfolio
        </VoltzAppLink>
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
};

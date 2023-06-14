import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';
import { AppLink, CloseButton, ExternalLink, Typography } from 'brokoli-ui';
import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { selectChainId } from '../../../../../app/features/network';
import { useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { doNothing } from '../../../../../utilities/doNothing';
import { TitleBox } from '../../../../components/SettleFlow/SettleConfirmationStep/SettleConfirmationStep.styled';
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
            colorToken="lavenderWeb"
            data-testid="ConfirmBatchBudgetModalContent-TitleTypography"
            typographyToken="primaryHeader3Bold"
          >
            Transaction Submitted
          </Typography>
          <CloseButton onClick={onBatchBudgetModalClose} />
        </TitleBox>
        <ExternalLink
          colorToken="skyBlueCrayola"
          data-testid="DepositSuccessModalContent-ViewOnEtherScanLink"
          href={getViewOnEtherScanLink(chainId, depositTransactionId)}
          typographyToken="primaryBodyMediumRegular"
        >
          View on Etherscan
        </ExternalLink>
        <AppLink
          colorToken="skyBlueCrayola"
          data-testid="DepositSuccessModalContent-GotoYourPortfolioLink"
          to={`/${routes.PORTFOLIO_POSITIONS}`}
          typographyToken="primaryBodyMediumRegular"
        >
          Go to Your Portfolio
        </AppLink>
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

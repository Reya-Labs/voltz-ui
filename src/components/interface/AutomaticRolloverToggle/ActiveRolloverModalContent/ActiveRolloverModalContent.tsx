import React from 'react';

import {
  ButtonBox,
  CancelButton,
  ContentBox,
  DescriptionTypography,
  GasCostBox,
  GasCostTypography,
  GasIcon,
  ProceedButton,
  TitleTypography,
  TransactionStatusTypography,
} from './ActiveRolloverModalContent.styled';

type Props = {
  onProceed: () => void;
  onCancel: () => void;
  transactionStatus: string;
};
export const ActiveRolloverModalContent: React.FunctionComponent<Props> = ({
  onCancel,
  onProceed,
  transactionStatus,
}) => (
  <ContentBox>
    <TitleTypography>AUTOMATIC ROLLOVER</TitleTypography>
    <DescriptionTypography>
      Your choice will be saved on chain, so there will be an additional one-time, small gas fee.
      This configuration will be applied to all your funds in this Optimiser when you confirm the
      new deposit.
    </DescriptionTypography>
    <GasCostBox>
      <GasIcon />
      <GasCostTypography>TODO: GET COST FROM SDK</GasCostTypography>
    </GasCostBox>
    <ButtonBox>
      <ProceedButton onClick={onProceed}>PROCEED</ProceedButton>
      <CancelButton onClick={onCancel}>CANCEL</CancelButton>
    </ButtonBox>
    <TransactionStatusTypography>{transactionStatus}</TransactionStatusTypography>
  </ContentBox>
);

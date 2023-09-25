import { Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectInfoPostSwapAverageFixedRate,
  selectInfoPostSwapVariableTokenDeltaBalance,
  selectProspectiveSwapMode,
  selectSwapFormAMM,
  selectSwapFormPosition,
} from '../../../../app/features/forms/trader/swap';
import { CashFlowCalculator } from '../../../components/CashflowCalculator';
import {
  FormBox,
  FormOuterBox,
  MarginAccountBox,
  TitleBox,
  TransactionDetailsBox,
} from '../../../components/FormStyled';
import { MarginAccount } from './MarginAccount';
import { MarginUpdateConfirmationFlow } from './MarginUpdateConfirmationFlow';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { SubmitButton } from './SubmitButton';
import { SwapConfirmationFlow } from './SwapConfirmationFlow';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const averageFixedRate = useAppSelector(selectInfoPostSwapAverageFixedRate);
  const variableTokenDeltaBalance = useAppSelector(selectInfoPostSwapVariableTokenDeltaBalance);
  const position = useAppSelector(selectSwapFormPosition);
  const mode = useAppSelector(selectProspectiveSwapMode);

  if (!aMM) {
    return null;
  }

  return (
    <React.Fragment>
      <SwapConfirmationFlow />
      <MarginUpdateConfirmationFlow />
      <FormOuterBox>
        <MarginAccountBox>
          <MarginAccount />
        </MarginAccountBox>
        <TitleBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
            SWAP Rates
          </Typography>
        </TitleBox>
        <FormBox>
          <NotionalSwap />
          <NotionalAmountField />
          <SubmitButton />
        </FormBox>
        <TransactionDetailsBox>
          <TransactionDetails />
        </TransactionDetailsBox>
        <CashFlowCalculator
          aMM={aMM}
          averageFixedRate={averageFixedRate}
          mode={mode}
          position={position}
          variableTokenDeltaBalance={variableTokenDeltaBalance}
        />
      </FormOuterBox>
    </React.Fragment>
  );
};

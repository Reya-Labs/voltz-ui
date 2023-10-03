import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectProspectiveSwapMode,
  selectSwapFormPool,
} from '../../../../app/features/forms/trader/swap';
import { CashflowCalculatorModal } from '../../../components/CashflowCalculatorModal';
import {
  FormBox,
  FormOuterBox,
  MarginAccountBox,
  TransactionDetailsBox,
} from '../../../components/FormStyled';
import { MarginAccount } from './MarginAccount';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { SubmitButton } from './SubmitButton';
import { SwapConfirmationFlow } from './SwapConfirmationFlow';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  const pool = useAppSelector(selectSwapFormPool);
  const mode = useAppSelector(selectProspectiveSwapMode);

  if (!pool) {
    return null;
  }

  return (
    <React.Fragment>
      <SwapConfirmationFlow />
      <FormOuterBox>
        <MarginAccountBox>
          <MarginAccount />
        </MarginAccountBox>
        <FormBox>
          <NotionalSwap />
          <NotionalAmountField />
          <TransactionDetailsBox>
            <TransactionDetails />
          </TransactionDetailsBox>
          <SubmitButton />
        </FormBox>
        <CashflowCalculatorModal mode={mode} pool={pool} />
      </FormOuterBox>
    </React.Fragment>
  );
};

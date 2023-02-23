import { Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectFixedRateInfo,
  selectMode,
  selectVariableRateInfo,
  setModeAction,
} from '../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { FormBox, , FormOuterBox, TitleBox } from './Form.styled';
import { LeverageField } from './LeverageField';
import { MarginAmountField } from './MarginAmountField';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { SubmitButton } from './SubmitButton';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectMode);

  const handleOnChange = useCallback(
    (value?: 'fixed' | 'variable') => {
      if (!value) {
        return;
      }
      dispatch(
        setModeAction({
          value,
        }),
      );
    },
    [dispatch],
  );

  // TODO: move the mode to the redux store
  return (
    <FormOuterBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
          SWAP Rates
        </Typography>
      </TitleBox>
      <FormBox>
        <NotionalSwap fixedRate={fixedRateInfo.value}
                      mode={mode}
                      variableRate={variableRateInfo.value}
                      onSwap={handleOnChange}
        />
        <NotionalAmountField />
        <LeverageField />
        <MarginAmountField />
        <SubmitButton />
      </FormBox>
      <TransactionDetails />
    </FormOuterBox>
  );
};

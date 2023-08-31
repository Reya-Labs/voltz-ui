import { Button, CloseButton, Typography } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo } from 'react';

import {
  closeMarginAccountWithdrawFlowAction,
  fetchAvailableAmountsToWithdrawForMarginAccountThunk,
  fetchMarginAccountsForWithdrawThunk,
  marginAmountWithdrawFlowValueChangeAction,
  selectMarginAccountWithdrawFlowAction,
  selectMarginAccountWithdrawFlowAvailableAmounts,
  selectMarginAccountWithdrawFlowAvailableAmountsLoading,
  selectMarginAccountWithdrawFlowCTADisabled,
  selectMarginAccountWithdrawFlowError,
  selectMarginAccountWithdrawFlowMarginAccounts,
  selectMarginAccountWithdrawFlowMarginAccountsLoading,
  selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  selectMarginAccountWithdrawFlowStep,
  selectMarginAccountWithdrawFlowUserInputFormatted,
  selectMarginAccountWithdrawFlowValidationError,
  simulateWithdrawMarginFromMarginAccountThunk,
  withdrawMarginFromMarginAccountThunk,
} from '../../../../../../../../app/features/portfolio';
import { AvailableAmountsUI } from '../../../../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import { useWallet } from '../../../../../../../../hooks/useWallet';
import { localeParseFloat } from '../../../../../../../../utilities/localeParseFloat';
import { MarginAccountsSearchField } from '../../../../../../../components/MarginAccountsSearchField';
import { MarginAmountField } from '../../MarginAmountField';
import { WithdrawMarginDetails } from './WithdrawMarginDetails';
import { ContentBox, MidBox, TitleBox } from './WithdrawMarginDialogContent.styled';

export const WithdrawMarginDialogContent: React.FunctionComponent = () => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMarginAccountWithdrawFlowStep) === 'withdrawing';
  const error = useAppSelector(selectMarginAccountWithdrawFlowError);
  const validationError = useAppSelector(selectMarginAccountWithdrawFlowValidationError);
  const computedError = error || validationError;
  const disabled = useAppSelector(selectMarginAccountWithdrawFlowCTADisabled);
  const marginAccounts = useAppSelector(selectMarginAccountWithdrawFlowMarginAccounts);
  const marginAccountsLoading = useAppSelector(
    selectMarginAccountWithdrawFlowMarginAccountsLoading,
  );
  const { id: selectedMarginAccountId } = useAppSelector(
    selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  );
  const { token, amount } = useAppSelector(selectMarginAccountWithdrawFlowUserInputFormatted);
  const availableAmountsLoading = useAppSelector(
    selectMarginAccountWithdrawFlowAvailableAmountsLoading,
  );
  const availableAmounts = useAppSelector(selectMarginAccountWithdrawFlowAvailableAmounts);
  const handleOnCloseClick = () => dispatch(closeMarginAccountWithdrawFlowAction());
  const handleOnCTAClick = () => {
    void dispatch(withdrawMarginFromMarginAccountThunk());
  };

  const debouncedWithdrawSimulation = useMemo(
    () =>
      debounce(
        (nextAmount: number, nextToken: AvailableAmountsUI['token'], marginAccountId: string) => {
          void dispatch(
            simulateWithdrawMarginFromMarginAccountThunk({
              amount: nextAmount,
              token: nextToken,
              marginAccountId,
            }),
          );
        },
        300,
      ),
    [dispatch],
  );
  const handleMarginAmountOnChange = ({
    value = '',
    changeVia,
    token: nextToken,
  }: {
    value: string | undefined;
    changeVia: 'input' | 'selection' | 'maxButton';
    token?: string | undefined;
  }) => {
    let maxAmount;
    let maxAmountUSD;
    const valueNumber = value ? localeParseFloat(value) : 0;
    if (changeVia === 'selection' || changeVia === 'maxButton') {
      const availableAmount = availableAmounts.find(
        (aM) => aM.value === valueNumber && aM.token === nextToken,
      );
      if (availableAmount) {
        maxAmount = availableAmount.value;
        maxAmountUSD = availableAmount.valueUSD;
      }
    }

    dispatch(
      marginAmountWithdrawFlowValueChangeAction({
        value: valueNumber,
        maxAmount,
        maxAmountUSD,
        token: nextToken as AvailableAmountsUI['token'],
      }),
    );

    debouncedWithdrawSimulation(
      valueNumber,
      nextToken as AvailableAmountsUI['token'],
      selectedMarginAccountId,
    );
  };

  const handleOnMarginAccountClick = (id: string) => {
    dispatch(
      selectMarginAccountWithdrawFlowAction({
        id,
      }),
    );
  };
  useEffect(() => {
    if (!account) {
      return;
    }

    void dispatch(
      fetchMarginAccountsForWithdrawThunk({
        account,
      }),
    );
  }, [dispatch, account]);

  useEffect(() => {
    if (!selectedMarginAccountId) {
      return;
    }
    void dispatch(
      fetchAvailableAmountsToWithdrawForMarginAccountThunk({
        id: selectedMarginAccountId,
      }),
    );
  }, [dispatch, selectedMarginAccountId]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedWithdrawSimulation.cancel();
    };
  }, []);

  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Withdraw Margin
        </Typography>
        <CloseButton onClick={handleOnCloseClick} />
      </TitleBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <MidBox>
        <MarginAccountsSearchField
          disabled={marginAccountsLoading}
          marginAccounts={marginAccounts}
          selectedMarginAccountId={selectedMarginAccountId}
          onMarginAccountClick={handleOnMarginAccountClick}
        />
        <MarginAmountField
          disabled={availableAmountsLoading || !selectedMarginAccountId}
          marginAmountOptions={availableAmounts}
          token={token}
          value={amount.toString()}
          onChange={handleMarginAmountOnChange}
        />
        <WithdrawMarginDetails />
      </MidBox>
      <Button
        bottomLeftText={computedError ? computedError : ''}
        bottomLeftTextColorToken={computedError ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={computedError ? 'primaryBodyXSmallRegular' : undefined}
        disabled={disabled}
        loading={loading}
        variant="primary"
        onClick={handleOnCTAClick}
      >
        Withdraw Margin
      </Button>
    </ContentBox>
  );
};

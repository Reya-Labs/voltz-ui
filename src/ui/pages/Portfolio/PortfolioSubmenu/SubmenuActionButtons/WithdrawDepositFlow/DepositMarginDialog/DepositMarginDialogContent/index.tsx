import { Button, CloseButton, Typography } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../../../app';
import {
  approveTokenForPeripheryThunk,
  closeMarginAccountDepositFlowAction,
  depositMarginFromMarginAccountThunk,
  fetchAvailableAmountsToDepositForMarginAccountThunk,
  fetchMarginAccountsForDepositThunk,
  getTokenAllowanceForPeripheryThunk,
  marginAmountDepositFlowValueChangeAction,
  selectMarginAccountDepositFlowAction,
  selectMarginAccountDepositFlowAvailableAmounts,
  selectMarginAccountDepositFlowAvailableAmountsLoading,
  selectMarginAccountDepositFlowCTADisabled,
  selectMarginAccountDepositFlowCTAText,
  selectMarginAccountDepositFlowDisableMarginAccountSelection,
  selectMarginAccountDepositFlowError,
  selectMarginAccountDepositFlowHasSimulationError,
  selectMarginAccountDepositFlowMarginAccounts,
  selectMarginAccountDepositFlowMarginAccountsLoading,
  selectMarginAccountDepositFlowQueuedSelectedMarginAccountId,
  selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  selectMarginAccountDepositFlowShouldApproveToken,
  selectMarginAccountDepositFlowStep,
  selectMarginAccountDepositFlowUserInputFormatted,
  selectMarginAccountDepositFlowValidationError,
  selectMarginAccountDepositFlowWalletTokenAllowanceHasError,
  simulateDepositMarginFromMarginAccountThunk,
} from '../../../../../../../../app/features/deposit-flow';
import { AvailableAmountsUI } from '../../../../../../../../app/features/portfolio/types';
import { localeParseFloat } from '../../../../../../../../utilities/localeParseFloat';
import { MarginAccountsSearchField } from '../../../../../../../components/MarginAccountsSearchField';
import { useWallet } from '../../../../../../../hooks/useWallet';
import { MarginAmountField } from '../../MarginAmountField';
import { DepositMarginDetails } from './DepositMarginDetails';
import { ContentBox, MidBox, TitleBox } from './DepositMarginDialogContent.styled';

export const DepositMarginDialogContent: React.FunctionComponent = () => {
  const step = useAppSelector(selectMarginAccountDepositFlowStep);
  const walletTokenAllowanceHasError = useAppSelector(
    selectMarginAccountDepositFlowWalletTokenAllowanceHasError,
  );
  const hasSimulationError = useAppSelector(selectMarginAccountDepositFlowHasSimulationError);
  const { account, signer } = useWallet();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMarginAccountDepositFlowStep) === 'depositing';
  const error = useAppSelector(selectMarginAccountDepositFlowError);
  const { validationError } = useAppSelector(selectMarginAccountDepositFlowValidationError);
  const computedError = error || validationError;
  const disableMarginAccountSelection = useAppSelector(
    selectMarginAccountDepositFlowDisableMarginAccountSelection,
  );
  const disabled = useAppSelector(selectMarginAccountDepositFlowCTADisabled);
  const marginAccounts = useAppSelector(selectMarginAccountDepositFlowMarginAccounts);
  const marginAccountsLoading = useAppSelector(selectMarginAccountDepositFlowMarginAccountsLoading);
  const { id: selectedMarginAccountId } = useAppSelector(
    selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  );
  const queuedSelectedMarginAccountId = useAppSelector(
    selectMarginAccountDepositFlowQueuedSelectedMarginAccountId,
  );
  const ctaText = useAppSelector(selectMarginAccountDepositFlowCTAText);
  const { token, amount } = useAppSelector(selectMarginAccountDepositFlowUserInputFormatted);
  const availableAmountsLoading = useAppSelector(
    selectMarginAccountDepositFlowAvailableAmountsLoading,
  );
  const shouldApproveToken = useAppSelector(selectMarginAccountDepositFlowShouldApproveToken);
  const availableAmounts = useAppSelector(selectMarginAccountDepositFlowAvailableAmounts);
  const handleOnCloseClick = () => dispatch(closeMarginAccountDepositFlowAction());
  const handleOnCTAClick = () => {
    if (!token || !signer) {
      return;
    }
    if (walletTokenAllowanceHasError) {
      void dispatch(
        getTokenAllowanceForPeripheryThunk({
          signer,
          tokenName: token,
        }),
      );
      return;
    }
    if (hasSimulationError) {
      void dispatch(
        simulateDepositMarginFromMarginAccountThunk({
          amount,
          token,
          marginAccountId: selectedMarginAccountId,
        }),
      );
      return;
    }
    if (shouldApproveToken) {
      void dispatch(
        approveTokenForPeripheryThunk({
          signer,
          tokenName: token,
        }),
      );
      return;
    }

    void dispatch(depositMarginFromMarginAccountThunk());
  };

  useEffect(() => {
    if (step !== 'opened' || !signer || !token) {
      return;
    }
    void dispatch(
      getTokenAllowanceForPeripheryThunk({
        signer,
        tokenName: token,
      }),
    );
  }, [dispatch, signer, step, token]);
  // TODO: FB evaluate before launch - refactor #1
  const debouncedDepositSimulation = useMemo(
    () =>
      debounce(
        (nextAmount: number, nextToken: AvailableAmountsUI['token'], marginAccountId: string) => {
          if (nextAmount <= 0) {
            return;
          }

          void dispatch(
            simulateDepositMarginFromMarginAccountThunk({
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
      marginAmountDepositFlowValueChangeAction({
        value: valueNumber,
        maxAmount,
        maxAmountUSD,
        token: nextToken as AvailableAmountsUI['token'],
      }),
    );

    debouncedDepositSimulation(
      valueNumber,
      nextToken as AvailableAmountsUI['token'],
      selectedMarginAccountId,
    );
  };

  const handleOnMarginAccountClick = (id: string) => {
    dispatch(
      selectMarginAccountDepositFlowAction({
        id,
      }),
    );
  };
  useEffect(() => {
    if (!account) {
      return;
    }

    void dispatch(
      fetchMarginAccountsForDepositThunk({
        account,
      }),
    );
  }, [dispatch, account]);

  useEffect(() => {
    if (!selectedMarginAccountId) {
      return;
    }
    void dispatch(
      fetchAvailableAmountsToDepositForMarginAccountThunk({
        id: selectedMarginAccountId,
      }),
    );
  }, [dispatch, selectedMarginAccountId]);

  useEffect(() => {
    if (!queuedSelectedMarginAccountId || marginAccounts.length === 0 || marginAccountsLoading) {
      return;
    }
    dispatch(
      selectMarginAccountDepositFlowAction({
        id: queuedSelectedMarginAccountId,
      }),
    );
  }, [dispatch, marginAccountsLoading, marginAccounts, queuedSelectedMarginAccountId]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedDepositSimulation.cancel();
    };
  }, []);

  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
          Deposit Margin
        </Typography>
        <CloseButton onClick={handleOnCloseClick} />
      </TitleBox>
      <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <MidBox>
        <MarginAccountsSearchField
          disabled={marginAccountsLoading || disableMarginAccountSelection}
          marginAccounts={marginAccounts}
          selectedMarginAccountId={selectedMarginAccountId}
          onMarginAccountClick={handleOnMarginAccountClick}
        />
        <MarginAmountField
          disabled={availableAmountsLoading || !selectedMarginAccountId}
          label="Amount to deposit"
          marginAmountOptions={availableAmounts}
          token={token}
          value={amount.toString()}
          onChange={handleMarginAmountOnChange}
        />
        <DepositMarginDetails />
      </MidBox>
      <Button
        bottomLeftText={computedError ? computedError : ''}
        bottomLeftTextColorToken={computedError ? 'error100' : undefined}
        bottomLeftTextTypographyToken={computedError ? 'primaryBodyXSmallRegular' : undefined}
        disabled={disabled}
        loading={loading}
        variant="primary"
        onClick={handleOnCTAClick}
      >
        {ctaText}
      </Button>
    </ContentBox>
  );
};

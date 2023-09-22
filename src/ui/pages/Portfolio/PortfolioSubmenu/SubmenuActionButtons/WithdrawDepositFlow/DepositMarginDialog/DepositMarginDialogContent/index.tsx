import { Button, CloseButton, Typography } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo } from 'react';

import {
  closeMarginAccountDepositFlowAction,
  depositMarginFromMarginAccountThunk,
  fetchAvailableAmountsToDepositForMarginAccountThunk,
  fetchMarginAccountsForDepositThunk,
  marginAmountDepositFlowValueChangeAction,
  selectMarginAccountDepositFlowAction,
  selectMarginAccountDepositFlowAvailableAmounts,
  selectMarginAccountDepositFlowAvailableAmountsLoading,
  selectMarginAccountDepositFlowCTADisabled,
  selectMarginAccountDepositFlowError,
  selectMarginAccountDepositFlowMarginAccounts,
  selectMarginAccountDepositFlowMarginAccountsLoading,
  selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  selectMarginAccountDepositFlowStep,
  selectMarginAccountDepositFlowUserInputFormatted,
  selectMarginAccountDepositFlowValidationError,
  simulateDepositMarginFromMarginAccountThunk,
} from '../../../../../../../../app/features/portfolio';
import { AvailableAmountsUI } from '../../../../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import { localeParseFloat } from '../../../../../../../../utilities/localeParseFloat';
import { MarginAccountsSearchField } from '../../../../../../../components/MarginAccountsSearchField';
import { useWallet } from '../../../../../../../hooks/useWallet';
import { MarginAmountField } from '../../MarginAmountField';
import { DepositMarginDetails } from './DepositMarginDetails';
import { ContentBox, MidBox, TitleBox } from './DepositMarginDialogContent.styled';

export const DepositMarginDialogContent: React.FunctionComponent = () => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMarginAccountDepositFlowStep) === 'depositing';
  const error = useAppSelector(selectMarginAccountDepositFlowError);
  const validationError = useAppSelector(selectMarginAccountDepositFlowValidationError);
  const computedError = error || validationError;
  const disabled = useAppSelector(selectMarginAccountDepositFlowCTADisabled);
  const marginAccounts = useAppSelector(selectMarginAccountDepositFlowMarginAccounts);
  const marginAccountsLoading = useAppSelector(selectMarginAccountDepositFlowMarginAccountsLoading);
  const { id: selectedMarginAccountId } = useAppSelector(
    selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  );
  const { token, amount } = useAppSelector(selectMarginAccountDepositFlowUserInputFormatted);
  const availableAmountsLoading = useAppSelector(
    selectMarginAccountDepositFlowAvailableAmountsLoading,
  );
  const availableAmounts = useAppSelector(selectMarginAccountDepositFlowAvailableAmounts);
  const handleOnCloseClick = () => dispatch(closeMarginAccountDepositFlowAction());
  const handleOnCTAClick = () => {
    void dispatch(depositMarginFromMarginAccountThunk());
  };

  const debouncedDepositSimulation = useMemo(
    () =>
      debounce(
        (nextAmount: number, nextToken: AvailableAmountsUI['token'], marginAccountId: string) => {
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
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Deposit Margin
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
        <DepositMarginDetails />
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
        Deposit Margin
      </Button>
    </ContentBox>
  );
};

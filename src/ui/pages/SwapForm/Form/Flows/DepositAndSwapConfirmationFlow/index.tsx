import { Button, CloseButton, Dialog, Typography } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  approveTokenForPeripheryThunk,
  closeDepositAndSwapConfirmationFlowAction,
  depositAndSwapThunk,
  getTokenAllowanceForPeripheryThunk,
  marginAmountDepositFlowValueChangeAction,
  selectDepositAndSwapConfirmationButtonState,
  selectDepositAndSwapConfirmationFlowEtherscanLink,
  selectDepositAndSwapConfirmationFlowHasSimulationError,
  selectDepositAndSwapConfirmationFlowShouldApproveToken,
  selectDepositAndSwapConfirmationFlowStep,
  selectDepositAndSwapConfirmationFlowWalletTokenAllowanceHasError,
  selectMarginAccountAvailableAmounts,
  selectMarginAccountAvailableAmountsLoading,
  selectMarginAccountUserInputFormatted,
  selectSwapFormMarginAccount,
  simulateSwapThunk,
} from '../../../../../../app/features/forms/trader/swap';
import { resetPortfolioStateAction } from '../../../../../../app/features/portfolio';
import { AvailableAmountsUI } from '../../../../../../app/features/portfolio/types';
import { localeParseFloat } from '../../../../../../utilities/localeParseFloat';
import { ExplorerLink } from '../../../../../components/ExplorerLink';
import { useWallet } from '../../../../../hooks/useWallet';
import { MarginAmountField } from '../../../../Portfolio/PortfolioSubmenu/SubmenuActionButtons/WithdrawDepositFlow/MarginAmountField';
import { SwapDetails } from '../SwapDetails';
import {
  ButtonBox,
  MarginAccountBox,
  MarginAmountFieldBox,
  SwapConfirmationStepBox,
  SwapDetailsBox,
  TitleBox,
} from './DepositAndSwapConfirmationFlow.styled';

export const DepositAndSwapConfirmationFlow: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const navigate = useNavigate();
  const step = useAppSelector(selectDepositAndSwapConfirmationFlowStep);
  const walletTokenAllowanceHasError = useAppSelector(
    selectDepositAndSwapConfirmationFlowWalletTokenAllowanceHasError,
  );
  const marginAccount = useAppSelector(selectSwapFormMarginAccount);
  const hasSimulationError = useAppSelector(selectDepositAndSwapConfirmationFlowHasSimulationError);
  const dispatch = useAppDispatch();
  const { token, amount } = useAppSelector(selectMarginAccountUserInputFormatted);
  const availableAmountsLoading = useAppSelector(selectMarginAccountAvailableAmountsLoading);
  const shouldApproveToken = useAppSelector(selectDepositAndSwapConfirmationFlowShouldApproveToken);
  const availableAmounts = useAppSelector(selectMarginAccountAvailableAmounts);
  const executeSwap = useCallback(() => {
    void dispatch(depositAndSwapThunk());
  }, [dispatch]);
  const visitPortfolio = useCallback(() => {
    dispatch(closeDepositAndSwapConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  const handleOnSubmitButtonClick = () => {
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
        simulateSwapThunk({
          deposit: {
            amount,
            token,
          },
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

    if (step === 'depositAndSwapConfirmation') {
      executeSwap();
    }
    if (step === 'depositAndSwapCompleted') {
      visitPortfolio();
    }
  };

  useEffect(() => {
    if (step !== 'depositAndSwapConfirmation' || !signer || !token) {
      return;
    }
    void dispatch(
      getTokenAllowanceForPeripheryThunk({
        signer,
        tokenName: token,
      }),
    );
  }, [dispatch, signer, step, token]);

  const etherscanLink = useAppSelector(selectDepositAndSwapConfirmationFlowEtherscanLink);
  const buttonState = useAppSelector(selectDepositAndSwapConfirmationButtonState);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeDepositAndSwapConfirmationFlowAction());
  }, [dispatch]);
  // TODO: FB evaluate before launch - refactor #1
  const debouncedDepositSimulation = useMemo(
    () =>
      debounce((nextAmount: number, nextToken: AvailableAmountsUI['token']) => {
        if (nextAmount <= 0) {
          return;
        }

        void dispatch(
          simulateSwapThunk({
            deposit: {
              amount: nextAmount,
              token: nextToken,
            },
          }),
        );
      }, 300),
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

    debouncedDepositSimulation(valueNumber, nextToken as AvailableAmountsUI['token']);
  };

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedDepositSimulation.cancel();
    };
  }, []);

  if (!marginAccount) {
    return null;
  }

  return (
    <Dialog open={step !== null}>
      <SwapConfirmationStepBox>
        <TitleBox>
          <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
            Deposit and Swap
          </Typography>
          <CloseButton onClick={handleCloseButtonClick} />
        </TitleBox>
        <MarginAccountBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Margin Account
          </Typography>
          <Typography colorToken="white100" typographyToken="primaryBodyMediumBold">
            {marginAccount.name}
          </Typography>
        </MarginAccountBox>
        <SwapDetailsBox>
          {step !== 'depositAndSwapCompleted' ? (
            <MarginAmountFieldBox>
              <MarginAmountField
                disabled={
                  availableAmountsLoading || step === 'waitingForDepositAndSwapConfirmation'
                }
                label="Amount to deposit"
                marginAmountOptions={availableAmounts}
                token={token}
                value={amount.toString()}
                onChange={handleMarginAmountOnChange}
              />
            </MarginAmountFieldBox>
          ) : null}
          <SwapDetails />
        </SwapDetailsBox>
        <ButtonBox>
          <Button
            bottomLeftText={buttonState.message.text}
            bottomLeftTextColorToken={
              buttonState.message.type === 'error'
                ? 'error100'
                : buttonState.message.type === 'warning'
                ? 'warning100'
                : 'white300'
            }
            bottomLeftTextTypographyToken="primaryBodyXSmallRegular"
            disabled={buttonState.disabled}
            variant="primary"
            onClick={handleOnSubmitButtonClick}
          >
            {buttonState.text}
          </Button>
          {etherscanLink ? <ExplorerLink link={etherscanLink} /> : null}
        </ButtonBox>
      </SwapConfirmationStepBox>
    </Dialog>
  );
};

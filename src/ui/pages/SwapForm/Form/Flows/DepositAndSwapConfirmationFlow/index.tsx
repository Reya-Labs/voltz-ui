import { Button, CloseButton, Dialog, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeSwapConfirmationFlowAction,
  depositAndSwapThunk,
  selectDepositAndSwapConfirmationButtonState,
  selectDepositAndSwapConfirmationFlowEtherscanLink,
  selectDepositAndSwapConfirmationFlowStep,
  selectSwapFormMarginAccount,
} from '../../../../../../app/features/forms/trader/swap';
import { resetPortfolioStateAction } from '../../../../../../app/features/portfolio';
import { ExplorerLink } from '../../../../../components/ExplorerLink';
import { SwapDetails } from '../SwapDetails';
import {
  ButtonBox,
  MarginAccountBox,
  SwapConfirmationStepBox,
  SwapDetailsBox,
  TitleBox,
} from './DepositAndSwapConfirmationFlow.styled';

export const DepositAndSwapConfirmationFlow: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const step = useAppSelector(selectDepositAndSwapConfirmationFlowStep);
  const marginAccount = useAppSelector(selectSwapFormMarginAccount);
  const dispatch = useAppDispatch();
  const executeSwap = useCallback(() => {
    void dispatch(depositAndSwapThunk());
  }, [dispatch]);
  const visitPortfolio = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  const handleOnSubmitButtonClick = useCallback(() => {
    if (step === 'depositAndSwapConfirmation') {
      executeSwap();
    }
    if (step === 'depositAndSwapCompleted') {
      visitPortfolio();
    }
  }, [step, executeSwap, visitPortfolio]);

  const etherscanLink = useAppSelector(selectDepositAndSwapConfirmationFlowEtherscanLink);
  const buttonState = useAppSelector(selectDepositAndSwapConfirmationButtonState);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
  }, [dispatch]);
  if (!marginAccount) {
    return null;
  }

  return (
    <Dialog open={step !== null}>
      <SwapConfirmationStepBox>
        <TitleBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
            Deposit and Swap
          </Typography>
          <CloseButton onClick={handleCloseButtonClick} />
        </TitleBox>
        <MarginAccountBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Margin Account
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
            {marginAccount.name}
          </Typography>
        </MarginAccountBox>
        <SwapDetailsBox>
          <SwapDetails />
        </SwapDetailsBox>
        <ButtonBox>
          <Button
            bottomLeftText={buttonState.message.text}
            bottomLeftTextColorToken={
              buttonState.message.type === 'error'
                ? 'wildStrawberry'
                : buttonState.message.type === 'warning'
                ? 'orangeYellow'
                : 'lavenderWeb2'
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

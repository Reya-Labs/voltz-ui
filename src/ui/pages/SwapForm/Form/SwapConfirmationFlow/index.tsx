import { Button, CloseButton, Dialog, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, useAppDispatch, useAppSelector } from '../../../../../app';
import {
  closeSwapConfirmationFlowAction,
  selectSwapConfirmationButtonState,
  selectSwapConfirmationFlowEtherscanLink,
  selectSwapConfirmationFlowStep,
  selectSwapFormMarginAccount,
  swapThunk,
} from '../../../../../app/features/forms/trader/swap';
import { resetPortfolioStateAction } from '../../../../../app/features/portfolio';
import { ExplorerLink } from '../../../../components/ExplorerLink';
import {
  ButtonBox,
  MarginAccountBox,
  SwapConfirmationStepBox,
  SwapDetailsBox,
  TitleBox,
} from './SwapConfirmationFlow.styled';
import { SwapDetails } from './SwapDetails';

export const SwapConfirmationFlow: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const step = useAppSelector(selectSwapConfirmationFlowStep);
  const marginAccount = useAppSelector(selectSwapFormMarginAccount);
  const dispatch = useAppDispatch();
  const executeSwap = useCallback(() => {
    void dispatch(swapThunk());
  }, [dispatch]);
  const visitPortfolio = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  const handleOnSubmitButtonClick = useCallback(() => {
    if (step === 'swapConfirmation') {
      executeSwap();
    }
    if (step === 'swapCompleted') {
      visitPortfolio();
    }
  }, [step, executeSwap, visitPortfolio]);

  const etherscanLink = useAppSelector(selectSwapConfirmationFlowEtherscanLink);
  const buttonState = useAppSelector(selectSwapConfirmationButtonState);
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
            Confirm Swap
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

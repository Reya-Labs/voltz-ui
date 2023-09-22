import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Button, CloseButton, Typography, TypographyToken } from 'brokoli-ui';
import React, { useEffect, useState } from 'react';

import {
  selectChainChangeState,
  selectChainId,
  setChainIdThunk,
} from '../../../../../../../../app/features/network';
import { PositionUI } from '../../../../../../../../app/features/portfolio/types';
import { initializeSettleFlowAction } from '../../../../../../../../app/features/settle-flow';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import { PositionTransactionHistory } from '../../../../../../../components/PositionTransactionHistory';
import { SettleFlow } from '../../../../../../../components/SettleFlow';
import { useAppNavigate } from '../../../../../../../hooks/useAppNavigate';
import { usePositionDetails } from '../../../../../../../hooks/usePositionDetails';
import { useResponsiveQuery } from '../../../../../../../hooks/useResponsiveQuery';
import { useWallet } from '../../../../../../../hooks/useWallet';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import { ButtonsBox, ContentBox, TitleBox } from './PositionTransactionHistoryDialogContent.styled';

type PositionTransactionHistoryDialogContentProps = {
  id: PositionUI['id'];
  onClose: () => void;
  chainId: SupportedChainId;
  routeAmmId: PositionUI['routeAmmId'];
  routePoolId: PositionUI['routePoolId'];
  status: PositionUI['status'];
  type: PositionUI['type'];
  token: PositionUI['token'];
  isBorrowing: PositionUI['isBorrowing'];
  market?: PositionUI['market'];
  routePositionId: PositionUI['routePositionId'];
};

type SwitchNetworkParams =
  | 'settleFlow'
  | 'lpForm'
  | 'swapForm'
  | 'lpRolloverForm'
  | 'swapRolloverForm';
export const PositionTransactionHistoryDialogContent: React.FunctionComponent<
  PositionTransactionHistoryDialogContentProps
> = ({
  token,
  isBorrowing,
  type,
  status,
  id,
  chainId: poolChainId,
  routePoolId,
  routeAmmId,
  onClose,
  market,
  routePositionId,
}) => {
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const dispatch = useAppDispatch();
  const [waitingOnNetworkChange, setWaitingOnNetworkChange] = useState<null | SwitchNetworkParams>(
    null,
  );
  const chainId = useAppSelector(selectChainId);
  const chainStateChangeError = useAppSelector(selectChainChangeState) === 'error';
  const promptForNetworkChange = chainId !== null ? chainId !== poolChainId : false;
  const navigate = useAppNavigate();
  const { positionDetails } = usePositionDetails({ positionId: id });
  const { account } = useWallet();
  const canEdit = positionDetails?.canEdit;
  const canRollover = positionDetails?.canRollover;
  const canSettle = positionDetails?.canSettle;
  const variant = status.variant;
  const textsTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const navigateToLPFormPage = () => {
    navigate.toLPFormPage({
      ammId: routeAmmId,
      poolId: routePoolId,
      fixedLower: status.fixLow,
      fixedUpper: status.fixHigh,
    });
  };

  const navigateToSwapFormPage = () => {
    navigate.toSwapFormPage({
      ammId: routeAmmId,
      poolId: routePoolId,
    });
  };

  const navigateToLPRolloverForm = () => {
    navigate.toRolloverLPFormPage({
      ammId: routeAmmId,
      poolId: routePoolId,
      positionId: routePositionId,
    });
  };
  const navigateToSwapRolloverForm = () => {
    navigate.toRolloverSwapFormPage({
      ammId: routeAmmId,
      poolId: routePoolId,
      positionId: routePositionId,
    });
  };

  const handleOnEdit = () => {
    if (!canEdit) {
      return;
    }
    if (!promptForNetworkChange) {
      if (type === 'LP') {
        navigateToLPFormPage();
      } else {
        navigateToSwapFormPage();
      }
    } else {
      switchNetwork(type === 'LP' ? 'lpForm' : 'swapForm');
    }
  };

  const handleOnRollover = () => {
    if (!canRollover) {
      return;
    }
    if (!promptForNetworkChange) {
      if (type === 'LP') {
        navigateToLPRolloverForm();
      } else {
        navigateToSwapRolloverForm();
      }
    } else {
      switchNetwork(type === 'LP' ? 'lpRolloverForm' : 'swapRolloverForm');
    }
  };

  const switchNetwork = (form: SwitchNetworkParams) => {
    setWaitingOnNetworkChange(form);
    void dispatch(
      setChainIdThunk({
        chainId: poolChainId,
        isSupportedChain: true,
        triggerApprovalFlow: true,
        reloadPage: form !== 'settleFlow',
      }),
    );
  };

  useEffect(() => {
    if (chainStateChangeError) {
      setWaitingOnNetworkChange(null);
    }
  }, [chainStateChangeError]);
  useEffect(() => {
    if (waitingOnNetworkChange === null) {
      return;
    }
    if (!chainId) {
      return;
    }
    if (chainId === poolChainId) {
      const afterNetworkChangeCallbackMap: Record<SwitchNetworkParams, () => void> = {
        lpForm: navigateToLPFormPage,
        lpRolloverForm: navigateToLPRolloverForm,
        settleFlow: initializeSettle,
        swapForm: navigateToSwapFormPage,
        swapRolloverForm: navigateToSwapRolloverForm,
      };
      afterNetworkChangeCallbackMap[waitingOnNetworkChange] &&
        afterNetworkChangeCallbackMap[waitingOnNetworkChange]();
    }
  }, [poolChainId, waitingOnNetworkChange, chainId]);

  const initializeSettle = () => {
    dispatch(
      initializeSettleFlowAction({
        account,
        position: positionDetails,
      }),
    );
  };

  const handleOnSettle = () => {
    if (!canSettle) {
      return;
    }
    if (!promptForNetworkChange) {
      initializeSettle();
    } else {
      switchNetwork('settleFlow');
    }
  };

  return (
    <React.Fragment>
      {canSettle ? <SettleFlow /> : null}
      <ContentBox>
        <TitleBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
            {variant === 'active'
              ? 'Position History'
              : variant === 'matured'
              ? 'Matured Position'
              : 'Settled Position'}
          </Typography>
          <CloseButton onClick={onClose} />
        </TitleBox>
        <MarketTokenInformation
          isBorrowing={isBorrowing}
          market={market}
          token={token}
          type={type}
          typographyToken={textsTypographyToken}
        />
        <PositionTransactionHistory positionId={id} />
        {canEdit || canRollover || canSettle ? (
          <ButtonsBox>
            {canEdit ? (
              <Button variant="primary" onClick={handleOnEdit}>
                Edit
              </Button>
            ) : null}
            {canSettle ? (
              <Button
                variant={canSettle && canRollover ? 'secondary' : 'primary'}
                onClick={handleOnSettle}
              >
                Settle
              </Button>
            ) : null}
            {canRollover ? (
              <Button variant="primary" onClick={handleOnRollover}>
                Rollover
              </Button>
            ) : null}
          </ButtonsBox>
        ) : null}
      </ContentBox>
    </React.Fragment>
  );
};

import { submitAllBatchesForFee } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useReducer, useState } from 'react';

import { selectNetwork } from '../../../../../app/features/network';
import {
  OptimiserInfo,
  updateOptimiserState,
} from '../../../../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { Modal } from '../../../../../components/composite/Modal/Modal';
import { useWallet } from '../../../../../hooks/useWallet';
import { doNothing } from '../../../../../utilities/doNothing';
import { formatCurrency } from '../../../../../utilities/number';
import { GasCost } from '../GasCost/GasCost';
import { batchBudgetReducer, initialState } from './batchBudgetReducer';
import {
  ActionBox,
  ActionLeftContentBox,
  ActionRightContentBox,
  BatchBudgetContentBox,
  BatchBudgetTextBox,
  BatchBudgetTextTypography,
  BatchBudgetUnderlyingTypography,
  BatchBudgetUSDCurrencyTypography,
  BatchBudgetValueBox,
  BatchButton,
  ContentBox,
  DescriptionTypography,
} from './BatchBudgetTrigger.styled';
import { ConfirmBatchBudgetModalContent } from './ConfirmBatchBudgetModalContent/ConfirmBatchBudgetModalContent';

type Props = {
  lpVault: OptimiserInfo;
  onOpen?: () => void;
  onClose?: () => void;
};

export const BatchBudgetTrigger: React.FunctionComponent<Props> = ({
  lpVault,
  onOpen = doNothing,
  onClose = doNothing,
}) => {
  const { signer } = useWallet();
  const appDispatch = useAppDispatch();
  const network = useAppSelector(selectNetwork);

  const [gasCost, setGasCost] = useState(-1);
  const [isConfirmBatchBudgetOpen, setIsConfirmBatchBudgetOpen] = useState(false);
  const handleConfirmBatchClose = () => {
    setIsConfirmBatchBudgetOpen(false);
    onClose();
  };
  const handleConfirmBatchOpen = () => {
    setIsConfirmBatchBudgetOpen(true);
    onOpen();
  };
  const [state, dispatch] = useReducer(batchBudgetReducer, initialState);
  const handleOnProceed = () => {
    if (!signer) {
      return;
    }

    dispatch({
      type: 'batch_pending',
    });

    submitAllBatchesForFee({
      optimiserId: lpVault.optimiserId,
      signer,
    })
      .then(({ newOptimiserState }) => {
        void dispatch({
          type: 'batch_success',
        });
        if (newOptimiserState) {
          void appDispatch(
            updateOptimiserState({
              optimiserId: lpVault.optimiserId,
              newOptimiserState,
              network,
            }),
          );
        }
      })
      .catch((err) => {
        const message = typeof err === 'string' ? err : (err as Error)?.message;
        dispatch({
          type: 'batch_failed',
          errorMessage: message || 'Ooops something went wrong!',
        });
      });
  };

  useEffect(() => {
    if (!signer) {
      return;
    }

    submitAllBatchesForFee({
      onlyGasEstimate: true,
      optimiserId: lpVault.optimiserId,
      signer,
    })
      .then(({ gasEstimateUsd }) => {
        setGasCost(gasEstimateUsd);
      })
      .catch(() => {
        setGasCost(-1);
      });
  }, [lpVault, signer]);

  return (
    <>
      <Modal open={isConfirmBatchBudgetOpen} onClose={handleConfirmBatchClose}>
        <ConfirmBatchBudgetModalContent
          batchBudgetUnderlying={lpVault.accumulatedFees}
          batchBudgetUSD={lpVault.accumulatedFeesUSD}
          disabled={state.disabled}
          error={state.error}
          gasCost={gasCost}
          hintText={state.hintText}
          loading={state.loading}
          submitText={state.submitText}
          success={state.success}
          token={lpVault.tokenName}
          onCancel={handleConfirmBatchClose}
          onProceed={handleOnProceed}
        />
      </Modal>
      <ContentBox>
        <DescriptionTypography>
          Trigger the batch of deposits, and claim the batch budget at any time! Careful with the
          batch gas cost.
        </DescriptionTypography>
        <GasCost gasCost={gasCost} />
        <ActionBox>
          <ActionLeftContentBox>
            <BatchBudgetContentBox>
              <BatchBudgetTextTypography>BATCH BUDGET:&nbsp;</BatchBudgetTextTypography>
              <BatchBudgetTextBox>
                <BatchBudgetValueBox>
                  <BatchBudgetUnderlyingTypography data-testid="BatchBudgetTrigger-BatchBudgetUnderlyingTypography">
                    {formatCurrency(lpVault.accumulatedFees)}&nbsp;
                    {lpVault.tokenName.toUpperCase()}
                  </BatchBudgetUnderlyingTypography>
                  <BatchBudgetTextTypography data-testid="BatchBudgetTrigger-BatchBudgetTextTypography">
                    <BatchBudgetUSDCurrencyTypography>$</BatchBudgetUSDCurrencyTypography>
                    {formatCurrency(lpVault.accumulatedFeesUSD)} USD
                  </BatchBudgetTextTypography>
                </BatchBudgetValueBox>
              </BatchBudgetTextBox>
            </BatchBudgetContentBox>
          </ActionLeftContentBox>
          <ActionRightContentBox>
            <BatchButton
              data-testid="BatchBudgetTrigger-BatchButton"
              onClick={handleConfirmBatchOpen}
            >
              BATCH
            </BatchButton>
          </ActionRightContentBox>
        </ActionBox>
      </ContentBox>
    </>
  );
};

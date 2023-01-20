import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useReducer, useState } from 'react';

import { IconLabel } from '../../../../../components/composite/IconLabel/IconLabel';
import { Modal } from '../../../../../components/composite/Modal/Modal';
import { doNothing } from '../../../../../utilities/doNothing';
import { formatCurrency } from '../../../../../utilities/number';
import { batchBudgetReducer, initialState } from './batchBudgetReducer';
import {
  ActionBox,
  ActionLeftContentBox,
  ActionRightContentBox,
  BatchBudgetContentBox,
  BatchBudgetCurrencyTypography,
  BatchBudgetTextTypography,
  BatchBudgetValueTypography,
  BatchButton,
  ContentBox,
  DescriptionTypography,
  GasCostBox,
  GasCostInputLabel,
  GasCostTokenTypography,
  GasCostTypography,
  GasIcon,
} from './BatchBudgetTrigger.styled';
import { ConfirmBatchBudgetModalContent } from './ConfirmBatchBudgetModalContent/ConfirmBatchBudgetModalContent';

type Props = {
  lpVault: MellowProduct;
  onOpen?: () => void;
  onClose?: () => void;
};

export const BatchBudgetTrigger: React.FunctionComponent<Props> = ({
  lpVault,
  onOpen = doNothing,
  onClose = doNothing,
}) => {
  const [gasCost, setGasCost] = useState(-1);
  const [batchBudgetUSD, setBatchBudgetUSD] = useState(-1);
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
    dispatch({
      type: 'batch_pending',
    });
    lpVault
      .submitAllBatchesForFee()
      .then(() => {
        dispatch({
          type: 'batch_success',
        });
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
    lpVault
      .getSubmitBatchGasCost()
      .then((result) => {
        setGasCost(result.toNumber());
      })
      .catch(() => {
        setGasCost(-1);
      });
    lpVault
      .getBatchBudgetUsd()
      .then((result) => {
        setBatchBudgetUSD(result);
      })
      .catch(() => {
        setBatchBudgetUSD(-1);
      });
  }, [lpVault]);
  //
  return (
    <>
      <Modal open={isConfirmBatchBudgetOpen} onClose={handleConfirmBatchClose}>
        <ConfirmBatchBudgetModalContent
          batchBudgetUSD={batchBudgetUSD}
          disabled={state.disabled}
          error={state.error}
          gasCost={gasCost}
          hintText={state.hintText}
          loading={state.loading}
          submitText={state.submitText}
          success={state.success}
          onCancel={handleConfirmBatchClose}
          onProceed={handleOnProceed}
        />
      </Modal>
      <ContentBox>
        <DescriptionTypography>
          Trigger the batch of deposits, and claim the batch budget at any time! Careful with the
          batch gas cost.
        </DescriptionTypography>
        <ActionBox>
          <ActionLeftContentBox>
            <BatchBudgetContentBox>
              <BatchBudgetTextTypography>
                BATCH BUDGET:&nbsp;
                <BatchBudgetCurrencyTypography>
                  {batchBudgetUSD === -1 ? (
                    <BatchBudgetValueTypography>---</BatchBudgetValueTypography>
                  ) : (
                    <>
                      $
                      <BatchBudgetValueTypography>
                        {formatCurrency(batchBudgetUSD)} USD
                      </BatchBudgetValueTypography>
                    </>
                  )}
                </BatchBudgetCurrencyTypography>
              </BatchBudgetTextTypography>
            </BatchBudgetContentBox>
            <GasCostBox>
              <GasIcon />
              <GasCostTokenTypography>
                {gasCost === -1 ? (
                  <GasCostTypography>---</GasCostTypography>
                ) : (
                  <>
                    $<GasCostTypography>{formatCurrency(gasCost)}</GasCostTypography>
                  </>
                )}
              </GasCostTokenTypography>
              <GasCostInputLabel shrink>
                <IconLabel
                  icon="information-circle"
                  info="This gas calculation is only an estimation, and the final gas cost will be defined when the transaction is executed. You can change configurations on gas prices in your wallet provider."
                  label=""
                />
              </GasCostInputLabel>
            </GasCostBox>
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

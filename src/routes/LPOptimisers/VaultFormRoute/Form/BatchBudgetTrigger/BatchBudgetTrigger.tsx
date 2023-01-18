import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React, { useReducer, useState } from 'react';

import { IconLabel } from '../../../../../components/composite/IconLabel/IconLabel';
import { Modal } from '../../../../../components/composite/Modal/Modal';
import { doNothing } from '../../../../../utilities/doNothing';
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
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    promise
      .then(() => {
        dispatch({
          type: 'batch_success',
        });
      })
      .catch(() => {
        dispatch({
          type: 'batch_failed',
          errorMessage: 'TODO: SDK',
        });
      });
  };
  return (
    <>
      <Modal open={isConfirmBatchBudgetOpen} onClose={handleConfirmBatchClose}>
        <ConfirmBatchBudgetModalContent
          disabled={state.disabled}
          error={state.error}
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
                  $<BatchBudgetValueTypography>TODO: 234,00 USD</BatchBudgetValueTypography>
                </BatchBudgetCurrencyTypography>
              </BatchBudgetTextTypography>
            </BatchBudgetContentBox>
            <GasCostBox>
              <GasIcon />
              <GasCostTypography>TODO: GET COST FROM SDK</GasCostTypography>
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

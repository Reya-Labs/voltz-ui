import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react';

import { doNothing } from '../../../utilities/doNothing';
import { isEnvVarProvided } from '../../../utilities/isEnvVarProvided';
import { IconLabel } from '../../composite/IconLabel/IconLabel';
import { Modal } from '../../composite/Modal/Modal';
import { ActiveRolloverModalContent } from './ActiveRolloverModalContent/ActiveRolloverModalContent';
import {
  AutomaticRolloverToggleBox,
  AutomaticRolloverToggleInputLabel,
  AutomaticRolloverToggleTypography,
  ToggleButton,
} from './AutomaticRolloverToggle.styled';
import { CannotRegisterRolloverModalContent } from './CannotRegisterRolloverModalContent/CannotRegisterRolloverModalContent';

type AutomaticRolloverState = 'active' | 'inactive';

const options: {
  label: string;
  id: AutomaticRolloverState;
}[] = [
  {
    id: 'active',
    label: 'ACTIVE',
  },
  {
    id: 'inactive',
    label: 'INACTIVE',
  },
];

export type AutomaticRolloverToggleProps = {
  automaticRolloverState: AutomaticRolloverState;
  canRegisterUnregister: boolean;
  disabled: boolean;
  showTooltip: boolean;
  gasCost: number;
  triggersOnChainTransaction: boolean;
  isVaultRegisteredForAutoRollover?: boolean;
  onChangePromise: (value: AutomaticRolloverState) => Promise<void>;
};
export const AutomaticRolloverToggle: React.FunctionComponent<AutomaticRolloverToggleProps> = ({
  canRegisterUnregister,
  disabled,
  automaticRolloverState,
  showTooltip,
  onChangePromise = doNothing,
  triggersOnChainTransaction,
  gasCost,
  isVaultRegisteredForAutoRollover,
}) => {
  const [transactionStatus, setTransactionStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle');
  const [transactionStatusText, setTransactionStatusText] = useState('Waiting for confirmation...');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AutomaticRolloverState | undefined>(
    undefined,
  );

  if (!isEnvVarProvided(process.env.REACT_APP_AUTOROLLOVER_LP)) {
    return null;
  }

  const resetModal = () => {
    setTransactionStatus('idle');
    setTransactionStatusText('Waiting for confirmation...');
    setIsOpen(false);
  };
  const handleOnProceed = async () => {
    if (!selectedOption) {
      return;
    }
    try {
      setTransactionStatus('pending');
      setTransactionStatusText('Transaction in progress');
      await onChangePromise(selectedOption);
      setIsOpen(false);
      resetModal();
    } catch (error) {
      setTransactionStatus('error');
      setTransactionStatusText((error as Error)?.message || 'Something went wrong...');
    }
  };
  const handleOnCancel = () => {
    if (transactionStatus === 'pending') {
      return;
    }
    resetModal();
  };
  const handleOpen = (selectedAutoRolloverState: AutomaticRolloverState) => {
    setSelectedOption(selectedAutoRolloverState);
    if (triggersOnChainTransaction) {
      setIsOpen(true);
      return;
    }
    const nextAutoRolloverState = selectedAutoRolloverState === 'active';
    const shouldAskForUserConfirmOnChange =
      nextAutoRolloverState !== isVaultRegisteredForAutoRollover;
    setIsOpen(shouldAskForUserConfirmOnChange);
    if (!shouldAskForUserConfirmOnChange) {
      void onChangePromise(selectedAutoRolloverState);
    }
  };
  return (
    <AutomaticRolloverToggleBox>
      {showTooltip ? (
        <AutomaticRolloverToggleInputLabel shrink>
          <IconLabel
            icon="information-circle"
            info="Automatically redistributes funds from maturing pools to new pools. This configuration will affect all your deposits in this Optimiser, and will not affect pools that matured before the automatic rollover was activated."
            label="AUTOMATIC ROLLOVER"
          />
        </AutomaticRolloverToggleInputLabel>
      ) : null}
      <Modal open={isOpen} onClose={handleOnCancel}>
        {canRegisterUnregister ? (
          <ActiveRolloverModalContent
            gasCost={gasCost}
            transactionStatus={transactionStatus}
            transactionStatusText={transactionStatusText}
            triggersOnChainTransaction={triggersOnChainTransaction}
            onCancel={handleOnCancel}
            onProceed={handleOnProceed}
          />
        ) : (
          <CannotRegisterRolloverModalContent onProceed={handleOnCancel} />
        )}
      </Modal>
      <ToggleButtonGroup
        aria-label="text alignment"
        value={automaticRolloverState}
        exclusive
        onChange={(_, autoRolloverState) => {
          if (!autoRolloverState) {
            return;
          }
          handleOpen(autoRolloverState as AutomaticRolloverState);
        }}
      >
        {options.map((option) => (
          <ToggleButton key={option.id} disabled={disabled} value={option.id}>
            <AutomaticRolloverToggleTypography>{option.label}</AutomaticRolloverToggleTypography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </AutomaticRolloverToggleBox>
  );
};

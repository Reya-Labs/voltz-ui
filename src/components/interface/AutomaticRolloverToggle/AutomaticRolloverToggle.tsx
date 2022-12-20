import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react';

import { doNothing } from '../../../utilities/doNothing';
import { IconLabel } from '../../composite/IconLabel/IconLabel';
import { Modal } from '../../composite/Modal/Modal';
import { ActiveRolloverModalContent } from './ActiveRolloverModalContent/ActiveRolloverModalContent';
import {
  AutomaticRolloverToggleBox,
  AutomaticRolloverToggleInputLabel,
  AutomaticRolloverToggleTypography,
  ToggleButton,
} from './AutomaticRolloverToggle.styled';

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
  disabled: boolean;
  showTooltip: boolean;
  onChangePromise: (value: AutomaticRolloverState) => Promise<void>;
};
export const AutomaticRolloverToggle: React.FunctionComponent<AutomaticRolloverToggleProps> = ({
  disabled,
  automaticRolloverState,
  showTooltip,
  onChangePromise = doNothing,
}) => {
  const [transactionStatus, setTransactionStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle');
  const [transactionStatusText, setTransactionStatusText] = useState('Waiting for confirmation...');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AutomaticRolloverState | undefined>(
    undefined,
  );
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
    resetModal();
  };
  const handleOpen = (selectedAutoRolloverState: AutomaticRolloverState) => {
    setSelectedOption(selectedAutoRolloverState);
    setIsOpen(true);
  };
  return (
    <AutomaticRolloverToggleBox>
      {showTooltip ? (
        <AutomaticRolloverToggleInputLabel shrink>
          <IconLabel
            icon="information-circle"
            info="TODO: Missing copy"
            label="AUTOMATIC ROLLOVER"
          />
        </AutomaticRolloverToggleInputLabel>
      ) : null}
      <Modal open={isOpen} onClose={handleOnCancel}>
        <ActiveRolloverModalContent
          transactionStatus={transactionStatus}
          transactionStatusText={transactionStatusText}
          onCancel={handleOnCancel}
          onProceed={handleOnProceed}
        />
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

import { Dialog, PillSelector, TypographyWithTooltip } from 'brokoli-ui';
import React, { useState } from 'react';

import { doNothing } from '../../../utilities/doNothing';
import { ActiveRolloverModalContent } from './ActiveRolloverModalContent';
import { AutomaticRolloverToggleBox } from './AutomaticRolloverToggle.styled';
import { CannotRegisterRolloverModalContent } from './CannotRegisterRolloverModalContent';

type AutomaticRolloverState = 'active' | 'inactive';

const options: {
  label: string;
  id: AutomaticRolloverState;
}[] = [
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'inactive',
    label: 'Inactive',
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
        <TypographyWithTooltip
          colorToken="white400"
          tooltip="Automatically redistributes funds from maturing pools to new pools. This configuration will affect all your deposits in this Optimiser, and will not affect pools that matured before the automatic rollover was activated."
          typographyToken="primaryBodySmallRegular"
        >
          Automatic Rollover
        </TypographyWithTooltip>
      ) : null}
      <Dialog open={isOpen}>
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
      </Dialog>
      <PillSelector
        activePillId={automaticRolloverState as string}
        disabled={disabled}
        pillOptions={options}
        variant="compact"
        onPillClick={(autoRolloverState) => handleOpen(autoRolloverState as AutomaticRolloverState)}
      />
    </AutomaticRolloverToggleBox>
  );
};

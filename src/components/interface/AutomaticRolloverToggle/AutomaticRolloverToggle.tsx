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
  onChange: (value: AutomaticRolloverState) => void;
  disabled: boolean;
  transactionStatus: string;
  showTooltip: boolean;
};
export const AutomaticRolloverToggle: React.FunctionComponent<AutomaticRolloverToggleProps> = ({
  disabled,
  automaticRolloverState,
  onChange = doNothing,
  transactionStatus,
  showTooltip,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AutomaticRolloverState | undefined>(
    undefined,
  );
  const handleOnProceed = () => {
    if (selectedOption) {
      onChange(selectedOption);
    }
    setIsOpen(false);
  };
  const handleOnCancel = () => {
    setIsOpen(false);
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

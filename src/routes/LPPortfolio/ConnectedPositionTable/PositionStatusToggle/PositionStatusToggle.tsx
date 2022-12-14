import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

import { doNothing } from '../../../../utilities/doNothing';
import {
  PositionStatusToggleBox,
  PositionStatusToggleTypography,
  ToggleButton,
} from './PositionStatusToggle.styled';

export type PositionStatus = 'open' | 'settled';

const options: {
  label: string;
  id: PositionStatus;
}[] = [
  {
    id: 'open',
    label: 'OPEN POSITIONS',
  },
  {
    id: 'settled',
    label: 'SETTLED POSITIONS',
  },
];

export type Props = {
  status: PositionStatus;
  onChange: (distribution: PositionStatus) => void;
};
export const PositionStatusToggle: React.FunctionComponent<Props> = ({
  status,
  onChange = doNothing,
}) => {
  return (
    <PositionStatusToggleBox>
      <ToggleButtonGroup
        aria-label="text alignment"
        value={status}
        exclusive
        onChange={(_, distributionId) => {
          if (!distributionId) {
            return;
          }
          onChange(distributionId as PositionStatus);
        }}
      >
        {options.map((option) => (
          <ToggleButton key={option.id} value={option.id}>
            <PositionStatusToggleTypography>{option.label}</PositionStatusToggleTypography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </PositionStatusToggleBox>
  );
};

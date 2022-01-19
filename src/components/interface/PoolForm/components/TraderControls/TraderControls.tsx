import React from 'react';
import Box from '@mui/material/Box';

export type TraderControlsProps = {
  mode: 'liquidity-provider' | 'fixed-trader' | 'variable-trader';
  onChangeMode: (mode: string) => void;
  defaultPartialCollateralization?: boolean;
  partialCollateralization?: boolean;
  onChangePartialCollateralization: (value: boolean) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  mode,
  onChangeMode,
  defaultPartialCollateralization,
  partialCollateralization,
  onChangePartialCollateralization,
}) => {
  return null;
};

export default TraderControls;

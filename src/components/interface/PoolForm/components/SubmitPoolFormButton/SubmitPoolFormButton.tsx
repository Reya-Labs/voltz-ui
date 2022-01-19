import React from 'react';
import Box from '@mui/material/Box';

export type SubmitPoolFormButtonProps = {
  mode: 'liquidity-provider' | 'fixed-trader' | 'variable-trader';
  onSubmit: () => void;
};

const SubmitPoolFormButton: React.FunctionComponent<SubmitPoolFormButtonProps> = ({
  mode,
  onSubmit,
}) => {
  return null;
};

export default SubmitPoolFormButton;

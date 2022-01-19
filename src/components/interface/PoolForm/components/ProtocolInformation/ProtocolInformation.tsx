import React from 'react';
import Box from '@mui/material/Box';

export type ProtocolInformationProps = {
  mode: 'liquidity-provider' | 'fixed-trader' | 'variable-trader';
  protocol?: string;
  fixedApr?: number;
  variableApr?: number;
};

const ProtocolInformation: React.FunctionComponent<ProtocolInformationProps> = ({
  mode,
  protocol,
  fixedApr,
  variableApr,
}) => {
  return null;
};

export default ProtocolInformation;

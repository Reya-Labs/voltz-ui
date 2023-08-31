import { AttentionIndicator, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionStatusBox } from './PositionStatus.styled';

type InRangeProps = {
  typographyToken: TypographyToken;
};
export const OutOfRange: React.FunctionComponent<InRangeProps> = ({ typographyToken }) => {
  return (
    <PositionStatusBox>
      <AttentionIndicator colorToken="wildStrawberry" />
      &nbsp;&nbsp;
      <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
        Out of range
      </Typography>
    </PositionStatusBox>
  );
};

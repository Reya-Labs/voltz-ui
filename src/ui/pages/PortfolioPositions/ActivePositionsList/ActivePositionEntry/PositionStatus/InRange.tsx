import { AttentionIndicator, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionStatusBox } from './PositionStatus.styled';

type InRangeProps = {
  typographyToken: TypographyToken;
};
export const InRange: React.FunctionComponent<InRangeProps> = ({ typographyToken }) => {
  return (
    <PositionStatusBox>
      <AttentionIndicator colorToken="skyBlueCrayola" />
      &nbsp;&nbsp;
      <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
        In range
      </Typography>
    </PositionStatusBox>
  );
};

import { AttentionIndicator, TokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../app/features/portfolio/types';
import { PositionStatusBox } from './PositionStatus.styled';

export type PositionStatusProps = {
  typographyToken: TypographyToken;
  status: PositionUI['status'];
};
export const PositionStatus: React.FunctionComponent<PositionStatusProps> = ({
  typographyToken,
  status,
}) => {
  if (status.variant === 'none') {
    return (
      <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
        --
      </Typography>
    );
  }
  if (status.variant === 'in-range') {
    return (
      <PositionStatusBox>
        <AttentionIndicator colorToken="skyBlueCrayola" />
        &nbsp;&nbsp;
        <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
          In range
        </Typography>
      </PositionStatusBox>
    );
  }
  const isReceiving = status.variant === 'receiving';
  return (
    <PositionStatusBox>
      <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
        {isReceiving ? 'Receiving' : 'Paying'}
      </Typography>
      &nbsp;&nbsp;
      <TokenTypography
        colorToken={isReceiving ? 'skyBlueCrayola' : 'wildStrawberry'}
        token="%"
        typographyToken={typographyToken}
        value={status.value}
      />
    </PositionStatusBox>
  );
};

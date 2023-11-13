import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../app/features/forms/common';
import {
  DepositButton,
  MellowPositionBox,
  MellowPositionBoxAndButtonContainer,
  MellowPositionInfoBox,
} from './MellowPosition.styled';

export type MellowPositionProps = {
  userDeposit?: number;
  tokenName: string;
  handleClick: () => void;
  disabled: boolean;
};

export const MellowPosition: React.FunctionComponent<MellowPositionProps> = ({
  userDeposit,
  tokenName,
  handleClick,
  disabled,
}: MellowPositionProps) => {
  return (
    <MellowPositionBoxAndButtonContainer>
      <MellowPositionBox>
        <MellowPositionInfoBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            {`Your position: ${userDeposit === undefined ? ' ---' : ''}`}&nbsp;
          </Typography>
          <TokenTypography
            colorToken="primary"
            token={` ${tokenName}`}
            typographyToken="primaryBodySmallRegular"
            value={userDeposit === undefined ? '---' : formFormatNumber(userDeposit)}
          />
        </MellowPositionInfoBox>
      </MellowPositionBox>
      <DepositButton disabled={disabled} variant="primary" onClick={handleClick}>
        Deposit
      </DepositButton>
    </MellowPositionBoxAndButtonContainer>
  );
};

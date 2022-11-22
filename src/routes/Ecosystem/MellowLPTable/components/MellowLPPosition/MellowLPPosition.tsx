import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';
import React from 'react';
import {
  DepositButton,
  DepositTypography,
  MellowLPPositionBox,
  MellowLPPositionBoxAndButtonContainer,
  MellowLPPositionInfoBox,
  MellowLPPositionSkeleton,
  PositionTypography,
} from './MellowLPPosition.styled';

export type MellowLPPositionProps = {
  userDeposit?: number;
  tokenName: string;
  handleClick: () => void;
  dataLoading: boolean;
  disabled: boolean;
};

const MellowLPPosition: React.FunctionComponent<MellowLPPositionProps> = ({
  userDeposit,
  tokenName,
  handleClick,
  dataLoading,
  disabled,
}: MellowLPPositionProps) => {
  if (dataLoading) {
    return (
      <MellowLPPositionBox>
        <MellowLPPositionSkeleton variant="text" />
      </MellowLPPositionBox>
    );
  }

  return (
    <MellowLPPositionBoxAndButtonContainer>
      <MellowLPPositionBox>
        <MellowLPPositionInfoBox>
          <PositionTypography variant="h6">
            {`Your position: ${isUndefined(userDeposit) ? ' ---' : ''}`}
          </PositionTypography>
          {!isUndefined(userDeposit) && (
            <DepositTypography variant="h6">
              {isUndefined(userDeposit) ? '---' : `${formatCurrency(userDeposit)} ${tokenName}`}
            </DepositTypography>
          )}
        </MellowLPPositionInfoBox>
      </MellowLPPositionBox>
      <DepositButton
        title={disabled ? 'TODO: COSTIN FIX COPY' : undefined}
        onClick={handleClick}
        disabled={disabled}
      >
        DEPOSIT
      </DepositButton>
    </MellowLPPositionBoxAndButtonContainer>
  );
};

export default MellowLPPosition;

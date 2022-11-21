import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';
import React from 'react';
import {
  DepositButton,
  DepositTypography,
  MellowLPPositionBox,
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
      <DepositButton onClick={handleClick} disabled={disabled || dataLoading}>
        DEPOSIT
      </DepositButton>
    </MellowLPPositionBox>
  );
};

export default MellowLPPosition;

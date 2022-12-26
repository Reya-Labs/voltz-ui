import isUndefined from 'lodash.isundefined';
import React from 'react';

import { formatCurrency } from '../../../../../../utilities/number';
import {
  DepositButton,
  DepositTypography,
  MellowPositionBox,
  MellowPositionBoxAndButtonContainer,
  MellowPositionInfoBox,
  MellowPositionSkeleton,
  PositionTypography,
} from './MellowPosition.styled';

export type MellowPositionProps = {
  userDeposit?: number;
  tokenName: string;
  handleClick: () => void;
  dataLoading: boolean;
  disabled: boolean;
};

export const MellowPosition: React.FunctionComponent<MellowPositionProps> = ({
  userDeposit,
  tokenName,
  handleClick,
  dataLoading,
  disabled,
}: MellowPositionProps) => {
  if (dataLoading) {
    return (
      <MellowPositionBox>
        <MellowPositionSkeleton variant="text" />
      </MellowPositionBox>
    );
  }

  return (
    <MellowPositionBoxAndButtonContainer>
      <MellowPositionBox>
        <MellowPositionInfoBox>
          <PositionTypography variant="h6">
            {`Your position: ${isUndefined(userDeposit) ? ' ---' : ''}`}
          </PositionTypography>
          {!isUndefined(userDeposit) && (
            <DepositTypography variant="h6">
              {isUndefined(userDeposit) ? '---' : `${formatCurrency(userDeposit)} ${tokenName}`}
            </DepositTypography>
          )}
        </MellowPositionInfoBox>
      </MellowPositionBox>
      <DepositButton disabled={disabled} onClick={handleClick}>
        DEPOSIT
      </DepositButton>
    </MellowPositionBoxAndButtonContainer>
  );
};

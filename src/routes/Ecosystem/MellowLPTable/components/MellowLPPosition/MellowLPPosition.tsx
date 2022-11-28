import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { formatCurrency } from '../../../../../utilities/number';
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
      <DepositButton disabled={disabled} onClick={handleClick}>
        DEPOSIT
      </DepositButton>
    </MellowLPPositionBoxAndButtonContainer>
  );
};

export default MellowLPPosition;

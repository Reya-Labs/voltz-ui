import isUndefined from 'lodash.isundefined';
import React from 'react';

import { useWallet } from '../../../../../../../../../hooks/useWallet';
import { colors } from '../../../../../../../../../theme';
import { formatCurrency, formatNumber } from '../../../../../../../../../utilities/number';
import {
  EditButton,
  MarginBox,
  MarginLabelBox,
  MarginLabelTypography,
  MarginValueTypography,
} from './Margin.styled';

export type CurrentMarginProps = {
  margin?: number;
  accruedCashflow?: number;
  token: string;
  onSelect: () => void;
  isSettled: boolean;
  hideEdit: boolean;
};

export const Margin: React.FunctionComponent<CurrentMarginProps> = ({
  margin,
  accruedCashflow,
  token,
  onSelect,
  isSettled,
  hideEdit,
}) => {
  const wallet = useWallet();

  const handleClick = () => {
    if (onSelect) {
      if (!wallet.account) {
        wallet.setRequired(true);
      } else {
        onSelect();
      }
    }
  };

  const getNetMarginLabel = () => {
    if (isUndefined(accruedCashflow) || isSettled) {
      return 'Margin';
    }

    const formattedAccFlow = formatCurrency(accruedCashflow, false, true);

    return (
      <>
        Margin
        <span
          style={{
            color:
              accruedCashflow > 0
                ? colors.skyBlueCrayola.base
                : accruedCashflow < 0
                ? colors.wildStrawberry.base
                : undefined,
          }}
        >
          {' '}
          {formattedAccFlow} {token}
        </span>
      </>
    );
  };
  return (
    <MarginBox>
      <MarginLabelBox>
        <MarginLabelTypography>{getNetMarginLabel()}</MarginLabelTypography>
        {hideEdit ? null : <EditButton onClick={handleClick}>Edit</EditButton>}
      </MarginLabelBox>
      <MarginValueTypography>
        {!isUndefined(margin) ? `${formatNumber(margin)} ${token}` : 'Loading...'}
      </MarginValueTypography>
    </MarginBox>
  );
};

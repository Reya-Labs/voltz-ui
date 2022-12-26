import isUndefined from 'lodash.isundefined';
import React from 'react';

import { formatNumber } from '../../../../../../../../../utilities/number';
import {
  EditButton,
  NotionalBox,
  NotionalLabelBox,
  NotionalLabelTypography,
  NotionalValueTypography,
} from './Notional.styled';

export type NotionalProps = {
  notional?: number;
  onEdit: () => void;
  token: string;
  hideEdit: boolean;
};

export const Notional: React.FunctionComponent<NotionalProps> = ({
  hideEdit,
  notional,
  onEdit,
  token,
}) => {
  return (
    <NotionalBox>
      <NotionalLabelBox>
        <NotionalLabelTypography>NOTIONAL</NotionalLabelTypography>
        {hideEdit ? null : <EditButton onClick={onEdit}>Edit</EditButton>}
      </NotionalLabelBox>
      <NotionalValueTypography>
        {isUndefined(notional) ? 'Loading...' : `${formatNumber(notional)} ${token}`}
      </NotionalValueTypography>
    </NotionalBox>
  );
};

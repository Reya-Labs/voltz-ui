import isUndefined from 'lodash.isundefined';
import React from 'react';

import {
  EditButton,
  NotionalBox,
  NotionalLabelBox,
  NotionalLabelTypography,
  NotionalValueTypography,
} from './Notional.styled';

export type NotionalProps = {
  notional?: string;
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
        {isUndefined(notional) ? 'Loading...' : `${notional} ${token}`}
      </NotionalValueTypography>
    </NotionalBox>
  );
};

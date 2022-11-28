import React from 'react';
import { Button } from '../../../../../../atomic/Button/Button';
import isUndefined from 'lodash/isUndefined';
import { Typography } from '../../../../../../atomic/Typography/Typography';

export type NotionalProps = {
  notional?: string;
  onEdit?: () => void;
  token: string;
};

export const Notional: React.FunctionComponent<NotionalProps> = ({ notional, onEdit, token }) => {
  return (
    <>
      <Typography variant="body2" label="Notional" sx={{ fontSize: 18 }}>
        {isUndefined(notional) ? 'Loading...' : `${notional} ${token}`}
      </Typography>

      {onEdit && (
        <Button
          sx={{ width: '100%', display: 'flex' }}
          size="small"
          variant="red2"
          onClick={onEdit}
        >
          Edit
        </Button>
      )}
    </>
  );
};

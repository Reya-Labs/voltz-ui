import React from 'react';
import { Button, Typography } from '@components/atomic';
import { isUndefined } from 'lodash';
import { SystemStyleObject, Theme } from '@mui/system';

export type NotionalProps = {
  notional?: string;
  token: string;
};

const Notional: React.FunctionComponent<NotionalProps> = ({ notional, token }) => {
  return (
    <>
      <Typography variant="body2" label="Notional" sx={{ fontSize: 18 }}>
        {isUndefined(notional) ? 'No data' : `${notional} ${token}`}
      </Typography>
    </>
  );
};
    
export default Notional;
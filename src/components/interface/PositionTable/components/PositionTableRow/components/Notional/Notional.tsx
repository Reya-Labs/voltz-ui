import React from 'react';
import { Button, Typography } from '@components/atomic';
import { isUndefined } from 'lodash';
import { SystemStyleObject, Theme } from '@mui/system';

export type NotionalProps = {
  notional?: string;
  onEdit?: () => void;
  token: string;
};

const buttonStyles: SystemStyleObject<Theme> = { 
  display: "flex",
  paddingTop: (theme) => theme.spacing(0),
  paddingBottom: (theme) => theme.spacing(0),
  paddingLeft: (theme) => theme.spacing(0),
  paddingRight: (theme) => theme.spacing(0),
  borderStyle: "solid",
  borderColor: "#5C0026",
  borderRadius: 1,
  flex: "none",
  width: "100%",
  background: "transparent",
  color: "#FF4AA9",

  '&:hover': {
    borderColor: '#FF4AA9',
    background: "transparent",
  }
};

const Notional: React.FunctionComponent<NotionalProps> = ({ notional, onEdit, token }) => {
  return (
    <>
      <Typography variant="body2" label="Notional" sx={{ fontSize: 18 }}>
        {isUndefined(notional) ? 'No data' : `${notional} ${token}`}
      </Typography>

      {onEdit && (
        <Button sx={buttonStyles} onClick={onEdit}> 
          Edit
        </Button>
      )}
    </>
  );
};
    
export default Notional;
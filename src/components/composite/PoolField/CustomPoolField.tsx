import { ReactNode } from "react";
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from "@mui/system";

export type CustomPoolFieldProps = {
    children?: ReactNode;
    label: ReactNode;
}

const valueBoxLabelStyles: SystemStyleObject<Theme> = { 
    fontSize: '12px', 
    lineHeight: '1.4',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };

const CustomPoolField = ({children, label}: CustomPoolFieldProps) => (
    <Box>
        <Typography variant="body2" sx={valueBoxLabelStyles}>
            {label}
        </Typography>
        {children}
    </Box>
);

export default CustomPoolField;
import { Box, Typography } from "@mui/material";
import { SystemStyleObject, Theme } from "@mui/system";
import { formatCurrency } from "@utilities";
import { Button } from "src/components/atomic";
import { Agents } from '@contexts';

export type MellowLPPositionProps = {
    position?: number;
    handleClick: () => void;
}

const MellowLPPosition: React.FunctionComponent<MellowLPPositionProps> = ({position, handleClick}: MellowLPPositionProps) => {

    const copyStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
        color: '#9B97AD', 
        textTransform: 'uppercase',
    }

    const renderContent = () => {
        return (
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant='h6' sx={copyStyles}>
                    Your position {(position) ? ': $' + formatCurrency(position, true) : '---'}
                </Typography>

                <Button onClick={handleClick} sx={{
                    background: 'transparent',
                    // color: 'primary.light',
                    '&:hover': {
                        background: 'transparent',
                        borderStyle: 'none none solid none',
                        borderColor: 'primary.light',
                        borderRadius: '0px'
                    },
                    padding: '4px 1px',
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxShadow: 'none',
                    borderStyle: 'none none none none',
                    borderRadius: '0px'
                    }}>
          DEPOSIT
        </Button>
            </Box>
        )
    }

    return renderContent();
}

export default MellowLPPosition;
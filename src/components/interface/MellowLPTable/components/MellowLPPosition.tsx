import { Box, Button, Typography } from "@mui/material";
import { SystemStyleObject, Theme } from "@mui/system";
import { AugmentedMellowLpVault, formatCurrency } from "@utilities";
import { isUndefined } from "lodash";

export type MellowLPPositionProps = {
    lpVault: AugmentedMellowLpVault;
    handleClick: () => void;
    disabled: boolean;
}

const MellowLPPosition: React.FunctionComponent<MellowLPPositionProps> = ({ lpVault, handleClick, disabled }: MellowLPPositionProps) => {

    const getPositionInfo = () => {
        if (isUndefined(lpVault.userDeposit)) {
            return (
                <Typography variant='h6' sx={{ fontSize: '14px', color: '#9B97AD', textTransform: 'uppercase' }}>
                    Your position ---
                </Typography>
            )
        }

        return (
            <Box sx={{ display: "flex" }}>
                <Typography variant='h6' sx={{ fontSize: '14px', color: '#9B97AD', textTransform: 'uppercase' }}>
                    Your position:
                </Typography>
                <Typography variant='h6' sx={{ fontSize: '14px', color: 'primary.light', textTransform: 'uppercase', marginLeft: '4px' }}>
                    {formatCurrency(lpVault.userDeposit)} {lpVault.tokenName}
                </Typography>
            </Box>
        );
    }

    const renderContent = () => {
        return (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {getPositionInfo()}

                <Button onClick={handleClick} disabled={disabled} sx={{
                    background: 'transparent',
                    color: 'primary.light',
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
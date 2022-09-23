import { Box, Typography } from "@mui/material";
import { AugmentedMellowLpVault, formatCurrency } from "@utilities";
import { isUndefined } from "lodash";
import { ProgressBar } from "src/components/composite";


export type LPMellowVaultInfoProps = {
    lpVault: AugmentedMellowLpVault
}
const LPMellowVaultInfo: React.FunctionComponent<LPMellowVaultInfoProps> = ({lpVault} : LPMellowVaultInfoProps) => {
    

    const getCapBar = () => {
        if (isUndefined(lpVault.vaultCap) || isUndefined(lpVault.vaultAccumulative)) {
            return null;
        }

        const percentage = (lpVault.vaultCap > 0) ? Math.floor(lpVault.vaultAccumulative * 100 / lpVault.vaultCap + 0.5) : 100;

        return (<Box>
            <Typography variant='h6' sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }}>
                DEPOSITS
            </Typography>
            <ProgressBar
                isMaturity={true}
                leftContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {lpVault.tokenName}
                    </Typography>)
                }
                middleContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {formatCurrency(lpVault.vaultAccumulative, true)}
                    </Typography>)
                }
                rightContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {percentage.toString() + "%"}
                    </Typography>)
                }
                percentageComplete={percentage}
            />
        </Box>);
    }

    return getCapBar();
}

export default LPMellowVaultInfo;
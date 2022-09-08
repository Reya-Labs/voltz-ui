import { Box, Typography } from "@mui/material";
import { SystemStyleObject, Theme } from "@mui/system";
import { formatCurrency } from "@utilities";
import { ProgressBar } from "src/components/composite";


export type LPMellowVaultInfoProps = {
    token: string,
    accumulative: number,
    cap: number,
}
const LPMellowVaultInfo: React.FunctionComponent<LPMellowVaultInfoProps> = ({token, accumulative, cap} : LPMellowVaultInfoProps) => {
    
    const percentage = Math.floor(accumulative * 100 / cap + 0.5);

    const copyStyles: SystemStyleObject<Theme> = {
        fontSize: '12px',
        color: '#9B97AD',
        marginLeft: '0px',
    }

    const renderContent = () => {

        return (<Box>
            <Typography variant='h6' sx={copyStyles}>
                DEPOSITS
            </Typography>
            <ProgressBar
                isMaturity={true}
                leftContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {token}
                    </Typography>)
                }
                middleContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {'$'}{formatCurrency(accumulative, true)}
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

    return renderContent();
}

export default LPMellowVaultInfo;
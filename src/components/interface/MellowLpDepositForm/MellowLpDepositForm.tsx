import { Box } from "@mui/system";
import LPMellowVaultDepositInfo from "./components/LPMellowVaultDepositInfo";
import LPMellowVaultDepositWindow from "./components/LPMellowVaultDepositWindow";
import MellowLpDepositFormHeader from "./components/MellowLpDepositFormHeader";

export type MellowLpDepositFormProps = {};

const MellowLpDepositForm: React.FunctionComponent<MellowLpDepositFormProps> = ({}) => {

    return (
        <>
            <MellowLpDepositFormHeader />
            <Box sx={{display: "flex"}}>
                <LPMellowVaultDepositInfo vaultExpectedApy={"13%"} token={"USDC"} accumulative={43000} cap={80000} currentDeposit={26990} expectedCashflow={299} vaultMaturity={"31 Dec 22"}/>
                <LPMellowVaultDepositWindow />
            </Box>
        </>
        
    )
}

export default MellowLpDepositForm;
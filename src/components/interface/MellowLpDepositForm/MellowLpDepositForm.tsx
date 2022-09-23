import { Box } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import LPMellowVaultDepositInfo from "./components/LPMellowVaultDepositInfo";
import LPMellowVaultDepositWindow from "./components/LPMellowVaultDepositWindow";
import MellowLpDepositFormHeader from "./components/MellowLpDepositFormHeader";

export type MellowLpDepositFormProps = {
    lpVault: AugmentedMellowLpVault;
    onChangeDeposit: (value: number | undefined) => void;
    onSubmit: () => void;
    onCancel: () => void;
    disabled: boolean;
};

const MellowLpDepositForm: React.FunctionComponent<MellowLpDepositFormProps> = ({lpVault, onChangeDeposit, onSubmit, disabled, onCancel}: MellowLpDepositFormProps) => {

    return (
        <>
            <MellowLpDepositFormHeader />
            <Box sx={{display: "flex"}}>
                <LPMellowVaultDepositInfo lpVault={lpVault}/>
                <LPMellowVaultDepositWindow lpVault={lpVault} onChangeDeposit={onChangeDeposit} onSubmit={onSubmit} onCancel={onCancel} disabled={disabled}/>
            </Box>
        </>
        
    )
}

export default MellowLpDepositForm;
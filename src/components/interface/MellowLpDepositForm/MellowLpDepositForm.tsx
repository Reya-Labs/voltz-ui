import { Box } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import LPMellowVaultDepositInfo from "./components/LPMellowVaultDepositInfo";
import LPMellowVaultDepositWindow from "./components/LPMellowVaultDepositWindow";
import MellowLpDepositFormHeader from "./components/MellowLpDepositFormHeader";

export type MellowLpDepositFormProps = {
    lpVault: AugmentedMellowLpVault;
    onChangeDeposit: (value: number | undefined) => void;
    submitText: string;
    hintText: {
        text: string,
        suffixText?: string,
        textColor?: string,
    };
    onSubmit: () => void;
    disabled: boolean;
    onCancel: () => void;
};

const MellowLpDepositForm: React.FunctionComponent<MellowLpDepositFormProps> = ({lpVault, onChangeDeposit, submitText, hintText, disabled, onSubmit, onCancel}: MellowLpDepositFormProps) => {

    return (
        <>
            <MellowLpDepositFormHeader onCancel={onCancel}/>
            <Box sx={{display: "flex"}}>
                <LPMellowVaultDepositInfo lpVault={lpVault}/>
                <LPMellowVaultDepositWindow lpVault={lpVault} onChangeDeposit={onChangeDeposit} submitText={submitText} hintText={hintText} disabled={disabled} onSubmit={onSubmit}/>
            </Box>
        </>
        
    )
}

export default MellowLpDepositForm;
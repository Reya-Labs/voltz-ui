import { Box } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import { ReactNode } from "react";
import LPMellowVaultDepositInfo from "./components/LPMellowVaultDepositInfo";
import LPMellowVaultDepositWindow from "./components/LPMellowVaultDepositWindow";
import MellowLpDepositFormHeader from "./components/MellowLpDepositFormHeader";

export type MellowLpDepositFormProps = {
    lpVault: AugmentedMellowLpVault;
    onChangeDeposit: (value: number | undefined) => void;
    submitText: string;
    hintText: ReactNode;
    onSubmit: () => void;
    disabled: boolean;
    onCancel: () => void;
};

const MellowLpDepositForm: React.FunctionComponent<MellowLpDepositFormProps> = ({lpVault, onChangeDeposit, submitText, hintText, disabled, onSubmit, onCancel}: MellowLpDepositFormProps) => {

    return (
        <>
            <MellowLpDepositFormHeader />
            <Box sx={{display: "flex"}}>
                <LPMellowVaultDepositInfo lpVault={lpVault}/>
                <LPMellowVaultDepositWindow lpVault={lpVault} onChangeDeposit={onChangeDeposit} submitText={submitText} hintText={hintText} disabled={disabled} onSubmit={onSubmit} onCancel={onCancel}/>
            </Box>
        </>
        
    )
}

export default MellowLpDepositForm;
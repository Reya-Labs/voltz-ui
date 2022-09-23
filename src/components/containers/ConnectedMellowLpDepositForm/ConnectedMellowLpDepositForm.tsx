import { AugmentedMellowLpVault } from "@utilities";
import { routes } from '@routes';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormPanel } from "src/components/interface";
import MellowLpDepositForm from "src/components/interface/MellowLpDepositForm/MellowLpDepositForm";
import { Panel } from "src/components/atomic";
import { useState } from "react";


export type ConnectedMellowLpDepositFormProps = {
    vault: AugmentedMellowLpVault;
    onReset: () => void;
}

const ConnectedMellowLpDepositForm: React.FunctionComponent<ConnectedMellowLpDepositFormProps> = ({ vault, onReset }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedDeposit, setSelectedDeposit] = useState<number>(0);

    // const [tokensApproved, setTokensApproved] = useState<boolean>(false);
    // const [approvalPending, setApprovalPending] = useState<boolean>(false);
    // const [approvalError, setApprovalError] = useState<string>();

    // const [depositDone, setDepositDone] = useState<boolean>(false);

    const handleComplete = () => {
        console.log("COMPLETE");
        onReset();
        navigate(`/${routes.ECOSYSTEM}`);
    };

    const handleGoBack = () => {
        console.log("BACK");
    }

    const handleSubmit = () => {
        console.log("selected deposit:", selectedDeposit);
        console.log("SUBMIT");

        // vault.getTokenApproval().then(
        //     (allowance) => {
        //         console.log("allowance:", allowance);

        //         if (allowance < selectedDeposit) {
        //             vault.approveToken(selectedDeposit - allowance)
        //             .then((_) => {
        //                 console.log("approve done!");

        //                 vault.deposit(selectedDeposit)
        //                 .then((_) => {
        //                     console.log("deposit done!");
        //                 })
        //                 .catch((error) => {
        //                     console.log("ERROR:", error);
        //                 })
        //             })
        //             .catch((error) => {console.log("ERROR:", error)});
        //         }
        //         else {
        //             vault.deposit(selectedDeposit)
        //                 .then((_) => {
        //                     console.log("deposit done!");
        //                 })
        //                 .catch((error) => {
        //                     console.log("ERROR:", error);
        //                 })
        //         }
        //     }
        // );
    }

    const onChangeDeposit = (value: number | undefined): void => {
        setSelectedDeposit(value ?? 0);
    }

    if (!vault) {
        return null;
    }

    return (
        <>
        <Panel variant='dark' sx={{ padding: 0, width: '100%', maxWidth: '748px', margin: '0 auto', background: 'transparent' }}>
            <MellowLpDepositForm lpVault={vault} onChangeDeposit={onChangeDeposit} onSubmit={handleSubmit} onCancel={handleGoBack} disabled={false}/>
        </Panel>
        </>
    )
}

export default ConnectedMellowLpDepositForm;
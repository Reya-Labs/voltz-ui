import { AugmentedMellowLpVault } from "@utilities";
import { routes } from '@routes';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MellowLpDepositForm from "src/components/interface/MellowLpDepositForm/MellowLpDepositForm";
import { Panel } from "src/components/atomic";
import React, { useState, useEffect, ReactNode } from "react";
import { colors } from '@theme';
import { Box } from "@mui/system";


export type ConnectedMellowLpDepositFormProps = {
    vault: AugmentedMellowLpVault;
    onReset: () => void;
}

export enum DepositStates {
    INITIALISING = "INITIALISING",
    PROVIDER_ERROR = "PROVIDER_ERROR",
    APPROVE_REQUIRED = "APPROVE_REQUIRED",
    APPROVING = "APPROVING",
    APPROVE_FAILED = "APPROVE_FAILED",
    APPROVED = "APPROVED",
    DEPOSITING = "DEPOSITING",
    DEPOSIT_FAILED = "DEPOSIT_FAILED",
    DEPOSIT_DONE = "DEPOSIT_DONE",
};

type TextProps = {
    bold?: boolean;
    children?: ReactNode;
    green?: boolean;
    red?: boolean;
};
const Text = ({ bold, children, green, red }: TextProps) => (
    <Box component='span' sx={{
        color: green ? colors.vzCustomGreen1 : red ? colors.vzCustomRed1 : undefined,
        fontWeight: bold ? 'bold' : undefined,
        textTransform: 'none'
    }}>
        {children}
    </Box>
);

const ConnectedMellowLpDepositForm: React.FunctionComponent<ConnectedMellowLpDepositFormProps> = ({ vault, onReset }) => {
    const navigate = useNavigate();

    const [selectedDeposit, setSelectedDeposit] = useState<number>(0);

    const [depositState, setDepositState] = useState<DepositStates>(DepositStates.INITIALISING);
    const [error, setError] = useState<ReactNode>();

    const sufficientFunds = (vault.userWalletBalance ?? 0) >= selectedDeposit;

    const deposit = () => {
        if (selectedDeposit > 0) {
            setDepositState(DepositStates.DEPOSITING);
            void vault.deposit(selectedDeposit).then(() => {
                setDepositState(DepositStates.DEPOSIT_DONE);
            }, (err: Error) => {
                setError((<Text red>{`Deposit failed. ${err.message ?? ""}`}</Text>));
                setDepositState(DepositStates.DEPOSIT_FAILED);
            })
        }
        else {
            setError("Please input amount");
            setDepositState(DepositStates.DEPOSIT_FAILED);
        }
    };

    const approve = () => {
        setDepositState(DepositStates.APPROVING);
        vault.approveToken().then(() => {
            setDepositState(DepositStates.APPROVED);
        }, (err: Error) => {
            setError((<Text red>{`Approval failed. ${err.message ?? ""}`}</Text>));
            setDepositState(DepositStates.APPROVE_FAILED);
        })
    };

    useEffect(() => {
        vault.isTokenApproved().then((resp) => {
            if (resp) {
                setDepositState(DepositStates.APPROVED);
            }
            else {
                setDepositState(DepositStates.APPROVE_REQUIRED);
            }
        }, (err: Error) => {
            setError((<Text red> {`Error occured while retrieving information. ${err.message ?? ""}`}</Text>));
            setDepositState(DepositStates.PROVIDER_ERROR);
        });
    }, [vault, selectedDeposit]);

    let submissionState: {
        submitText: string,
        hintText: ReactNode,
        action: () => void,
        disabled: boolean,
    } = {
        submitText: "Initialising...",
        action: () => { },
        disabled: true,
        hintText: "Initialising, please wait",
    }

    switch (depositState) {
        case DepositStates.INITIALISING: {
            submissionState = {
                submitText: "Initialising...",
                action: () => { },
                hintText: "Initialising, please wait",
                disabled: true,
            }
            break;
        }
        case DepositStates.PROVIDER_ERROR: {
            submissionState = {
                submitText: "Provider Error",
                action: () => { },
                hintText: error,
                disabled: true,
            }
            break;
        }
        case DepositStates.APPROVE_FAILED: {
            submissionState = {
                submitText: "Approve",
                action: approve,
                hintText: error,
                disabled: false,
            }
            break;
        }
        case DepositStates.DEPOSIT_FAILED: {
            submissionState = {
                submitText: "Deposit",
                action: deposit,
                hintText: error,
                disabled: false,
            }
            break;
        }
        case DepositStates.APPROVE_REQUIRED: {
            submissionState = {
                submitText: "Approve",
                action: approve,
                hintText: `Please approve ${vault.tokenName}`,
                disabled: false,
            }
            break;
        }
        case DepositStates.APPROVING: {
            submissionState = {
                submitText: "Approving",
                action: () => { },
                hintText: "Waiting for confirmation",
                disabled: true,
            }
            break;
        }
        case DepositStates.APPROVED: {
            submissionState = {
                submitText: "Deposit",
                action: deposit,
                hintText: (selectedDeposit > 0) ? (<><Text green>Tokens approved</Text>. Let's deposit!</>) : "Please input amount",
                disabled: false,
            }
            break;
        }
        case DepositStates.DEPOSITING: {
            submissionState = {
                submitText: "Depositing",
                action: () => { },
                hintText: "Waiting for confirmation",
                disabled: true,
            }
            break;
        }
        case DepositStates.DEPOSIT_DONE: {
            submissionState = {
                submitText: "Deposit",
                action: deposit,
                hintText: (<Text green>Deposited</Text>),
                disabled: false,
            }
            break;
        }
    }

    const handleGoBack = () => {
        onReset();
        navigate(`/${routes.ECOSYSTEM}`);
    }

    const onChangeDeposit = (value: number | undefined): void => {
        setSelectedDeposit(value ?? 0);
    }

    return (
        <>
            <Panel variant='dark' sx={{ padding: 0, width: '100%', maxWidth: '748px', margin: '0 auto', background: 'transparent' }}>
                <MellowLpDepositForm
                    lpVault={vault}
                    onChangeDeposit={onChangeDeposit}
                    submitText={submissionState.submitText}
                    hintText={
                        sufficientFunds
                            ? submissionState.hintText
                            : <Text red>Insufficient funds.</Text>
                    }
                    disabled={!sufficientFunds || submissionState.disabled}
                    onSubmit={submissionState.action}
                    onCancel={handleGoBack}
                />
            </Panel>
        </>
    )
}

export default ConnectedMellowLpDepositForm;
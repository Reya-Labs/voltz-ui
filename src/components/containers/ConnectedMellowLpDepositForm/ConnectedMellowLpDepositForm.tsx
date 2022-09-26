import { AugmentedMellowLpVault } from "@utilities";
import { routes } from '@routes';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MellowLpDepositForm from "src/components/interface/MellowLpDepositForm/MellowLpDepositForm";
import { Panel } from "src/components/atomic";
import { useState, useEffect, ReactNode } from "react";
import { colors } from '@theme';
import { Box } from "@mui/system";


export type ConnectedMellowLpDepositFormProps = {
    vault: AugmentedMellowLpVault;
    onReset: () => void;
}

export enum DepositStates {
    INITIALISING = "INITIALISING",
    INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedDeposit, setSelectedDeposit] = useState<number>(0);

    const [depositState, setDepositState] = useState<DepositStates>(DepositStates.INITIALISING);
    const [error, setError] = useState<string>();

    const sufficientFunds = (vault.userWalletBalance ?? 0) >= selectedDeposit;

    useEffect(() => {
        setError(undefined);
        setDepositState(DepositStates.INITIALISING);

        console.log("Effect triggered", sufficientFunds);
        if (sufficientFunds) {
            vault.getTokenApproval().then((allowance: number) => {
                if (allowance >= selectedDeposit) {
                    setDepositState(DepositStates.APPROVED);
                }
                else {
                    setDepositState(DepositStates.APPROVE_REQUIRED);
                }
            }, (err: Error) => {
                setError(err.message);
                setDepositState(DepositStates.PROVIDER_ERROR);
            });
        }
        else {
            setDepositState(DepositStates.INSUFFICIENT_FUNDS);
        }
    }, [vault, sufficientFunds, selectedDeposit]);

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
                hintText: (<Text red> Error occured while retrieving information.</Text>),
                disabled: true,
            }
            break;
        }
        case DepositStates.INSUFFICIENT_FUNDS: {
            submissionState = {
                submitText: "Insufficient Funds",
                action: () => { },
                hintText: "Please fix form errors to continue",
                disabled: true,
            }
            break;
        }
        case DepositStates.APPROVE_FAILED: {
            submissionState = {
                submitText: "Approve failed",
                action: () => { },
                hintText: (<Text red>{error}</Text>),
                disabled: true,
            }
            break;
        }
        case DepositStates.DEPOSIT_FAILED: {
            submissionState = {
                submitText: "Deposit failed",
                action: () => { },
                hintText: (<Text red>{error}</Text>),
                disabled: true,
            }
            break;
        }
        case DepositStates.APPROVE_REQUIRED: {
            submissionState = {
                submitText: "Approve",
                action: () => {
                    setDepositState(DepositStates.APPROVING);
                    vault.approveToken(selectedDeposit).then(() => {
                        setDepositState(DepositStates.APPROVED);
                    }, (err: Error) => {
                        setError(err.message);
                        setDepositState(DepositStates.APPROVE_FAILED);
                    })
                },
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
                action: () => {
                    setDepositState(DepositStates.DEPOSITING);
                    void vault.deposit(selectedDeposit).then(() => {
                        setDepositState(DepositStates.DEPOSIT_DONE);
                    }, (err: Error) => {
                        setError(err.message);
                        setDepositState(DepositStates.DEPOSIT_FAILED);
                    })
                },
                hintText: (<><Text green>Tokens approved</Text>. Let's trade!</>),
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
                submitText: "Deposited",
                action: () => { },
                hintText: (<Text green>Deposited</Text>),
                disabled: true,
            }
            break;
        }
    }

    console.log("submission state:", submissionState, depositState);

    const handleComplete = () => {
        console.log("COMPLETE");
        onReset();
        navigate(`/${routes.ECOSYSTEM}`);
    };

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
                <MellowLpDepositForm lpVault={vault} onChangeDeposit={onChangeDeposit} submitText={submissionState.submitText} hintText={submissionState.hintText} disabled={submissionState.disabled} onSubmit={submissionState.action} onCancel={handleGoBack} />
            </Panel>
        </>
    )
}

export default ConnectedMellowLpDepositForm;
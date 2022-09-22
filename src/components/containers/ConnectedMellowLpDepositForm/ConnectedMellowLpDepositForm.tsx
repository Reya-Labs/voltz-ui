import { AugmentedMellowLpVault } from "@utilities";
import { routes } from '@routes';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormPanel } from "src/components/interface";
import MellowLpDepositForm from "src/components/interface/MellowLpDepositForm/MellowLpDepositForm";
import { Panel } from "src/components/atomic";


export type ConnectedMellowLpDepositFormProps = {
    vault: AugmentedMellowLpVault;
    onReset: () => void;
}

const ConnectedMellowLpDepositForm: React.FunctionComponent<ConnectedMellowLpDepositFormProps> = ({ vault, onReset }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getReduxAction = () => {
    }

    const handleComplete = () => {
        onReset();
        navigate(`/${routes.ECOSYSTEM}`);
    };

    const handleGoBack = () => {
    }

    const handleSubmit = () => {
        
    }

    if (!vault) {
        return null;
    }

    return (
        <>
        <Panel variant='dark' sx={{ padding: 0, width: '100%', maxWidth: '748px', margin: '0 auto', background: 'transparent' }}>
            <MellowLpDepositForm />
        </Panel>
        </>
    )
}

export default ConnectedMellowLpDepositForm;
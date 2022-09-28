import { Agents } from "@contexts";
import { useMellowLPVaults, useWallet } from "@hooks";
import { Box } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import { isNull } from "lodash";
import { useEffect, useState } from "react";
import { Panel } from "src/components/atomic";
import MellowLPTable from "src/components/interface/MellowLPTable/MellowLPTable";
import EcosystemHeader from "../../../components/interface/EcosystemHeader/EcosystemHeader";

export type ConnectedMellowLPTableProps = {
    onSelectItem: (item: AugmentedMellowLpVault) => void;
    agent: Agents;
};

const ConnectedMellowLPTable: React.FunctionComponent<ConnectedMellowLPTableProps> = ({onSelectItem}) => {

    const { lpVaults } = useMellowLPVaults();

    const { signer } = useWallet();
    const isSignerAvailable = !isNull(signer);

    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [vaultsLoaded, setVaultsLoaded] = useState<boolean>(false);
    const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

    const initVaults = () => {
        if (lpVaults) {
            setVaultsLoaded(false);
            setDataLoading(true);
            const request = Promise.allSettled(lpVaults.map(item => item.vaultInit()));

            void request.then((_) => {
                setVaultsLoaded(true);
                setDataLoading(false);
            }, (_) => {
                setDataLoading(false);
            });
        }
    }

    const initUserData = () => {
        if (lpVaults && vaultsLoaded && !isNull(signer)) {
            setUserDataLoaded(false);
            setDataLoading(true);

            const request = Promise.allSettled(lpVaults.map(item => item.userInit(signer)));

            void request.then((_) => {
                setUserDataLoaded(true);
                setDataLoading(false);
            }, (_) => {
                setDataLoading(false);
            });
        }
    }

    useEffect(() => {
        initVaults();
    }, []);

    useEffect(() => {
        initUserData();
    }, [isSignerAvailable, vaultsLoaded]);

    const renderContent = () => {
        return (
            <>
            <Panel variant='dark' sx={{ padding: 0, width: '100%', maxWidth: '988px', margin: '0 auto', background: 'transparent' }}>
                <EcosystemHeader
                    lpOptimizerTag = {`LP OPTIMISER`}
                    lpOptimizerCount = {lpVaults ? lpVaults.length : 0}
                    alphaVaultTag = {`ALPHA VAULT`}
                    alphaVaultCount = {0}
                />
                {lpVaults && (
                <Box sx={{ marginTop: "32px"}}>
                    <MellowLPTable lpVaults={lpVaults} onSelectItem={onSelectItem} disabled={dataLoading}/>
                </Box>)}
            </Panel>
            </>
        )
    }

    return renderContent();
}

export default ConnectedMellowLPTable;
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

    // TODO: need to get this via hook when implementation is done
    const { lpVaults } = useMellowLPVaults();

    const { signer } = useWallet();
    const isSignerAvailable = !isNull(signer);

    const [vaultsLoaded, setVaultsLoaded] = useState<boolean>(false);
    const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

    const initVaults = () => {
        if (lpVaults) {
            setVaultsLoaded(false);
            const request = Promise.allSettled(lpVaults.map(item => item.vaultInit()));

            request.then((_) => {
                console.log("Vault info loaded.");
                setVaultsLoaded(true);
            });
        }
    }

    const initUserData = () => {
        if (lpVaults && vaultsLoaded && !isNull(signer)) {
            setUserDataLoaded(false);
            const request = Promise.allSettled(lpVaults.map(item => item.userInit(signer)));

            request.then((_) => {
                console.log("User data loaded.");
                setUserDataLoaded(true);
            })
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
                    <MellowLPTable lpVaults={lpVaults} onSelectItem={onSelectItem}/>
                </Box>)}
            </Panel>
            </>
        )
    }

    return renderContent();
}

export default ConnectedMellowLPTable;
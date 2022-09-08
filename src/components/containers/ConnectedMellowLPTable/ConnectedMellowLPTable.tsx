import { Agents } from "@contexts";
import { useMellowLPVaults } from "@hooks";
import { Box } from "@mui/system";
import { Panel } from "src/components/atomic";
import MellowLPTable from "src/components/interface/MellowLPTable/MellowLPTable";
import EcosystemHeader from "../../../components/interface/EcosystemHeader/EcosystemHeader";

export type ConnectedMellowLPTableProps = {
    agent: Agents;
};

const ConnectedMellowLPTable: React.FunctionComponent<ConnectedMellowLPTableProps> = () => {

    // TODO: need to get this via hook when implementation is done
    const {lpVaults, loading, error} = useMellowLPVaults();

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
                {(lpVaults && 
                <Box sx={{ marginTop: "32px"}}>
                    <MellowLPTable lpVaults = {lpVaults}/>
                </Box>)}
            </Panel>
            </>
        )
    }

    return (
        renderContent()
    );
}

export default ConnectedMellowLPTable;
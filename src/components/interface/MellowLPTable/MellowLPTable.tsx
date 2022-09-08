import { Box } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import MellowLPEntry from "./components/MellowLPEntry";


export type MellowLPTableProps = {
    lpVaults: AugmentedMellowLpVault[];
}

const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
    lpVaults
}: MellowLPTableProps) => {
    const renderContent = () => {
        return (<Box sx={{display: "flex", justifyContent: "space-between"}}>
            <MellowLPEntry lpVault={lpVaults[0]}/>
            <MellowLPEntry lpVault={lpVaults[0]}/>
            <MellowLPEntry lpVault={lpVaults[0]}/>
        </Box>)
    }

    return renderContent();
}

export default MellowLPTable;
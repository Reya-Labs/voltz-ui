import { Box } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import MellowLPEntry from "./components/MellowLPEntry";


export type MellowLPTableProps = {
    lpVaults: AugmentedMellowLpVault[];
    onSelectItem: (item: AugmentedMellowLpVault) => void;
    disabled: boolean;
}

const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
    lpVaults,
    onSelectItem,
    disabled,
}: MellowLPTableProps) => {
    const renderContent = () => {
        return (<Box sx={{display: "flex", justifyContent: "space-between"}}>
            <MellowLPEntry lpVault={lpVaults[0]} onSelectItem={() => onSelectItem(lpVaults[0])} disabled={disabled}/>
        </Box>)
    }

    return renderContent();
}

export default MellowLPTable;
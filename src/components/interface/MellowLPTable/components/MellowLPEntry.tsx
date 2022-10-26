import { Agents } from "@contexts";
import { Typography } from "@mui/material";
import { Box, SystemStyleObject, Theme } from "@mui/system";
import { AugmentedMellowLpVault } from "@utilities";
import PoolField from "../../../composite/PoolField/PoolField";
import LPMellowVaultInfo from "./LPMellowVaultInfo";
import { ReactComponent as Mellow } from './mellow-icon.svg';
import MellowLPPosition from "./MellowLPPosition";


export type MellowLPEntryProps = {
    onSelectItem: () => void;
    lpVault: AugmentedMellowLpVault;
    disabled: boolean;
}

const MellowLPEntry: React.FunctionComponent<MellowLPEntryProps> = ({ lpVault, onSelectItem, disabled }: MellowLPEntryProps) => {
    const boxStyles: SystemStyleObject<Theme> = {
        display: "flex",
        borderRadius: "4px",
        padding: "4px 8px",
        marginTop: "16px",
        background: "#472043",
        marginLeft: "8px",
        width: "100px",
        justifyContent: "center",
    }

    const tagStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
        color:"#FF4AA9"
    };

    const titleStyles: SystemStyleObject<Theme> = { 
        fontSize: '24px', 
        lineHeight: '1.3', 
        color: '#E5E1F9',
        fontWeight: '700',
        marginLeft: "16px",
    };

    const copyStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
        color: '#9B97AD', 

        marginLeft: "8px",
        marginTop: "16px",
    }
    
    const renderContent = () => {
        return (
            <Box sx={{ maxWidth: "308px", maxHeight: "340px", width: "100%", height: "100%", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}}>
                <Box sx={{...boxStyles}}>
                    <Typography variant='h6'  sx={{...tagStyles}}>
                        LP OPTIMISER
                    </Typography>
                </Box>

                <Box sx={{display:"flex", marginLeft: "8px", marginTop: "16px", alignItems: "center"}}>
                    <Mellow />

                        <Typography variant='h1' sx={titleStyles}>
                            MELLOW VAULT
                        </Typography>
                    
                </Box>
                
                <Box>
                    <Typography variant='h6' sx={copyStyles}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
                    </Typography>
                </Box>

                {(lpVault.protocol !== "-") && (<Box sx={{marginLeft: "8px", marginTop: "16px"}}>
                    <PoolField agent={Agents.LIQUIDITY_PROVIDER} protocol={lpVault.protocol} isBorrowing={false} isBorrowTable={true}/>
                </Box>)}

                <Box sx={{marginLeft: "8px", marginTop: "16px"}}>
                    <LPMellowVaultInfo lpVault={lpVault}/>
                </Box>

                <Box sx={{marginLeft: "8px", marginTop: "16px"}}>
                    <MellowLPPosition lpVault={lpVault} handleClick={onSelectItem} disabled={disabled}/>
                </Box>
            </Box>
        )
    }

    return renderContent();
}

export default MellowLPEntry;
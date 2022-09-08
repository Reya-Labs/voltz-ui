import { SystemStyleObject, Theme, Box } from "@mui/system";
import { Panel, Typography } from "src/components/atomic";

export type EcosystemHeaderProps = {
    lpOptimizerTag: string;
    lpOptimizerCount: number;
    alphaVaultTag: string;
    alphaVaultCount: number;
};

const EcosystemHeader = ({lpOptimizerTag, lpOptimizerCount, alphaVaultTag, alphaVaultCount}: EcosystemHeaderProps) => {
  
    const titleStyles: SystemStyleObject<Theme> = { 
        fontSize: '40px', 
        lineHeight: '1.2', 
        color: '#E5E1F9',
        fontWeight: '700',
    };

    const copyStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
        color: '#9B97AD', 
        marginTop: "8px",
    }
    
    const tagStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
    };

    const boxStyles: SystemStyleObject<Theme> = {
        display: "flex",
        borderRadius: "4px",
        padding: "0px 8px",
    }
      
    const renderContent = () => {
        return (
            <Panel sx={{padding: 0, background: 'transparent'}}>
                <Box>
                    <Typography variant='h1' sx={titleStyles}>
                        VOLTZ ECOSYSTEM
                    </Typography>
                    <Typography variant='body1' sx={copyStyles}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
                    </Typography>
                </Box>
                <Box sx={{marginTop: "16px", display: "flex"}}>
                    <Box sx={{...boxStyles, border: "1px solid #FF4AA9"}}>
                        <Typography variant='h6' sx={{...tagStyles, color:"#FF4AA9"}}>
                            {lpOptimizerTag}{lpOptimizerCount > 0 ? ":" : ""}
                        </Typography>
                        <Typography variant='h6' sx={{...tagStyles, color:"#E5E1F9", paddingLeft:"8px"}}>
                            {lpOptimizerCount ? lpOptimizerCount : "s00n"}
                        </Typography>
                    </Box>

                    <Box sx={{...boxStyles, border: "1px solid #2667FF", marginLeft: "8px"}}>
                        <Typography variant='h6' sx={{...tagStyles, color:"#2667FF"}}>
                            {alphaVaultTag}{alphaVaultCount > 0 ? ":" : ""}
                        </Typography>
                        <Typography variant='h6' sx={{...tagStyles, color:"#E5E1F9", paddingLeft:"8px"}}>
                            {alphaVaultCount ? alphaVaultCount : "s00n"}
                        </Typography>
                    </Box>
                </Box>

            </Panel>
        )
    }

    return renderContent();
};

export default EcosystemHeader;


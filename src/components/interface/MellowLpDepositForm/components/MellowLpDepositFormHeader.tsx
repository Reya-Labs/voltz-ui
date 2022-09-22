import { Panel, Typography } from "src/components/atomic";
import { SystemStyleObject, Theme, Box } from "@mui/system";
import { ReactComponent as Mellow } from '../../MellowLPTable/components/mellow-icon.svg';

export type MellowLpDepositFormHeaderProps = {};

const MellowLpDepositHeaderForm: React.FunctionComponent<MellowLpDepositFormHeaderProps> = ({}) => {

    const titleStyles: SystemStyleObject<Theme> = { 
        fontSize: '40px', 
        lineHeight: '1.2', 
        color: '#E5E1F9',
        fontWeight: '700',
        marginLeft: "16px",
    };

    const copyStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
        color: '#9B97AD', 
        marginTop: "8px",
    }
    
    const tagStyles: SystemStyleObject<Theme> = {
        fontSize: '14px',
        color:"#FF4AA9"
    };

    const boxStyles: SystemStyleObject<Theme> = {
        display: "flex",
        borderRadius: "4px",
        padding: "4px 8px",
        marginTop: "32px",
        background: "#472043",
        marginLeft: "0px",
        width: "100px",
        justifyContent: "center",
    }
      
    const renderContent = () => {
        return (
            <Panel variant='dark' sx={{ width: '100%', maxWidth: '561px', background: 'transparent'}}>
                <Box>
                    <Box sx={{display:"flex", alignItems: "center"}}>
                        <Mellow />
                        <Typography variant='h1' sx={titleStyles}>
                            MELLOW LP OPTIMISER
                        </Typography>
                    </Box>
                    <Typography variant='body1' sx={copyStyles}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
                    </Typography>
                </Box>

                    <Box sx={{...boxStyles}}>
                        <Typography variant='h6'  sx={{...tagStyles}}>
                            LP OPTIMISER
                        </Typography>
                    </Box>

            </Panel>
        )
    }

    return renderContent();
}

export default MellowLpDepositHeaderForm;
import { Panel } from '@components/atomic';
import { Box, Button, Typography } from '@mui/material';
import { borderRadius, SystemStyleObject, Theme } from '@mui/system';
import CircleIcon from '@mui/icons-material/Circle';

export type EcosystemHeaderProps = {
    lpOptimizerTag: string;
    lpOptimizerCount: number;
    alphaVaultTag: string;
    alphaVaultCount: number;
};

const EcosystemHeader = ({lpOptimizerTag, lpOptimizerCount, alphaVaultTag, alphaVaultCount}: EcosystemHeaderProps) => {
    // const titleStyles: SystemStyleObject<Theme> = {
    //     width: 300,
    //     height: 48,

    //     fontFamily: "Pixel Operator Mono",
    //     fontStyle: "normal",
    //     fontWeight: 700,
    //     fontSize: 40,

    //     lineHeight: "100%",

    //     textTransform: "uppercase",
    //     color: "#E5E1F9",

    //     flex: "none",
    //     order: 0,
    //     flexGrow: 0,
    // }

    // const tagStyles: SystemStyleObject<Theme> = {
    //     width: 105,
    //     height: 14,

    //     fontFamily: "Pixel Operator Mono",
    //     fontStyle: "normal",
    //     fontWeight: 400,
    //     fontSize: 14,

    //     // lineHeight: 0.14,

    //     color: "#FF4AA9",

    //     flex: "none",
    //     order: 0,
    //     flexGrow: 0,
    // }

    /* LP OPTIMISER: 1 */


// width: 105px;
// height: 14px;

// font-family: 'Pixel Operator Mono';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 14px;
// /* identical to box height, or 100% */


// /* Wild Strawberry */

// color: #FF4AA9;


// /* Inside auto layout */

// flex: none;
// order: 0;
// flex-grow: 0;

// /* Auto layout */

// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px;
// gap: 16px;

// width: 743px;
// height: 138px;


// /* Inside auto layout */

// flex: none;
// order: 0;
// flex-grow: 0;

    // const boxStyles: SystemStyleObject<Theme> = {
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "flex-start",
    //     padding: 0,
    //     gap: 16,

    //     width: 743,
    //     height: 138
    // }

/* Frame 683 */


// /* Auto layout */

// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px;
// gap: 8px;

// width: 743px;
// height: 100px;


// /* Inside auto layout */

// flex: none;
// order: 0;
// flex-grow: 0;

    // const insideBoxStyles: SystemStyleObject<Theme> = {
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "flex-start",
    //     padding: 0,
    //     gap: 8,

    //     width: 743,
    //     height: 100,
    // }

    // const labelStyles: SystemStyleObject<Theme> = { 
    //     textTransform: "uppercase",
    //     fontWeight: 400, 
    //     fontSize: 14,
    //     color: "#B3AFC6"
    //   };

    const titleStyles: SystemStyleObject<Theme> = { 
        fontSize: '40px', 
        lineHeight: '1.2', 
        marginTop: (theme) => theme.spacing(2),
        color: '#E5E1F9',
        textTransform: 'uppercase',
    };

    const copyStyles: SystemStyleObject<Theme> = {
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: '1.6',
        color: '#9B97AD',
        marginTop: (theme) => theme.spacing(8),
    }

    const tagStyles: SystemStyleObject<Theme> = {
        boxSizing: "border-box",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "4px 8px",
        gap: "10px",
        borderRadius: "4px",
        width: "128px",
        height: "22px",
        flex: "none",
        order: "1",
        flexGrow: "0",
    }

    return (
        <>
        <Panel variant='dark' sx={{ padding: 0, gap: "16px", display: "flex", flexDirection: "column", width: "100%", maxWidth: "743px", margin: '0 auto', background: 'transparent' }}>
        
            <>
            <Panel borderRadius='large' padding='container' sx={{ padding: 0, background: "transparent"}}>
                <Box>
                    <Typography variant='h1' sx={titleStyles}>
                    VOLTZ ECOSYSTEM
                    </Typography>

                    <Typography sx={copyStyles}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
                    </Typography>
                </Box>
            </Panel>
            <Panel borderRadius='large' padding='container' sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "16px", padding: "0", paddingTop: "16px", background: "transparent", width: 265, height: 22}}>
                <Box sx={{...tagStyles, border: "1px solid #FF4AA9",}}>
                        <Typography sx={{fontFamily: "PixelOperatorMono", fontStyle: "normal", fontWeight: 400, fontSize: 14, lineHeight: "14px", color: "#FF4AA9", flex: "none", order: "0", flexGrow: "0"}}>
                        {lpOptimizerTag}{lpOptimizerCount > 0 ? ":" : ""}
                        </Typography>

                        <Typography sx={{fontFamily: "PixelOperatorMono", fontStyle: "normal", fontWeight: 400, fontSize: 14, lineHeight: "14px", color: "#E5E1F9", flex: "none", order: "0", flexGrow: "0"}}>
                        {lpOptimizerCount ? lpOptimizerCount : "s00n"}
                        </Typography>
                </Box>
                <Box sx={{...tagStyles, border: "1px solid #2667FF",}}>
                    <Typography sx={{fontFamily: "PixelOperatorMono", fontStyle: "normal", fontWeight: 400, fontSize: 14, lineHeight: "14px", color: "#2667FF", flex: "none", order: "0", flexGrow: "0"}}>
                    {alphaVaultTag}{alphaVaultCount > 0 ? ":" : ""}
                    </Typography>

                    <Typography sx={{fontFamily: "PixelOperatorMono", fontStyle: "normal", fontWeight: 400, fontSize: 14, lineHeight: "14px", color: "#E5E1F9", flex: "none", order: "0", flexGrow: "0"}}>
                    {alphaVaultCount ? alphaVaultCount : "s00n"}
                    </Typography>
                </Box>
                </Panel>
            </>

        </Panel>
        </>
    )

    // return (
    //     <>
    //         <Panel borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background: "transparent" }}>
    //             <Box>
    //                 <Typography sx={titleStyles}>
    //                     VOLTZ ECOSYSTEM
    //                 </Typography>
    //                 <Typography sx={tagStyles}>
    //                     {lpOptimizerTag}
    //                 </Typography>
    //                 <Typography sx={tagStyles}>
    //                     {alphaVaultTag}
    //                 </Typography>
    //             </Box>
    //         </Panel>

    //     </>
    // )
};

export default EcosystemHeader;


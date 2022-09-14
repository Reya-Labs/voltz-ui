import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { Typography } from '@components/atomic';
import { SystemStyleObject, Theme } from '@theme'; 
import { Panel, Loading } from '@components/atomic';
import { Modal } from '@components/composite';
import { formatCurrency, formatDateTime, formatNumber } from '@utilities';
import { DateTime } from 'luxon';
import { isNull, isUndefined } from 'lodash';
import { ProgressBar } from '@components/composite';
import { Button } from '@components/atomic';

import { ReactComponent as Looser } from './icons/sad3.svg';
import { ReactComponent as Winner } from './icons/winner-badge.svg';
import { useWallet } from '@hooks';
import { Wallet } from '@contexts';
import { useState } from 'react';
import { copyFile } from 'fs';
import useRanking from 'src/hooks/useRanking';

export type RankingClaimProps = {
    wallet: Wallet;
};

const RankingClaim = ({ 
  wallet
}: RankingClaimProps) => {

    const [openClaim, setOpenClaim] = useState<boolean>(false);
    const userAddress = wallet.account;

    const {claimStatic} = useRanking(wallet);
    // const {result: resultClaim, loading: loadingClaim, call: callClaim} = claim;
    const {result, loading, call} = claimStatic;

    const renderClaimButton = () => {
    return (
        <Box sx={{ alignContent: 'left'}}>
        <Button variant={'text'} sx={{fontSize:"16px", color: "#4DE5FF"}} onClick={() => call()}>
            claim your badge
        </Button>
        </Box>)
    }

    const renderClaimModal = () => {
        return (
            <Modal
            open={openClaim}
            onOpen={() => setOpenClaim(true)}
            onClose={() => setOpenClaim(false)}
            trigger={renderClaimButton()}
            >
            <Panel
                variant="dark"
                sx={{
                minWidth: 400,
                maxWidth: 400,
                minHeight: 600,
                display: "flex",
                justifyContent: 'center'
                }}
            >
                {renderClaimContent()}
            </Panel>
            </Modal>
        );
    }

    const renderClaimContent = () => {
        if(!isNull(wallet.account) && result === true ) { // && result === true && !loading
            return (
            <Box sx={{}}>
                <Winner/>
                <Typography variant='subtitle1' sx={{fontSize:"14px", display:"flex", justifyContent:"center", marginBottom:"16px", marginTop: "32px"}}> CONGRATULATIONS!</Typography>
                <Typography variant='h3' sx={{fontSize:"18px", display:"flex", justifyContent:"center", marginBottom:"0px"}}>
                {userAddress ? `${userAddress.substring(0, 8) + "..." + userAddress.substring(36)}` : '---'}
                </Typography>

                <Button variant={'text'} sx={{fontSize:"12px"}}>
                Claim your winner badge
                </Button>
            </Box>)
        } else {
            return (
            <Box sx={{}}>
                <Looser style={{height: "237px", width: "237px", marginLeft:"50px", marginRight:"30px"}}/>
                <Typography variant='subtitle1' sx={{fontSize:"14px", display:"flex", justifyContent:"center", marginBottom:"8px", marginTop: "32px"}}>
                    NOTHING TO CLAIM
                </Typography>
                <Typography variant='h3' sx={{fontSize:"18px", display:"flex", justifyContent:"center", marginBottom:"0px"}}>
                {userAddress ? `${userAddress.substring(0, 8) + "..." + userAddress.substring(36)}` : '---'}
                </Typography>

                <Typography variant='subtitle1' sx={{fontSize:"14px", textAlign:"center", marginLeft:"60px", marginBottom:"16px", marginTop: "32px", maxWidth:"200px"}}>
                     But it's your chance to trade more notional this season!
                </Typography>
                
            </Box>)
        }
    }

    const renderFailed = () => {
        <Box
            sx={{
            paddingTop: (theme) => theme.spacing(6),
            paddingBottom: (theme) => theme.spacing(8),
            }}
        >
            <Box sx={{ height: 30, width: 30 }}>
            <img src="/images/failed.png" alt="Done" height="100%" width="100%" />
            </Box>
        </Box>
    }

    const renderLoading = () => {
    <Box
            sx={{
            paddingTop: (theme) => theme.spacing(6),
            paddingBottom: (theme) => theme.spacing(8),
            }}
        >
            <Loading />
    </Box>
    }

    const renderSuccess = () => {
    <Box
        sx={{
        paddingTop: (theme) => theme.spacing(6),
        paddingBottom: (theme) => theme.spacing(8),
        }}
    >
        <Box sx={{ height: 30, width: 30 }}>
        <img src="/images/done.png" alt="Done" height="100%" width="100%" />
        </Box>
    </Box>
    }

    return renderClaimModal();
};

export default RankingClaim;
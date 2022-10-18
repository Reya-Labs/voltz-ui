import { Box } from '@mui/material';

import { Typography } from '@components/atomic';
import { Panel, Loading } from '@components/atomic';
import { Modal } from '@components/composite';
import { isNull } from 'lodash';
import { Button } from '@components/atomic';

import { ReactComponent as Looser } from './icons/sad3.svg';
import { ReactComponent as Winner } from './icons/winner-badge.svg';
import { Wallet } from '@contexts';
import { useState } from 'react';
import useRanking from 'src/hooks/useRanking';

export type RankingClaimProps = {
  wallet: Wallet;
};

const RankingClaim = ({ wallet }: RankingClaimProps) => {
  const [openClaim, setOpenClaim] = useState<boolean>(false);
  const userAddress = wallet.account;

  const { claimStatic, claim } = useRanking(wallet);
  const { result: resultClaim, loading: loadingClaim, call: callClaim } = claim;
  const { result, loading, call } = claimStatic;

  const renderClaimButton = () => {
    return (
      <Box sx={{ alignContent: 'left' }}>
        <Button variant={'text'} sx={{ fontSize: '16px', color: '#4DE5FF' }} onClick={() => call()}>
          claim your badge
        </Button>
      </Box>
    );
  };

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
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {renderClaimContent()}
        </Panel>
      </Modal>
    );
  };

  const renderClaimContent = () => {
    if (
      !isNull(wallet.account) &&
      wallet.account === '0xb82c7e50401256212fce61bd2019e5c5eb7eb560'
    ) {
      return (
        <Box sx={{}}>
          <Winner />
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px',
              marginTop: '32px',
            }}
          >
            {' '}
            CONGRATULATIONS!
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: '18px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0px',
            }}
          >
            {userAddress
              ? `${userAddress.substring(0, 8) + '...' + userAddress.substring(36)}`
              : '---'}
          </Typography>

          <Button
            variant={'text'}
            sx={{ fontSize: '12px', marginLeft: '30px', marginRight: '30px' }}
            onClick={() => callClaim()}
          >
            Claim your winner badge
          </Button>
          {loadingClaim && <>{renderLoading()}</>}
          {!loadingClaim && resultClaim === true && <>{renderSuccess()}</>}
          {!loadingClaim && resultClaim === false && <>{renderFailed()}</>}
        </Box>
      );
    } else {
      return (
        <Box sx={{}}>
          <Looser
            style={{ height: '237px', width: '237px', marginLeft: '50px', marginRight: '30px' }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
              marginTop: '32px',
            }}
          >
            NOTHING TO CLAIM
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: '18px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0px',
            }}
          >
            {userAddress
              ? `${userAddress.substring(0, 8) + '...' + userAddress.substring(36)}`
              : '---'}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '14px',
              textAlign: 'center',
              marginLeft: '60px',
              marginBottom: '16px',
              marginTop: '32px',
              maxWidth: '200px',
            }}
          >
            But it's your chance to trade more notional this season!
          </Typography>
        </Box>
      );
    }
  };

  const renderFailed = () => {
    return (
      <Box
        sx={{
          paddingTop: (theme) => theme.spacing(6),
          paddingBottom: (theme) => theme.spacing(8),
          paddingLeft: (theme) => theme.spacing(20),
        }}
      >
        <Box sx={{ height: 30, width: 30 }}>
          <img src="/images/failed.png" alt="Done" height="100%" width="100%" />
        </Box>
      </Box>
    );
  };

  const renderLoading = () => {
    return (
      <Box
        sx={{
          paddingTop: (theme) => theme.spacing(6),
          paddingBottom: (theme) => theme.spacing(8),
          paddingLeft: (theme) => theme.spacing(25),
        }}
      >
        <Loading />
      </Box>
    );
  };

  const renderSuccess = () => {
    return (
      <Box
        sx={{
          paddingTop: (theme) => theme.spacing(6),
          paddingBottom: (theme) => theme.spacing(8),
          paddingLeft: (theme) => theme.spacing(25),
        }}
      >
        <Box sx={{ height: 30, width: 30 }}>
          <img src="/images/done.png" alt="Done" height="100%" width="100%" />
        </Box>
      </Box>
    );
  };

  return renderClaimModal();
};

export default RankingClaim;

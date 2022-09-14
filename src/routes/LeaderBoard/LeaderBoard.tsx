import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { setPageTitle } from '@utilities';

import { Modal, Page, Panel } from '@components/interface';
import ConnectedRankingTable from '../../components/containers/ConnectedRankingTable/ConnectedRankingTable';
import { getRenderMode } from './services';
import { useWallet } from '@hooks';
import { Wallet } from '@contexts';
import { isNull } from 'lodash';
import { Button } from '@mui/material';


const LeaderBoard: React.FunctionComponent = () => {
  const [isClaiming, setIsClaiming] = useState<boolean>();
  const [isInvite, setIsInvite] = useState<boolean>();

  const renderMode = getRenderMode(isClaiming, isInvite);

  const handleClaim = () => {
    setIsClaiming(true);
    setIsInvite(false);
  };

  const handleInvite = () => {
    setIsClaiming(false);
    setIsInvite(true);
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    switch(renderMode) {
      case 'claim': {
        setPageTitle('Claim Reward');
        break;
      }
      case 'ranking': {
        setPageTitle('Leader Board');
        break;
      }
    }
  }, [setPageTitle, renderMode]);

  const handleReset = () => {
    setIsClaiming(false);
    setIsInvite(false);
  };

  return (
    <Page>
        {renderMode === 'claim' && (
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', backdropFilter: "blur(8px)" }}>
            
          </Box>
      )}

        {renderMode === 'ranking' && (
          <Box sx={{backdropFilter: "blur(8px)", height: '100%', paddingBottom: "200px"}}>
            <ConnectedRankingTable handleInvite={handleInvite}/>
          </Box>
      )}


    </Page>
  );


};

export default LeaderBoard;
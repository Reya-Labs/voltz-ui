import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { setPageTitle } from '@utilities';

import { Page } from '@components/interface';
import ConnectedRankingTable from '../../components/containers/ConnectedRankingTable/ConnectedRankingTable';
import { getRenderMode } from './services';


const LeaderBoard: React.FunctionComponent = () => {
  const [isClaiming, setIsClaiming] = useState<boolean>();

  const renderMode = getRenderMode(isClaiming);

  const handleClaim = () => {
    setIsClaiming(true);
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
  };

  return (
    <Page>
        {renderMode === 'claim' && (
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', backdropFilter: "blur(8px)" }}>
            
          </Box>
      )}

        {renderMode === 'ranking' && (
          <Box sx={{backdropFilter: "blur(8px)", height: '100%', paddingBottom: "200px"}}>
            <ConnectedRankingTable/>
          </Box>
          
      )}
    </Page>
  );
};

export default LeaderBoard;
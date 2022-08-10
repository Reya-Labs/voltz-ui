import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { setPageTitle } from '@utilities';
import { Page } from '@components/interface';
import { useAMMs } from '@hooks';


// Form specific 
import { AugmentedAMM } from '@utilities';
import { Position } from '@voltz-protocol/v1-sdk';

import ConnectedBorrowForm from '../../components/containers/ConnectedBorrowForm/ConnectedBorrowForm';
import { AMMProvider, PositionProvider } from '@contexts';

const FixedBorrower: React.FunctionComponent = () => {
  // Form specific
  const [amm, setAMM] = useState<AugmentedAMM>();
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    setAMM(undefined);
    setPosition(undefined);
    // onChangeAgent(Agents.BORROW_TRADER);
  }, [setAMM, setPosition]);

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    setPageTitle('Fixed Borrow Form');
  }, []);

  // ==== TO DO: remove ====
  const { amms, loading, error } = useAMMs();
  useEffect(() => {
    setAMM(!amms ? undefined : amms[13]);
  }, []);
  // =======================

  const handleReset = () => {};

  return (
    <Page backgroundView='none'>
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          {amm && (
            <AMMProvider amm={amm}>
              <PositionProvider position={position}>
                <ConnectedBorrowForm onReset={handleReset} />
              </PositionProvider>
            </AMMProvider>
          )}
        </Box>
    </Page>
  );
};

export default FixedBorrower;

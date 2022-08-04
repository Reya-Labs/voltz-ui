import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { setPageTitle } from '@utilities';

import { Page } from '@components/interface';
import ConnectedBorrowForm from 'src/components/containers/ConnectedBorrowForm/ConnectedBorrowForm';

const FixedBorrower: React.FunctionComponent = () => {

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    setPageTitle('Fixed Borrow Form');
  }, []);

  const handleReset = () => {};

  return (
    <Page backgroundView='none'>
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <ConnectedBorrowForm onReset={handleReset} />
        </Box>
    </Page>
  );
};

export default FixedBorrower;

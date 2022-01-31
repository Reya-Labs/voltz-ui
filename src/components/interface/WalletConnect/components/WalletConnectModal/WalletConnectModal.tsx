import React from 'react';

import { Agents } from '@theme';
import { Button } from '@components/atomic';
import { Modal } from '@components/composite';

const WalletConnectModal: React.FunctionComponent = () => {
  return (
    <Modal trigger="Connect wallet">
      <Button agent={Agents.FIXED_TRADER}>Hello</Button>
    </Modal>
  );
};

export default WalletConnectModal;

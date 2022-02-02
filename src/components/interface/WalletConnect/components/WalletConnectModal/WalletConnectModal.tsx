import React, { useState } from 'react';

import { Agents } from '@theme';
import { UseWalletResult } from '@hooks';
import { Button } from '@components/atomic';
import { Modal } from '@components/composite';
import { WalletConnectButton } from './components';

export type WalletConnectModalProps = {
  wallet: UseWalletResult;
};

const WalletConnectModal: React.FunctionComponent<WalletConnectModalProps> = ({ wallet }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    handleClose();
    wallet.connect();
  };

  return (
    <Modal
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      trigger={<WalletConnectButton wallet={wallet} />}
    >
      <Button agent={Agents.FIXED_TRADER} onClick={handleClick}>
        Hello
      </Button>
    </Modal>
  );
};

export default WalletConnectModal;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { UseWalletResult, Wallet } from '@hooks';
import { Panel, Typography } from '@components/atomic';
import { Modal } from '@components/composite';
import { WalletConnectButton, WalletOptionButton } from './components';

export type WalletConnectModalProps = {
  wallet: UseWalletResult;
};

const WalletConnectModal: React.FunctionComponent<WalletConnectModalProps> = ({ wallet }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (walletName: Wallet) => () => {
    handleClose();
    wallet.connect(walletName);
  };

  return (
    <Modal
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      trigger={<WalletConnectButton wallet={wallet} />}
    >
      <Panel
        variant="darker"
        sx={{ maxWidth: 400, minHeight: 400, padding: (theme) => theme.spacing(6) }}
      >
        <Typography variant="h6" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          CONNECT A WALLET
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          By connecting a wallet, you agree to{' '}
          <Link href="#" variant="body1" color="warning.light">
            Voltz Labs Terms of Service
          </Link>{' '}
          and acknowledge that you have read and understand the{' '}
          <Link href="#" variant="body1" color="warning.light">
            Voltz Protocol Disclaimer
          </Link>
          .
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <WalletOptionButton title="Metamask" icon="metamask" onClick={handleClick('metamask')} />
        </Box>
        <Typography
          variant="h2"
          sx={{ marginTop: (theme) => theme.spacing(22), textAlign: 'center' }}
        >
          MORE OPTIONS COMING SOON
        </Typography>
      </Panel>
    </Modal>
  );
};

export default WalletConnectModal;

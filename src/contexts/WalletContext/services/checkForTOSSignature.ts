import { ethers } from 'ethers';

import { getReferrer } from '../../../utilities/referrer-store';
import { getSentryTracker } from '../../../utilities/sentry';
import { getSignature } from './getSignature';
import { getTOSText } from './getTOSText';
import { isMessageEIP1271Signed } from './isMessageEIP1271Signed';
import { saveSignatureWithTOS } from './saveSignatureWithTOS';

/**
 * Will make the wallet open a prompt, asking the user to agree to the T&Cs. It will throw an
 * error if the user disagrees / closes the window. The signature is stored in a database to
 * avoid having to sign the terms every time you connect your wallet.
 * @param signer - The ethers signer
 */
export const checkForTOSSignature = async (signer: ethers.providers.JsonRpcSigner) => {
  const signerAddress = await signer.getAddress();

  const signatureData = await getSignature(signerAddress);
  const latestTOS = getTOSText();
  let termsAccepted = false;

  if (
    !!signatureData?.walletAddress &&
    signatureData.walletAddress.toLowerCase() === signerAddress.toLowerCase() &&
    signatureData.message &&
    signatureData.message === latestTOS
  ) {
    // Wallet matches, and signed data also matches
    // (signature was checked before being written to database)
    termsAccepted = true;
  } else if (await isMessageEIP1271Signed(signer, latestTOS)) {
    // Acceptance of terms is verifiable on-chain. No need for our database.
    termsAccepted = true;
  }

  if (!termsAccepted) {
    try {
      // The latest terms of service have not been accepted. Get a signature now.
      const referralCode = getReferrer() || '';
      const signature = await signer.signMessage(latestTOS);
      const response = await saveSignatureWithTOS(
        signerAddress,
        signature,
        latestTOS,
        referralCode,
      );

      if (!response.ok) {
        // Signature validation failed on the back end
        // One possible reason is that this is a smart contract wallet, which submits signature(s) from the
        // controlling EOAs because it cannot sign anything by itself. For smart contract wallets, we verify
        // signature signing using EIP-1271
        const termsAcceptedBySmartContract = await isMessageEIP1271Signed(
          signer,
          latestTOS,
          signature,
        );

        if (termsAcceptedBySmartContract) {
          // TODO: save to database, but flag as unchecked
          // Unchecked signatures are not trusted and can only be retrieved for use as EIP1271 input
        } else {
          throw new Error('Error saving signature');
        }
      }
    } catch (error) {
      getSentryTracker().captureException(error);
      throw new Error('Error processing signature');
    }
  }
};

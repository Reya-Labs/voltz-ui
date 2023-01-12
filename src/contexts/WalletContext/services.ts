import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

import { getReferrer } from '../../utilities/referrer-store';
import { getSentryTracker } from '../../utilities/sentry';
import { WalletName, WalletRiskAssessment } from './types';

const referralAndSignaturesUrl = `${
  process.env.REACT_APP_REFERRAL_AND_SIGNATURE_SERVICE_URL || 'https://voltz-rest-api.herokuapp.com'
}`;

export type SignatureResponse = {
  signature?: string;
  timestamp?: string;
  walletAddress?: string;
  message?: string;
};

const unavailableText = 'Service unavailable, please try again shortly';

/**
 * Will throw an error if the connected ethereum network does not match required network set in .env file
 * @param provider - The ethers-wrapped provider
 */
export const checkForCorrectNetwork = async (provider: ethers.providers.JsonRpcProvider) => {
  try {
    const network = await provider.getNetwork();
    if (
      !!process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK &&
      network.name !== process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK
    ) {
      throw new Error(
        `Connected to '${network.name}' instead of '${
          process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK || '<unknown>'
        }`,
      );
    }
  } catch (e) {
    throw new Error('Wrong network');
  }
};

/**
 * Will throw an error if the given wallet address is deemed as risky (has a shady history)
 * @param walletAddress - the wallet address to check
 */
export const checkForRiskyWallet = async (walletAddress: string) => {
  const riskAssessment = await getWalletRiskAssessment(walletAddress);
  if (isWalletRisky(riskAssessment)) {
    throw new Error('Risky Account Detected');
  }
};

/**
 * Check if the provided signature is valid for the smart contract at signer.getAddress(),
 * using the checks defined in EIP-1271.
 *
 * For simplicity we use the user's Metamask provider and not Alchemy/Infura, though we could change
 * that in future.
 *
 * @param signer - the signer fort the current wallet. May or may not be a contract wallet, but this
 * function will only return true if it's a contract wallet.
 * @param message - the text of a message (e.g. our terms of service). We will check whether or not the current wallet
 * has signed this message according to the EIP1271 interface.
 * @param signature - optional signature, used on-chain to verify that the message has been signed
 * @returns True if we know that the message has been signed by the wallet in the signer, either using the provided signature or using
 * EIP1271 on-chain with an empty signature.
 */
export const isMessageEIP1271Signed = async (
  signer: ethers.providers.JsonRpcSigner,
  message: string,
  signature: string = '0x',
): Promise<boolean> => {
  const EIP1271_ABI = [
    'function isValidSignature(bytes32 _message, bytes _signature) public view returns (bytes4)',
  ];

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  const EIP1271_magic_value = '0x1626ba7e';

  // E.g. 0xd2b098b48bc04cb4a53d8e377e313b70539f402f
  const walletAddress = await signer.getAddress();

  const contractWallet = new ethers.Contract(walletAddress, EIP1271_ABI, signer);
  const hashMessage = ethers.utils.hashMessage(message);

  try {
    const returnValue = await contractWallet.isValidSignature(hashMessage, signature);
    if (returnValue.toString() === EIP1271_magic_value) {
      return true;
    }
    return false;
  } catch (error) {
    // signature is not valid
    return false;
  }
};

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

/**
 * Retrieves signature data via the signatures API for the given wallet address
 * @param walletAddress - the wallet address to retrieve the signature for
 */
export const getSignature = async (walletAddress: string) => {
  try {
    const resp = await fetch(`${referralAndSignaturesUrl}/get-signature/${walletAddress}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // https://voltz-rest-api.herokuapp.com//get-signature/0x45556408e543158f74403e882E3C8c23eCD9f732

    if (resp.ok) {
      return (await resp.json()) as SignatureResponse;
    } else if (resp.status === 404) {
      return undefined; // API is ok, but the signature wasn't found
    } else {
      throw await resp.text();
    }
  } catch (error) {
    // eslint-disable-next-line
    console.warn('TOS check failed', error);
    getSentryTracker().captureException(error);
    throw new Error(unavailableText);
  }
};

/**
 * Returns the terms of service text that users have to agree to connect their wallet.
 * Note - Any changes, including whitespace, will mean a new signature is required.
 */
const getTOSText = () => {
  const text = `
Please sign this message to log in. This won't cost you any ETH.

By signing, you accept Voltz's Terms of Service (which may have been updated since you last signed). You can find these here:
${process.env.REACT_APP_TOS_URL || ''}

If you're connecting a hardware wallet, you'll need to sign the message on your device too.`;

  return text.trim();
};

/**
 * Attemps to get an ethers-wrapped provider for the given wallet name
 * @param name - The wallet name (E.G: metamask)
 */
export const getWalletProvider = async (name: WalletName) => {
  switch (name) {
    case 'metamask':
      return await getWalletProviderMetamask();
    case 'walletConnect':
      return await getWalletProviderWalletConnect();
  }
};

/**
 * Returns an ethers Web3Provider, which wraps the Metamask instance
 */
const getWalletProviderMetamask = async () => {
  const externalProvider = await detectEthereumProvider();
  if (externalProvider) {
    try {
      const provider = new ethers.providers.Web3Provider(
        externalProvider as ethers.providers.ExternalProvider,
      );

      // There is a login issue with metamask: https://github.com/MetaMask/metamask-extension/issues/10085

      // Triggers metamask login window, but always asks for permissions to allow site to use wallet. However, it handles
      // the user closing the login modal correctly (cancels login request so modal pops up next time).
      // await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);

      // Triggers login modal, but if the user closes the login modal, the request isn't cancelled, so the modal
      // does not pop up again the next time they choose login with metamask (unless they refresh the page).
      await provider.send('eth_requestAccounts', []);

      return provider;
    } catch (error) {
      getSentryTracker().captureException(error);
      return undefined; // Assume user cancelled
    }
  }
  throw new Error('Metamask not installed');
};

/**
 * Returns an ethers Web3Provider, which wraps the WalletConnect instance
 */
const getWalletProviderWalletConnect = async () => {
  window.localStorage.removeItem('walletconnect');
  let provider;

  // Try to init WalletConnect - could fail if INFURA_ID is incorrect
  try {
    provider = new WalletConnectProvider({
      infuraId: process.env.REACT_APP_WALLETCONNECT_INFURA_ID,
    });
  } catch (error) {
    getSentryTracker().captureException(error);
    throw new Error('WalletConnect not available');
  }

  // Now try and get the user to log into their wallet
  try {
    await provider.connect(); //  Enable session (triggers QR Code modal)
  } catch (error) {
    getSentryTracker().captureException(error);
    return undefined; // assume user cancelled login
  }

  if (provider) {
    return new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
  }

  return undefined;
};

/**
 * Makes a request to TRM to get a risk assessment for the given wallet ID
 * @param walletId - ID of the wallet to check
 */
async function getWalletRiskAssessment(walletId: string) {
  try {
    const result = await fetch('https://api.trmlabs.com/public/v2/screening/addresses', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Basic ${btoa(process.env.REACT_APP_TRM_API_KEY || '')}`,
      },
      body: JSON.stringify([
        {
          address: walletId,
          chain: 'ethereum',
        },
      ]),
    });

    if (result.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: WalletRiskAssessment[] = await result.json();
      return data[0];
    } else {
      throw await result.text();
    }
  } catch (error) {
    // eslint-disable-next-line
    getSentryTracker().captureException(error);
    console.warn('Wallet screening failed', error);
    throw new Error(unavailableText);
  }
}

/**
 * Returns true or false based upon if the given risk assessment would suggest the wallet is risky
 * @param riskAssessment - Risk report foir a wallet obtained from using walletSecurityCheck
 */
const isWalletRisky = (riskAssessment?: WalletRiskAssessment) => {
  const indicators = riskAssessment?.addressRiskIndicators;
  const redFlag =
    Array.isArray(indicators) && indicators.find((i) => i.categoryRiskScoreLevel >= 10);
  return Boolean(redFlag);
};

/**
 * Saves a signature via the signatures API for the given wallet address
 * @param walletAddress - the wallet address to save the signature for
 * @param signature - thwe signature to save
 */
const saveSignatureWithTOS = async (
  walletAddress: string,
  signature: string,
  termsOfService: string,
  referralCode: string,
) => {
  // Build formData object.
  const formData = new FormData();
  formData.append('signature', signature);
  formData.append('walletAddress', walletAddress);
  formData.append('message', termsOfService);
  referralCode && formData.append('referralCode', referralCode);

  return await fetch(`${referralAndSignaturesUrl}/add-signature`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: formData,
  });
};

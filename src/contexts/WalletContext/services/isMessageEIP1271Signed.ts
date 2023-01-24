import { ethers } from 'ethers';

/**
 * Check if the provided signature is valid for the smart contract at signer.getAddress(),
 * using the checks defined in EIP-1271.
 *
 * For simplicity, we use the user's Metamask provider and not Alchemy/Infura, though we could change
 * that in the future.
 *
 * @param signer - the signer fort the current wallet. May or may not be a contract wallet, but this
 * function will only return true if it's a contract wallet.
 * @param message - the text of a message (e.g. our terms of service). We will check whether the current wallet
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const returnValue = (await contractWallet.isValidSignature(hashMessage, signature)) as string;
    if (returnValue.toString() === EIP1271_magic_value) {
      return true;
    }
    return false;
  } catch (error) {
    // signature is not valid
    return false;
  }
};

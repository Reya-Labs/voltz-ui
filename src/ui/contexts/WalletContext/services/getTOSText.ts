/**
 * Returns the terms of service text that users have to agree to connect their wallet.
 * Note - Any changes, including whitespace, will mean a new signature is required.
 */
export const getTOSText = () => {
  const text = `
Please sign this message to log in. This won't cost you any ETH.

By signing, you accept Voltz's Terms of Service (which may have been updated since you last signed). You can find these here:
${process.env.REACT_APP_TOS_URL || ''}

If you're connecting a hardware wallet, you'll need to sign the message on your device too.`;

  return text.trim();
};

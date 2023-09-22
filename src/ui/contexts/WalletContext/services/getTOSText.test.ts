import { getTOSText } from './getTOSText';

describe('getTOSText', () => {
  afterEach(() => {
    process.env.REACT_APP_TOS_URL = undefined;
  });

  it('should return the correct TOS text', () => {
    process.env.REACT_APP_TOS_URL = 'https://voltz.xyz';
    const expectedText = `Please sign this message to log in. This won't cost you any ETH.

By signing, you accept Voltz's Terms of Service (which may have been updated since you last signed). You can find these here:
${process.env.REACT_APP_TOS_URL || ''}

If you're connecting a hardware wallet, you'll need to sign the message on your device too.`;
    expect(getTOSText()).toEqual(expectedText.trim());
  });
});

import { ethers } from 'ethers';

import { isMessageEIP1271Signed } from './isMessageEIP1271Signed';

jest.mock('ethers', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const actualEthers = jest.requireActual('ethers');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...actualEthers,
    ethers: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      utils: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...actualEthers.utils,
        hashMessage: jest.fn(() => 'mockedHashMessage'),
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      providers: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...actualEthers.providers,
        JsonRpcSigner: jest.fn(),
      },
      Contract: jest.fn(),
    },
  };
});

const mockedJsonRpcSigner = {
  getAddress: jest.fn(() => Promise.resolve('mockedAddress')),
};
const mockedContract = {
  isValidSignature: jest.fn(),
};

describe('isMessageEIP1271Signed', () => {
  beforeEach(() => {
    (ethers.utils.hashMessage as jest.Mock).mockClear();
    (ethers.providers.JsonRpcSigner as unknown as jest.Mock).mockClear();
    (ethers.Contract as unknown as jest.Mock).mockClear();
    (mockedJsonRpcSigner.getAddress as jest.Mock).mockClear();
    mockedContract.isValidSignature.mockClear();

    (ethers.providers.JsonRpcSigner as unknown as jest.Mock).mockReturnValue(mockedJsonRpcSigner);
    (ethers.Contract as unknown as jest.Mock).mockReturnValue(mockedContract);
  });

  it('should return true if the message is signed', async () => {
    // @ts-ignore
    const signer = new ethers.providers.JsonRpcSigner('mockedProvider');
    const message = 'mockedMessage';
    const signature = 'mockedSignature';
    mockedContract.isValidSignature.mockResolvedValue('0x1626ba7e');

    expect(await isMessageEIP1271Signed(signer, message, signature)).toBe(true);
    expect(ethers.utils.hashMessage).toHaveBeenCalledWith(message);
    expect(mockedJsonRpcSigner.getAddress).toHaveBeenCalled();
    expect(mockedContract.isValidSignature).toHaveBeenCalledWith('mockedHashMessage', signature);
  });

  it('should return false if the return value of isValidSignature is not equal to EIP1271_magic_value', async () => {
    // @ts-ignore
    const signer = new ethers.providers.JsonRpcSigner('mockedProvider');
    const message = 'mockedMessage';
    const signature = 'mockedSignature';
    mockedContract.isValidSignature.mockResolvedValue('0x12345678');

    expect(await isMessageEIP1271Signed(signer, message, signature)).toBe(false);
    expect(ethers.utils.hashMessage).toHaveBeenCalledWith(message);
    expect(mockedJsonRpcSigner.getAddress).toHaveBeenCalled();
    expect(mockedContract.isValidSignature).toHaveBeenCalledWith('mockedHashMessage', signature);
  });

  it('should use an empty signature if no signature is provided', async () => {
    // @ts-ignore
    const signer = new ethers.providers.JsonRpcSigner('mockedProvider');
    const message = 'mockedMessage';
    mockedContract.isValidSignature.mockResolvedValue('0x1626ba7e');

    expect(await isMessageEIP1271Signed(signer, message)).toBe(true);
    expect(ethers.utils.hashMessage).toHaveBeenCalledWith(message);
    expect(mockedJsonRpcSigner.getAddress).toHaveBeenCalled();
    expect(mockedContract.isValidSignature).toHaveBeenCalledWith('mockedHashMessage', '0x');
  });
});

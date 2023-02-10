import * as constants from './constants';
import { deleteChainId, getChainId, setChainId } from './index';

describe('chain-store', () => {
  describe('getChainId', () => {
    const mock_CHAIN_ID_LOCAL_STORAGE_KEY = 'getChainId';
    beforeEach(() => {
      const mockConstants = constants as { CHAIN_ID_LOCAL_STORAGE_KEY: string };
      mockConstants.CHAIN_ID_LOCAL_STORAGE_KEY = mock_CHAIN_ID_LOCAL_STORAGE_KEY;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getChainId should get value from localStorage', () => {
      let retValue = getChainId();

      expect(retValue).toEqual(undefined);

      setChainId('10');
      retValue = getChainId();

      expect(retValue).toEqual(10);
    });
  });

  describe('deleteChainId', () => {
    const mock_CHAIN_ID_LOCAL_STORAGE_KEY = 'deleteChainId';
    beforeEach(() => {
      const mockConstants = constants as { CHAIN_ID_LOCAL_STORAGE_KEY: string };
      mockConstants.CHAIN_ID_LOCAL_STORAGE_KEY = mock_CHAIN_ID_LOCAL_STORAGE_KEY;
    });

    it('deletechainId should delete from localStorage', () => {
      setChainId('10');

      expect(getChainId()).toEqual(10);

      deleteChainId();

      expect(getChainId()).toEqual(undefined);
    });
  });
});

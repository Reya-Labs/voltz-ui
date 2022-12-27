import * as constants from './constants';
import {
  deleteReferrer,
  getReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  setReferrer,
} from './index';

describe('referrer-store', () => {
  describe('getReferrer', () => {
    const mock_REFERRER_LOCAL_STORAGE_KEY = 'getReferrer';
    beforeEach(() => {
      const mockConstants = constants as { REFERRER_LOCAL_STORAGE_KEY: string };
      mockConstants.REFERRER_LOCAL_STORAGE_KEY = mock_REFERRER_LOCAL_STORAGE_KEY;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getReferrer should get value from localStorage', () => {
      let retValue = getReferrer();

      expect(retValue).toEqual(undefined);

      setReferrer('randomReferrerValue');
      retValue = getReferrer();

      expect(retValue).toEqual('randomReferrerValue');
    });
  });

  describe('deleteReferrer', () => {
    const mock_REFERRER_LOCAL_STORAGE_KEY = 'deleteReferrer';
    beforeEach(() => {
      const mockConstants = constants as { REFERRER_LOCAL_STORAGE_KEY: string };
      mockConstants.REFERRER_LOCAL_STORAGE_KEY = mock_REFERRER_LOCAL_STORAGE_KEY;
    });

    it('deleteReferrer should delete from localStorage', () => {
      setReferrer('randomReferrerValue');

      expect(getReferrer()).toEqual('randomReferrerValue');

      deleteReferrer();

      expect(getReferrer()).toEqual(undefined);
    });
  });

  describe('isValidReferrerStored', () => {
    const mock_REFERRER_LOCAL_STORAGE_KEY = 'isValidReferrerStored';
    beforeEach(() => {
      const mockConstants = constants as { REFERRER_LOCAL_STORAGE_KEY: string };
      mockConstants.REFERRER_LOCAL_STORAGE_KEY = mock_REFERRER_LOCAL_STORAGE_KEY;
    });

    test.each([
      ['0', false],
      ['', false],
      ['01234567', true],
      ['012345678', false],
    ])(
      'when value=%p is stored in localStorage, isValidReferrerStored should return expected output',
      (value, expected) => {
        setReferrer(value);
        expect(isValidReferrerStored()).toEqual(expected);
      },
    );
  });

  describe('isRefererStored', () => {
    const mock_REFERRER_LOCAL_STORAGE_KEY = 'isRefererStored';
    beforeEach(() => {
      const mockConstants = constants as { REFERRER_LOCAL_STORAGE_KEY: string };
      mockConstants.REFERRER_LOCAL_STORAGE_KEY = mock_REFERRER_LOCAL_STORAGE_KEY;
    });

    it('isRefererStored should return true when referrer is present in localStorage', () => {
      setReferrer('randomReferrerValue');

      const retValue = isRefererStored();
      expect(retValue).toBeTruthy();
    });

    it('isRefererStored should return false when referrer is NOT present in localStorage', () => {
      deleteReferrer();
      const retValue = isRefererStored();
      expect(retValue).toBeFalsy();
    });
  });

  describe('isValidReferrerValue', () => {
    test.each([
      ['0', false],
      ['', false],
      [undefined, false],
      [null, false],
      ['01234567', true],
      ['012345678', false],
    ])('when value=%p, isValidReferrerValue should return expected output', (value, expected) => {
      expect(isValidReferrerValue(value)).toEqual(expected);
    });
  });
});

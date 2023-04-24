import { selectLpFormAMM, selectSubmitButtonInfo } from '../lp-form';

describe('lp-form.selectors', () => {
  describe('selectSubmitButtonInfo', () => {
    it('returns the submit button information from the state', () => {
      const state = {
        lpForm: {
          submitButton: {
            state: 'lp',
            disabled: false,
            message: {
              text: null,
              isError: false,
            },
          },
        },
      } as never;

      expect(selectSubmitButtonInfo(state)).toEqual({
        state: 'lp',
        disabled: false,
        message: {
          text: null,
          isError: false,
        },
      });
    });
  });

  describe('selectLpFormAMM', () => {
    it('should return the AMM object from the state', () => {
      const mockState = {
        lpForm: {
          amm: {
            address: '0x123456789abcdef',
            name: 'Test AMM',
          },
          submitButton: {
            state: 'swap',
            disabled: false,
            message: {
              text: null,
              isError: false,
            },
          },
        },
      } as never;

      const result = selectLpFormAMM(mockState);

      expect(result).toEqual({
        address: '0x123456789abcdef',
        name: 'Test AMM',
      });
    });
  });
});

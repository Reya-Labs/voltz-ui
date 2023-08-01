import { isUserInputNotionalError } from '../../../../common';
import { getProspectiveLpNotional } from '.';

jest.mock('../../../../common');

describe('getProspectiveLpNotional', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 0 when isUserInputNotionalError returns true', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValueOnce(true);

    const state = { userInput: { notionalAmount: { value: 100 } } };

    const result = getProspectiveLpNotional(state as never);

    expect(result).toEqual(0);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(state);
  });

  it('should return notionalAmount.value', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValueOnce(false);

    const state = { userInput: { notionalAmount: { value: 100 } } };

    const result = getProspectiveLpNotional(state as never);

    expect(result).toEqual(100);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(state);
  });
});

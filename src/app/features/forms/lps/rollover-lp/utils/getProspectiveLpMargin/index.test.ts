import { isUserInputMarginError } from '../../../../common';
import { getProspectiveLpMargin } from '.';

jest.mock('../../../../common');

describe('getProspectiveLpMargin', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 0 when isUserInputMarginError returns true', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValueOnce(true);

    const state = { userInput: { marginAmount: { value: 100 } } };

    const result = getProspectiveLpMargin(state as never);

    expect(result).toEqual(0);
    expect(isUserInputMarginError).toHaveBeenCalledWith(state);
  });

  it('should return marginAmount.value', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValueOnce(false);

    const state = { userInput: { marginAmount: { value: 100 } } };

    const result = getProspectiveLpMargin(state as never);

    expect(result).toEqual(100);
    expect(isUserInputMarginError).toHaveBeenCalledWith(state);
  });
});

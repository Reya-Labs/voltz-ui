import { isUserInputMarginError } from '../../../../common';
import { getProspectiveLpMargin } from '.';

jest.mock('../../../../common');

describe('getProspectiveLpMargin', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 0 when isUserInputMarginError returns true', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValueOnce(true);

    const state = { userInput: { marginAmount: { editMode: 'add', value: 100 } } };

    const result = getProspectiveLpMargin(state as never);

    expect(result).toEqual(0);
    expect(isUserInputMarginError).toHaveBeenCalledWith(state);
  });

  it('should return marginAmount.value when editMode is add', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValueOnce(false);

    const state = { userInput: { marginAmount: { editMode: 'add', value: 100 } } };

    const result = getProspectiveLpMargin(state as never);

    expect(result).toEqual(100);
    expect(isUserInputMarginError).toHaveBeenCalledWith(state);
  });

  it('should return -marginAmount.value when editMode is not add', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValueOnce(false);

    const state = { userInput: { marginAmount: { editMode: 'subtract', value: 50 } } };

    const result = getProspectiveLpMargin(state as never);

    expect(result).toEqual(-50);
    expect(isUserInputMarginError).toHaveBeenCalledWith(state);
  });
});

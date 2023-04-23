import { extractError } from '../extract-error';
import { rejectThunkWithError } from '.';

// Mock the extractError function
jest.mock('../extract-error', () => ({
  extractError: jest.fn(),
}));

describe('rejectThunkWithError', () => {
  afterEach(() => {
    // Reset the mock after each test
    jest.clearAllMocks();
  });

  it('should call thunkAPI.rejectWithValue with the result of extractError', () => {
    // Create a mock implementation of the rejectWithValue function
    const rejectWithValueMock = jest.fn();

    // Set the mock implementation of extractError
    (extractError as jest.Mock).mockReturnValue('Some error message');

    // Call the function being tested
    rejectThunkWithError({ rejectWithValue: rejectWithValueMock }, new Error('An error occurred'));

    // Assert that extractError was called with the correct argument
    expect(extractError).toHaveBeenCalledWith(new Error('An error occurred'));

    // Assert that rejectWithValue was called with the correct argument
    expect(rejectWithValueMock).toHaveBeenCalledWith('Some error message');
  });

  it('should call thunkAPI.rejectWithValue with undefined when extractError returns an empty string', () => {
    // Create a mock implementation of the rejectWithValue function
    const rejectWithValueMock = jest.fn();

    // Set the mock implementation of extractError
    (extractError as jest.Mock).mockReturnValue('');

    // Call the function being tested
    rejectThunkWithError(
      { rejectWithValue: rejectWithValueMock },
      new Error('Another error occurred'),
    );

    // Assert that extractError was called with the correct argument
    expect(extractError).toHaveBeenCalledWith(new Error('Another error occurred'));

    // Assert that rejectWithValue was called with undefined
    expect(rejectWithValueMock).toHaveBeenCalledWith('');
  });
});

import { extractError } from '.';

describe('extractError', () => {
  // Test case for when the input is a string
  it('should return the input string when the input is a string', () => {
    const input = 'This is an error message';
    const result = extractError(input);
    expect(result).toEqual(input);
  });

  // Test case for when the input is an Error object
  it('should return the error message when the input is an Error object', () => {
    const input = new Error('This is an error message');
    const result = extractError(input);
    expect(result).toEqual(input.message);
  });

  // Test case for when the input is an object that satisfies the isError type guard
  it('should return the error message when the input is an object that satisfies the isError type guard', () => {
    const input = { stack: 'stack trace', message: 'This is an error message' };
    const result = extractError(input);
    expect(result).toEqual(input.message);
  });

  // Test case for when the input is neither a string nor an Error object
  it('should return an empty string when the input is not a string, Error object, or object that satisfies the isError type guard', () => {
    const input = 123;
    const result = extractError(input);
    expect(result).toEqual('');
  });
});

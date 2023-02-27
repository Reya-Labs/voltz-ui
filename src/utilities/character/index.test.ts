import { isASCIILeter } from './index';

describe('character', () => {
  describe('isASCIILetter', () => {
    test.each([
      ['@', false],
      ['A', true],
      ['F', true],
      ['Z', true],
      ['[', false],
      ['`', false],
      ['a', true],
      ['f', true],
      ['z', true],
      ['{', false],
      ['', false],
      ['aa', false],
      ['ä', false],
    ])('given string=%p - isASCIILeter should return expected output', (char, expected) => {
      const retValue = isASCIILeter(char);
      expect(retValue).toEqual(expected);
    });
  });
});

import { localeParseFloat } from './index';

describe('localeParseFloat', () => {
  test.each([
    ['1', 'en-US', 1],
    ['1.0', 'en-US', 1],
    ['1.2', 'en-US', 1.2],
    ['1.23', 'en-US', 1.23],
    ['1.234', 'en-US', 1.234],
    ['1', 'en-DE', 1],
    ['1,0', 'en-DE', 1],
    ['1,2', 'en-DE', 1.2],
    ['1,23', 'en-DE', 1.23],
    ['1,234', 'en-DE', 1.234],
  ])(
    'given stringNumber=%p, locale=%p - formatCurrency should return expected output',
    (stringNumber, locale, expected) => {
      const retValue = localeParseFloat(stringNumber, locale);
      expect(retValue).toEqual(expected);
    },
  );
});

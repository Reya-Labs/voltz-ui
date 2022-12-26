import {
  compactFormat,
  formatCurrency,
  formatNumber,
  removeFormat,
  roundUpDecimal,
  stringToBigFloat,
  toUSFormat,
} from './index';

describe('number', () => {
  describe('formatCurrency', () => {
    test.each([
      [1, undefined, undefined, undefined, undefined, '1'],
      [1, false, undefined, undefined, undefined, '1'],
      [1, true, undefined, undefined, undefined, '1.00'],
      [1, false, true, undefined, undefined, '+1'],
      [1, true, true, undefined, undefined, '+1.00'],
      [1, true, true, 2, undefined, '+1.00'],
      [1.234, true, true, 2, 2, '+1.23'],
      [1.2345, true, true, 2, 3, '+1.235'],
      [-1, undefined, undefined, undefined, undefined, '-1'],
      [-1, false, undefined, undefined, undefined, '-1'],
      [-1, true, undefined, undefined, undefined, '-1.00'],
      [-1, false, true, undefined, undefined, '-1'],
      [-1, true, true, undefined, undefined, '-1.00'],
      [-1, true, true, 2, undefined, '-1.00'],
      [-1.234, true, true, 2, 2, '-1.23'],
      [-1.2345, true, true, 2, 3, '-1.235'],
    ])(
      'given num=%p, forceDecimals=%p, showPlusSign=%p, minDecimals=%p, maxDecimals=%p - formatCurrency should return expected output',
      (num, forceDecimals, showPlusSign, minDecimals, maxDecimals, expected) => {
        const retValue = formatCurrency(num, forceDecimals, showPlusSign, minDecimals, maxDecimals);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('formatNumber', () => {
    test.each([
      [1, undefined, undefined, '1.00'],
      [1.2345, undefined, undefined, '1.23'],
      [1.2345, 2, undefined, '1.23'],
      [1.2345, 2, 3, '1.235'],
      [-1, undefined, undefined, '-1.00'],
      [-1.2345, undefined, undefined, '-1.23'],
      [-1.2345, 2, undefined, '-1.23'],
      [-1.2345, 2, 3, '-1.235'],
    ])(
      'given num=%p, minDecimals=%p, maxDecimals=%p - formatNumber should return expected output',
      (num, minDecimals, maxDecimals, expected) => {
        const retValue = formatNumber(num, minDecimals, maxDecimals);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('roundUpDecimal', () => {
    test.each([
      [1.23456789, 2, 1.24],
      [1.23456789, 3, 1.235],
      [1.23456789, 4, 1.2346],
      [1.23456789, 5, 1.23457],
    ])(
      'given num=%p, decimalPlaces=%p - roundUpDecimal should return expected output',
      (num, decimalPlaces, expected) => {
        const retValue = roundUpDecimal(num, decimalPlaces);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('removeFormat', () => {
    let languageGetter: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    test.each([
      ['1,00', 'en-US', '100'],
      [undefined, 'en-US', undefined],
      ['1,123', 'en-US', '1123'],
      ['1.00', 'en-DE', '100'],
      [undefined, 'en-DE', undefined],
      ['1.123', 'en-DE', '1123'],
    ])(
      'given formattedValue=%p, navigator.language=%p - notFormatted should return expected output',
      (formattedValue, mockedNavigatorLanguage, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue(mockedNavigatorLanguage);
        const retValue = removeFormat(formattedValue);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('toUSFormat', () => {
    let languageGetter: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    test.each([
      ['1,00', 'en-US', '1,00'],
      ['100', 'en-US', '100'],
      ['100,23', 'en-US', '100,23'],
      ['1,00', 'en-DE', '1.00'],
      ['100', 'en-DE', '100'],
      ['100,23', 'en-DE', '100.23'],
    ])(
      'given value=%p, navigator.language=%p - toUSFormat should return expected output',
      (value, mockedNavigatorLanguage, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue(mockedNavigatorLanguage);
        const retValue = toUSFormat(value);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('stringToBigFloat', () => {
    test.each([
      ['1,00', 100],
      ['100', 100],
      ['1,2345', 12345],
    ])(
      'given stringValue=%p - stringToBigFloat should return expected output',
      (stringValue, expected) => {
        const retValue = stringToBigFloat(stringValue);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('compactFormat', () => {
    it('should expose a function', () => {
      expect(compactFormat).toBeDefined();
    });

    test.each([
      [1.0, '1'],
      [123, '123'],
      [1233, '1.23K'],
      [1233222, '1.23M'],
      [1233222111, '1.23B'],
      [-1.0, '-1'],
      [-123, '-123'],
      [-1233, '-1.23K'],
      [-1233222, '-1.23M'],
      [-1233222111, '-1.23B'],
    ])('given value=%p - compactFormat should return expected output', (value, expected) => {
      const retValue = compactFormat(value);
      expect(retValue).toEqual(expected);
    });
  });
});

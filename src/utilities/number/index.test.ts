import {
  compactFormat,
  compactFormatToParts,
  formatCurrency,
  formatLeverage,
  formatNumber,
  limitAndFormatNumber,
  removeFormat,
  roundIntegerNumber,
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
      ['-1,00', 'en-US', '-1,00'],
      ['-100', 'en-US', '-100'],
      ['-100,23', 'en-US', '-100,23'],
      ['1,00', 'en-DE', '1.00'],
      ['100', 'en-DE', '100'],
      ['100,23', 'en-DE', '100.23'],
      ['-1,00', 'en-DE', '-1.00'],
      ['-100', 'en-DE', '-100'],
      ['-100,23', 'en-DE', '-100.23'],
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
    let languageGetter: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    test.each([
      ['1,00', 'en-US', 100],
      ['100', 'en-US', 100],
      ['1,2345', 'en-US', 12345],
      ['1.0', 'en-US', 1],
      ['-1.0', 'en-US', -1],
      ['1.2', 'en-US', 1.2],
      ['-1.2', 'en-US', -1.2],
      ['1,123.0', 'en-US', 1123],
      ['-1,123.0', 'en-US', -1123],
      ['1,123.5', 'en-US', 1123.5],
      ['-1,123.5', 'en-US', -1123.5],
      ['1,0', 'en-DE', 1],
      ['-1,0', 'en-DE', -1],
      ['1,2', 'en-DE', 1.2],
      ['-1,2', 'en-DE', -1.2],
      ['1.123,0', 'en-DE', 1123],
      ['-1.123,0', 'en-DE', -1123],
      ['1.123,5', 'en-DE', 1123.5],
      ['-1.123,5', 'en-DE', -1123.5],
    ])(
      'given stringValue=%p - stringToBigFloat should return expected output',
      (stringValue, mockedNavigatorLanguage, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue(mockedNavigatorLanguage);
        const retValue = stringToBigFloat(stringValue);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('compactFormat', () => {
    let languageGetter: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    test.each([
      [1.0, 'en-US', '1'],
      [123, 'en-US', '123'],
      [1233, 'en-US', '1.23K'],
      [1233222, 'en-US', '1.23M'],
      [1233222111, 'en-US', '1.23B'],
      [-1.0, 'en-US', '-1'],
      [-123, 'en-US', '-123'],
      [-1233, 'en-US', '-1.23K'],
      [-1233222, 'en-US', '-1.23M'],
      [-1233222111, 'en-US', '-1.23B'],
      [1.0, 'en-DE', '1'],
      [123, 'en-DE', '123'],
      [1233, 'en-DE', '1,23K'],
      [1233222, 'en-DE', '1,23M'],
      [1233222111, 'en-DE', '1,23B'],
      [-1.0, 'en-DE', '-1'],
      [-123, 'en-DE', '-123'],
      [-1233, 'en-DE', '-1,23K'],
      [-1233222, 'en-DE', '-1,23M'],
      [-1233222111, 'en-DE', '-1,23B'],
    ])(
      'given value=%p, navigator.language=%p - compactFormat should return expected output',
      (value, mockedNavigatorLanguage, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue(mockedNavigatorLanguage);
        const retValue = compactFormat(value);
        expect(retValue).toEqual(expected);
      },
    );
  });

  describe('compactFormatToParts', () => {
    let languageGetter: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    test.each([
      [1.0, 'en-US', '1', ''],
      [123, 'en-US', '123', ''],
      [1233, 'en-US', '1.23', 'K'],
      [1233222, 'en-US', '1.23', 'M'],
      [1233222111, 'en-US', '1.23', 'B'],
      [-1.0, 'en-US', '-1', ''],
      [-123, 'en-US', '-123', ''],
      [-1233, 'en-US', '-1.23', 'K'],
      [-1233222, 'en-US', '-1.23', 'M'],
      [-1233222111, 'en-US', '-1.23', 'B'],
      [1.0, 'en-DE', '1', ''],
      [123, 'en-DE', '123', ''],
      [1233, 'en-DE', '1,23', 'K'],
      [1233222, 'en-DE', '1,23', 'M'],
      [1233222111, 'en-DE', '1,23', 'B'],
      [-1.0, 'en-DE', '-1', ''],
      [-123, 'en-DE', '-123', ''],
      [-1233, 'en-DE', '-1,23', 'K'],
      [-1233222, 'en-DE', '-1,23', 'M'],
      [-1233222111, 'en-DE', '-1,23', 'B'],
    ])(
      'given value=%p, navigator.language=%p - compactFormat should return expected output',
      (value, mockedNavigatorLanguage, expectedCompactNumber, expectedCompactSuffix) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue(mockedNavigatorLanguage);
        const retValue = compactFormatToParts(value);
        expect(retValue.compactNumber).toEqual(expectedCompactNumber);
        expect(retValue.compactSuffix).toEqual(expectedCompactSuffix);
      },
    );
  });

  describe('formatLeverage', () => {
    test.each([
      [-1, 0],
      [0, 0],
      [7, 7],
      [17, 15],
      [94, 90],
      [123, 120],
      [149, 145],
      [200, 200],
      [1234, 1200],
      [1300, 1300],
      [12345, 12300],
    ])('given number=%p - formatLeverage should return expected output', (number, expected) => {
      const retValue = formatLeverage(number);
      expect(retValue).toEqual(expected);
    });
  });

  describe('roundIntegerNumber', () => {
    test.each([
      [9876, 0, 9876],
      [9876, 1, 9870],
      [9876, 2, 9800],
      [9876, 3, 9000],
    ])(
      'given number=%p - formatLeverage should return expected output',
      (number, precision, expected) => {
        const retValue = roundIntegerNumber(number, precision);
        expect(retValue).toEqual(expected);
      },
    );
  });
  describe('limitAndFormatNumber', () => {
    let languageGetter: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    test.each([
      [12345.6789, 9, 5, 'floor', '12,345.6789'],
      [12345.6789, 9, 5, 'ceil', '12,345.6789'],
      [12345.6789, 9, 4, 'floor', '12,345.6789'],
      [12345.6789, 9, 4, 'ceil', '12,345.6789'],
      [12345.6789, 9, 3, 'floor', '12,345.678'],
      [12345.6789, 9, 3, 'ceil', '12,345.679'],
      [12345.6789, 9, 2, 'floor', '12,345.67'],
      [12345.6789, 9, 2, 'ceil', '12,345.68'],
      [12345.6789, 9, 1, 'floor', '12,345.6'],
      [12345.6789, 9, 1, 'ceil', '12,345.7'],
      [12345.6789, 9, 0, 'floor', '12,345'],
      [12345.6789, 9, 0, 'ceil', '12,346'],
      [12345.6789, 8, 4, 'floor', '12,345.678'],
      [12345.6789, 8, 4, 'ceil', '12,345.679'],
      [12345.6789, 7, 4, 'floor', '12,345.67'],
      [12345.6789, 7, 4, 'ceil', '12,345.68'],
      [12345.6789, 6, 4, 'floor', '12,345.6'],
      [12345.6789, 6, 4, 'ceil', '12,345.7'],
      [12345.6789, 5, 4, 'floor', '12,345'],
      [12345.6789, 5, 4, 'ceil', '12,346'],
      [12345.6789, 4, 4, 'ceil', '1,234'],
    ])(
      'given number=%p - formatLeverage should return expected output',
      (number, digitLimit, decimalLimit, mode, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue('en-US');
        const retValue = limitAndFormatNumber(
          number,
          digitLimit,
          decimalLimit,
          mode as 'floor' | 'ceil',
        );
        expect(retValue).toEqual(expected);
      },
    );
  });
});

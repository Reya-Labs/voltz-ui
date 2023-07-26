import {
  compactFormat,
  compactFormatToParts,
  formatNumber,
  limitAndFormatNumber,
  roundIntegerNumber,
  stringToBigFloat,
  toUSFormat,
} from '.';

describe('number', () => {
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
      ['10 339,23', 'ru', '10,339.23'],
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
      [1000, 'en-US', '1', 'K'],
      [1000000, 'en-US', '1', 'M'],
      [1000000000, 'en-US', '1', 'B'],
      [-1000, 'en-US', '-1', 'K'],
      [-1000000, 'en-US', '-1', 'M'],
      [-1000000000, 'en-US', '-1', 'B'],
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
      [1000, 'en-DE', '1', 'K'],
      [1000000, 'en-DE', '1', 'M'],
      [1000000000, 'en-DE', '1', 'B'],
      [-1000, 'en-DE', '-1', 'K'],
      [-1000000, 'en-DE', '-1', 'M'],
      [-1000000000, 'en-DE', '-1', 'B'],
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
      [1000, 'ja', '1', 'K'],
      [1000000, 'ja', '1', 'M'],
      [1000000000, 'ja', '1', 'B'],
      [-1000, 'ja', '-1', 'K'],
      [-1000000, 'ja', '-1', 'M'],
      [-1000000000, 'ja', '-1', 'B'],
      [1.0, 'ja', '1', ''],
      [123, 'ja', '123', ''],
      [1233, 'ja', '1.23', 'K'],
      [1233222, 'ja', '1.23', 'M'],
      [1233222111, 'ja', '1.23', 'B'],
      [-1.0, 'ja', '-1', ''],
      [-123, 'ja', '-123', ''],
      [-1233, 'ja', '-1.23', 'K'],
      [-1233222, 'ja', '-1.23', 'M'],
      [-1233222111, 'ja', '-1.23', 'B'],
      [1000, 'ru', '1', 'K'],
      [1000000, 'ru', '1', 'M'],
      [1000000000, 'ru', '1', 'B'],
      [-1000, 'ru', '-1', 'K'],
      [-1000000, 'ru', '-1', 'M'],
      [-1000000000, 'ru', '-1', 'B'],
      [1.0, 'ru', '1', ''],
      [123, 'ru', '123', ''],
      [1233, 'ru', '1,23', 'K'],
      [1233222, 'ru', '1,23', 'M'],
      [1233222111, 'ru', '1,23', 'B'],
      [-1.0, 'ru', '-1', ''],
      [-123, 'ru', '-123', ''],
      [-1233, 'ru', '-1,23', 'K'],
      [-1233222, 'ru', '-1,23', 'M'],
      [-1233222111, 'ru', '-1,23', 'B'],
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
      [12345.6789, 9, 5, 'floor', 'en-US', '12,345.6789'],
      [12345.6789, 9, 5, 'ceil', 'en-US', '12,345.6789'],
      [12345.6789, 9, 4, 'floor', 'en-US', '12,345.6789'],
      [12345.6789, 9, 4, 'ceil', 'en-US', '12,345.6789'],
      [12345.6789, 9, 3, 'floor', 'en-US', '12,345.678'],
      [12345.6789, 9, 3, 'ceil', 'en-US', '12,345.679'],
      [12345.6789, 9, 2, 'floor', 'en-US', '12,345.67'],
      [12345.6789, 9, 2, 'ceil', 'en-US', '12,345.68'],
      [12345.6789, 9, 1, 'floor', 'en-US', '12,345.6'],
      [12345.6789, 9, 1, 'ceil', 'en-US', '12,345.7'],
      [12345.6789, 9, 0, 'floor', 'en-US', '12,345'],
      [12345.6789, 9, 0, 'ceil', 'en-US', '12,346'],
      [12345.6789, 8, 4, 'floor', 'en-US', '12,345.678'],
      [12345.6789, 8, 4, 'ceil', 'en-US', '12,345.679'],
      [12345.6789, 7, 4, 'floor', 'en-US', '12,345.67'],
      [12345.6789, 7, 4, 'ceil', 'en-US', '12,345.68'],
      [12345.6789, 6, 4, 'floor', 'en-US', '12,345.6'],
      [12345.6789, 6, 4, 'ceil', 'en-US', '12,345.7'],
      [12345.6789, 5, 4, 'floor', 'en-US', '12,345'],
      [12345.6789, 5, 4, 'ceil', 'en-US', '12,346'],
      [12345.6789, 4, 4, 'ceil', 'en-US', '1,234'],
      [12345.6789, 9, 5, 'floor', 'en-DE', '12.345,6789'],
      [12345.6789, 9, 5, 'ceil', 'en-DE', '12.345,6789'],
      [12345.6789, 9, 4, 'floor', 'en-DE', '12.345,6789'],
      [12345.6789, 9, 4, 'ceil', 'en-DE', '12.345,6789'],
      [12345.6789, 9, 3, 'floor', 'en-DE', '12.345,678'],
      [12345.6789, 9, 3, 'ceil', 'en-DE', '12.345,679'],
      [12345.6789, 9, 2, 'floor', 'en-DE', '12.345,67'],
      [12345.6789, 9, 2, 'ceil', 'en-DE', '12.345,68'],
      [12345.6789, 9, 1, 'floor', 'en-DE', '12.345,6'],
      [12345.6789, 9, 1, 'ceil', 'en-DE', '12.345,7'],
      [12345.6789, 9, 0, 'floor', 'en-DE', '12.345'],
      [12345.6789, 9, 0, 'ceil', 'en-DE', '12.346'],
      [12345.6789, 8, 4, 'floor', 'en-DE', '12.345,678'],
      [12345.6789, 8, 4, 'ceil', 'en-DE', '12.345,679'],
      [12345.6789, 7, 4, 'floor', 'en-DE', '12.345,67'],
      [12345.6789, 7, 4, 'ceil', 'en-DE', '12.345,68'],
      [12345.6789, 6, 4, 'floor', 'en-DE', '12.345,6'],
      [12345.6789, 6, 4, 'ceil', 'en-DE', '12.345,7'],
      [12345.6789, 5, 4, 'floor', 'en-DE', '12.345'],
      [12345.6789, 5, 4, 'ceil', 'en-DE', '12.346'],
      [12345.6789, 4, 4, 'ceil', 'en-DE', '1.234'],
    ])(
      'given number=%p - formatLeverage should return expected output',
      (number, digitLimit, decimalLimit, mode, mockedNavigatorLanguage, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        languageGetter.mockReturnValue(mockedNavigatorLanguage);
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

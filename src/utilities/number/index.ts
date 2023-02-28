/**
 * It takes a number and returns a string with the number formatted as a currency
 * @param {number} num - The number to format.
 * @param [forceDecimals=false] - If true, will always show the minimum number of decimals.
 * @param [showPlusSign=false] - If true, will show a plus sign if the number is positive.
 * @param [minDecimals=2] - The minimum number of decimal places to show.
 * @param [maxDecimals=2] - The maximum number of decimal places to show.
 * @returns A string
 */
export const formatCurrency = (
  num: number,
  forceDecimals = false,
  showPlusSign = false,
  minDecimals = 2,
  maxDecimals = 2,
): string => {
  const hasDecimal = !!(num % 1);
  const value = num.toLocaleString(navigator.language, {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: hasDecimal || forceDecimals ? minDecimals : 0,
  });
  return `${showPlusSign && num > 0 ? '+' : ''}${value}`;
};

/**
 * Takes a number and returns a string representation with thousands separators * @param {number} num - The number to format.
 * @param {number} num - The number to format.
 * @param [minDecimals=2] - The minimum number of decimal places to show.
 * @param [maxDecimals=2] - The maximum number of decimal places to show.
 * @returns A function that takes in a number, minDecimals, and maxDecimals and returns a string.
 */
export const formatNumber = (num: number, minDecimals = 2, maxDecimals = 2): string => {
  return num.toLocaleString(navigator.language, {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  });
};

/**
 * "Round up a number to a given number of decimal places."
 *
 * The first line of the function is a comment. It's a good idea to add comments to your functions to explain what they do
 * @param {number} num - The number to round up.
 * @param {number} decimalPlaces - The number of decimal places to round up to.
 * @returns the rounded up value of the number passed in.
 */
export const roundUpDecimal = (num: number, decimalPlaces: number): number => {
  return Math.ceil(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

/**
 * It returns true if the current locale uses a comma as a decimal separator
 * @returns A boolean value.
 */
const withCommaDecimalSeparator = (): boolean => {
  const number = 1.5;
  const formatted = number.toLocaleString(navigator.language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return formatted.includes(',');
};

/**
 * It removes the decimal separator from a string
 * @param {string | undefined} formattedValue - The value to be formatted.
 * @returns A function that takes a string and returns a string.
 */
export const removeFormat = (formattedValue: string | undefined): string | undefined => {
  if (withCommaDecimalSeparator()) {
    return formattedValue?.split('.').join('');
  } else {
    return formattedValue?.split(',').join('');
  }
};

/**
 * It converts a string with a comma decimal separator to a string with a dot decimal separator
 * @param {string | undefined} value - string | undefined
 * @returns A function that takes a string or undefined and returns a string or undefined.
 */
export const toUSFormat = (value: string | undefined): string | undefined => {
  if (withCommaDecimalSeparator()) {
    return value?.split('.').join('#').split(',').join('.').split('#').join(',');
  }
  return value;
};

/**
 * It takes a string, removes any commas, and returns a number
 * @param {string} stringValue - The string value that you want to convert to a number.
 * @returns A function that takes a string and returns a number.
 */
export const stringToBigFloat = (stringValue: string): number => {
  let formattedValue = toUSFormat(stringValue) as string;
  if (formattedValue.includes(',')) {
    formattedValue = formattedValue.split(',').join('');
  }
  return parseFloat(formattedValue);
};

/**
 * It takes a number and returns a string using Intl.NumberFormat formatter
 * it creates compact number format
 * @param {number} value - number - The number to format.
 * @returns A string
 */
export const compactFormat = (value: number): string => {
  const formatter = Intl.NumberFormat(navigator.language, {
    notation: 'compact',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
};

/**
 * It takes a number and returns a string using Intl.NumberFormat formatter
 * it creates compact number format
 * @param {number} value - number - The number to format.
 * @returns {Object} compactFormatToParts containing the compacted number and suffix.
 * @returns {string} compactFormatToParts.compactNumber, representing a
 * language-sensitive representation of the compacted number.
 * @returns {string} compactFormatToParts.compactSuffix, representing the compact
 * suffix (e.g., K, M, etc).
 */
export const compactFormatToParts = (
  number: number,
): {
  compactNumber: string;
  compactSuffix: string;
} => {
  const formatter = Intl.NumberFormat(navigator.language, {
    notation: 'compact',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  const parts = formatter.formatToParts(number);
  return {
    compactNumber: parts
      .filter((part) => part.type !== 'compact')
      .map(({ value }) => value)
      .join(''),
    compactSuffix: parts
      .filter((part) => part.type === 'compact')
      .map(({ value }) => value)
      .join(''),
  };
};

/**
 * It takes a floating point leverage and formats it to an rounded integer
 * @param leverage The leverage number to format (can be float)
 * @returns The formatted leverage (only integer)
 */
export const formatLeverage = (leverage: number): number => {
  const formattedLeverage = Math.floor(leverage);

  if (formattedLeverage < 0) {
    return 0;
  }

  if (formattedLeverage < 10) {
    return formattedLeverage;
  }

  if (formattedLeverage < 1000) {
    return formattedLeverage - (formattedLeverage % 5);
  }

  if (formattedLeverage < 1000) {
    return formattedLeverage - (formattedLeverage % 10);
  }

  return formattedLeverage - (formattedLeverage % 100);
};

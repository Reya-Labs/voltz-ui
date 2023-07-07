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
 * It converts a string with a comma decimal separator to a string with a dot decimal separator
 * @param {string | undefined} value - string | undefined
 * @returns A function that takes a string or undefined and returns a string or undefined.
 */
export const toUSFormat = (value: string | undefined): string | undefined => {
  const thousandSeparator = Intl.NumberFormat(navigator.language).formatToParts(11111)[1].value;
  const decimalSeparator = Intl.NumberFormat(navigator.language).formatToParts(1.1)[1].value;
  return value
    ?.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '#')
    .replace(new RegExp(`\\${decimalSeparator}`), '.')
    .replace('#', ',');
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
 * @param {number} minimumFractionDigits - Min. fraction digits
 * @param {number} maximumFractionDigits - Max. fraction digits
 * @returns A string
 */
export const compactFormat = (
  value: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2,
): string => {
  const { compactNumber, compactSuffix } = compactFormatToParts(
    value,
    minimumFractionDigits,
    maximumFractionDigits,
  );
  return `${compactNumber}${compactSuffix}`;
};

/**
 * It takes a number and returns a string using Intl.NumberFormat formatter
 * it creates compact number format
 * @param {number} number - The number to format.
 * @param {number} minimumFractionDigits - Min. fraction digits
 * @param {number} maximumFractionDigits - Max. fraction digits
 * @returns {Object} compactFormatToParts containing the compacted number and suffix.
 * @returns {string} compactFormatToParts.compactNumber, representing a
 * language-sensitive representation of the compacted number.
 * @returns {string} compactFormatToParts.compactSuffix, representing the compact
 * suffix (e.g., K, M, etc).
 */
export const compactFormatToParts = (
  number: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2,
): {
  compactNumber: string;
  compactSuffix: string;
} => {
  // Create formatter instances for the 'en-US' locale and the user's locale
  const enUsFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits,
    minimumFractionDigits,
  });
  const localeFormatter = new Intl.NumberFormat(navigator.language, {
    notation: 'compact',
    maximumFractionDigits,
    minimumFractionDigits,
  });

  // Get the parts of the formatted number for both locales
  const enUsNumberParts = enUsFormatter.formatToParts(number);
  const localeNumberParts = localeFormatter.formatToParts(number);

  // Extract the non-compact parts of the formatted numbers for both locales
  const enUsNumberValue = enUsNumberParts
    .filter((part) => part.type !== 'compact')
    .map(({ value }) => value)
    .join('')
    .trim();
  const localeNumberValue = localeNumberParts
    .filter((part) => part.type !== 'compact')
    .map(({ value }) => value)
    .join('')
    .trim();

  // Determine which formatted number to use based on the user's locale
  let compactNumber = enUsNumberValue;
  if (
    enUsNumberValue !== localeNumberValue &&
    enUsNumberValue.indexOf('.') !== -1 &&
    enUsNumberValue.indexOf('.') === localeNumberValue.indexOf(',')
  ) {
    compactNumber = localeNumberValue;
  }

  // Get the compact suffix for the formatted number
  const compactSuffix = enUsNumberParts
    .filter((part) => part.type === 'compact')
    .map(({ value }) => value)
    .join('');
  return {
    compactNumber,
    compactSuffix,
  };
};

/**
 * It takes an integer number and rounds its significant digits according
 * to the precision.
 */
export const roundIntegerNumber = (num: number, precision: number): number => {
  const power = Math.pow(10, precision);
  return Math.floor(num / power + Number.EPSILON) * power;
};

export const limitAndFormatNumber = (
  num: number,
  digitLimit: number,
  decimalLimit: number,
  mode: 'floor' | 'ceil',
): string => {
  const power = Math.pow(10, decimalLimit);
  let n =
    mode === 'floor'
      ? Math.floor(Number((num * power).toFixed(4)))
      : Math.ceil(Number((num * power).toFixed(4)));
  n = n / power;

  let remainingDigits = digitLimit;

  let nString = '';

  let epsilon = 0;
  let dotPosition = null;
  let actualNumberOfDecimals = 0;

  for (let i = 0; i < n.toString().length; i += 1) {
    const char = n.toString().charAt(i);
    if ('0' <= char && char <= '9' && !remainingDigits) {
      if (mode === 'ceil' && dotPosition) {
        epsilon = Math.pow(10, dotPosition - i + 1);
      }
      break;
    }

    nString = nString.concat(char);
    if ('0' <= char && char <= '9') {
      remainingDigits -= 1;
      if (dotPosition) {
        actualNumberOfDecimals += 1;
      }
    }

    if (char === '.') {
      dotPosition = i;
    }
  }

  return formatNumber(
    parseFloat(nString) + epsilon,
    Math.min(2, Math.min(actualNumberOfDecimals + remainingDigits, decimalLimit)),
    Math.max(2, Math.min(actualNumberOfDecimals + remainingDigits, decimalLimit)),
  );
};

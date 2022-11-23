/**
 * Takes a number and returns a currency string representation with thousand separators
 * @param num - the number to process
 * @param forceDecimals - force the showing of decimals (will show .00 on amounts)
 * @param showPlusSign - will add '+' at the start of positive values
 * @param minDecimals - min decimals when format is applied
 * @param maxDecimals - max decimals when format is applied
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
 * Takes a number and returns a string representation with thousand separators
 * @param num - the number to process
 */
export const formatNumber = (num: number, minDecimals = 2, maxDecimals = 2): string => {
  return num.toLocaleString(navigator.language, {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  });
};

/**
 * Will round the given number up to the specifield decimal places. Please note it rounds UP.
 * @param num - number to round
 * @param dp - the number of decimal places to round to
 */
export const roundUpDecimal = (num: number, dp: number): number => {
  return Math.ceil(num * Math.pow(10, dp)) / Math.pow(10, dp);
};

/**
 * Returns true if the language used comma for decimals
 */
const withCommaDecimalSeparator = (): boolean => {
  const number = 1.5;
  const formatted = number.toLocaleString(navigator.language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return formatted.includes(',');
};

export const notFormatted = (val: string | undefined): string | undefined => {
  let formattedValue = val;
  if (withCommaDecimalSeparator()) {
    formattedValue = val?.split('.').join('');
  } else {
    formattedValue = val?.split(',').join('');
  }
  return formattedValue;
};

export const toUSFormat = (val: string | undefined): string | undefined => {
  let formattedValue = val;
  if (withCommaDecimalSeparator()) {
    formattedValue = val?.split('.').join('-').split(',').join('.').split('-').join(',');
  }
  return formattedValue;
};

export const stringToBigFloat = (val: string): number => {
  let formattedValue = val;
  if (val.includes(',')) {
    formattedValue = val.split(',').join('');
  }
  return parseFloat(formattedValue);
};

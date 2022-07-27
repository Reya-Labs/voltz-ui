/**
 * Returns true or false if the given number has a decimal part
 * @param num - number to process
 */
export const hasDecimal = (num: number): boolean => !!(num % 1);

/**
 * Takes a number and returns a currency string representation with thousand separators
 * @param num - the number to process
 * @param forceDecimals - force the showing of decimals (will show .00 on amounts)
 * @param showPlusSign - will add '+' at the start of positive values
 */
 export const formatCurrency = (num: number, forceDecimals = false, showPlusSign = false, minDecimals = 2, maxDecimals = 2): string => {
  const value = num.toLocaleString('en-US', { 
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: (hasDecimal(num) || forceDecimals) ? minDecimals : 0 
  });
  return `${(showPlusSign && num > 0) ? '+' : ''}${value}`;
}

/**
 * Takes a number and returns a string representation with thousand separators
 * @param num - the number to process
 */
 export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/**
 * Will round the given number up to the specifield decimal places. Please note it rounds UP.
 * @param num - number to round
 * @param dp - the number of decimal places to round to
 */
export const roundUpDecimal = (num: number, dp: number): number => {
  return Math.ceil(num * Math.pow(10, dp)) / Math.pow(10, dp);
}
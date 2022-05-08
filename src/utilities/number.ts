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
 export const formatCurrency = (num: number, forceDecimals = false, showPlusSign = false): string => {
  const value = num.toLocaleString('en-US', { 
    maximumFractionDigits:2,  
    minimumFractionDigits: (hasDecimal(num) || forceDecimals) ? 2 : 0 
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
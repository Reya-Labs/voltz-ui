export const localeParseFloat = (
  stringNumber: string,
  locale: string = navigator.language,
): number => {
  // Get the thousands and decimal separator characters used in the locale.
  const [, thousandsSeparator, , , , decimalSeparator] = (1111.1).toLocaleString(locale).split('');
  // Remove a thousand separators, and put a point where the decimal separator occurs
  const parsedStringNumber = Array.from(stringNumber, (c) =>
    c === thousandsSeparator ? '' : c === decimalSeparator ? '.' : c,
  ).join('');
  debugger;
  // Now it can be parsed
  return parseFloat(parsedStringNumber);
};

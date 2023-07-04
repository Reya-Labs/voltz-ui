const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Takes a timestamp and returns a string representation: 01 Mar 2022
 * @param timestampInMS - The timestamp to process in milliseconds
 */
export const formatTimestamp = (timestampInMS: number) => {
  const date = new Date(timestampInMS);
  return `${date.getDate().toString().padStart(2, '0')} ${
    shortMonths[date.getMonth()]
  } ${date.getFullYear()}`;
};

/**
 * Takes a POSIX timestamp and returns a string representation: 10/12/22 (DD/MM/YY)
 * or 12/10/22 (MM/DD/YY) depending on locale
 * @param timestamp - The POSIX timestamp to process
 */
export const formatPOSIXTimestamp = (timestamp: number): string => {
  return new Date(timestamp || 0).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

/**
 * Takes a POSIX timestamp and returns a string representation: 10/12/22 04:30 (DD/MM/YY)
 * or 12/10/22 04:30 (MM/DD/YY) depending on locale in UTC
 * @param timestamp - The POSIX timestamp to process
 */
export const formatPOSIXTimestampWithHoursMinutesUTC = (timestamp: number): string => {
  const jsDate = new Date(timestamp || 0);
  return jsDate.toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

/**
 * It takes a timestamp and returns a string with the ordinal suffix added to the day of the month
 * @param {number} timestamp - The timestamp to format
 * @returns A string
 */
export const formatDateTimeWithOrdinal = (timestamp: number): string => {
  const dateTime = new Date(timestamp);
  const formatted = dateTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formatParts = formatted.split(' ');

  if (formatParts.length === 3) {
    return formatParts
      .map((p) =>
        !isNaN(parseInt(p, 10)) && parseInt(p, 10) <= 31
          ? parseInt(p, 10).toString() + getNumberSuffix(parseInt(p, 10))
          : p,
      )
      .join(' ');
  }

  return formatted;
};

/**
 * "If the number is 11, 12, or 13, return 'th', otherwise return the appropriate suffix based on the last digit of the
 * number."
 *
 * @param {number} num - The number to get the suffix for.
 * @returns the suffix of a number.
 */
export function getNumberSuffix(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const suffixIndex = num % 100;
  return suffixes[(suffixIndex - 20) % 10] || suffixes[suffixIndex] || suffixes[0];
}

export const getStartOfTodayTimestamp = (): number => {
  return new Date().setHours(0, 0, 0, 0).valueOf();
};

export const getEndOfTodayTimestamp = (): number => {
  return new Date().setHours(23, 59, 59, 999).valueOf();
};

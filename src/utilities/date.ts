import JSBI from 'jsbi';
import { DateTime } from 'luxon';

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
 * Takes a date and returns a string representation: 01 Mar 2022
 * @param date - The date to process
 */
export const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')} ${
    shortMonths[date.getMonth()]
  } ${date.getFullYear()}`;
};

/**
 * Takes a Luxon DateTime and returns a string representation: 01 Mar 2022
 * @param dateTime - The DateTime to process
 */
export const formatDateTime = (dateTime: DateTime) => {
  return `${dateTime.day.toString().padStart(2, '0')} ${shortMonths[dateTime.month - 1]} ${
    dateTime.year
  }`;
};

/**
 * Takes a timestamp and returns a string representation: 01 Mar 2022
 * @param timestamp - The timestamp to process
 */
export const formatTimestamp = (timestamp: string | number | JSBI) => {
  return formatDate(new Date(parseInt(timestamp.toString(), 10) * 1000));
};

/**
 * Takes a POSIX timestamp and returns a string representation: 10/12/22 (DD/MM/YY)
 * or 12/10/22 (MM/DD/YY) depending on locale
 * @param timestamp - The POSIX timestamp to process
 */
export const formatPOSIXTimestamp = (timestamp: number): string => {
  return DateTime.fromMillis(timestamp).toLocaleString({
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

/**
 * Takes a DateTime and returns a string representatio
 * @param dateTime - The DateTime to process
 */
export const formatDateTimeWithOrdinal = (dateTime: DateTime): string => {
  const formatted = dateTime.toFormat('DDD');
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
  const th = 'th';
  const rd = 'rd';
  const nd = 'nd';
  const st = 'st';

  if (num === 11 || num === 12 || num === 13) return th;

  const lastDigit = num.toString().slice(-1);

  switch (lastDigit) {
    case '1':
      return st;
    case '2':
      return nd;
    case '3':
      return rd;
    default:
      return th;
  }
}

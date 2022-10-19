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
 * Takes a POSIX timestamp and returns a string representation: 10/12/2022 (DD/MM/YY)
 * or 12/10/2022 (MM/DD/YY) depending on locale
 * @param timestamp - The POSIX timestamp to process
 */
export const formatPOSIXTimestamp = (timestamp: number): string => {
  return DateTime.fromMillis(timestamp).toLocaleString();
};

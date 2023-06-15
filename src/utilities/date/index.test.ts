import { DateTime } from 'luxon';

import {
  formatDateTime,
  formatDateTimeWithOrdinal,
  formatPOSIXTimestamp,
  formatTimestamp,
  getNumberSuffix,
} from './index';

describe('utilities.date', () => {
  describe('formatDateTime', () => {
    it('formats the date correctly', () => {
      const dateTime = DateTime.fromISO('2022-03-01T00:00:00.000Z');
      expect(formatDateTime(dateTime)).toBe('01 Mar 2022');
    });
  });

  describe('formatTimestamp', () => {
    it('formats the timestamp correctly', () => {
      // corresponds to 02 Mar 2021
      const timestampInMS = 1614667200000;
      expect(formatTimestamp(timestampInMS)).toBe('02 Mar 2021');
    });
  });

  describe('formatPOSIXTimestamp', () => {
    it('formats the POSIX timestamp correctly', () => {
      const timestamp = 1614667200000; // corresponds to 02 Mar 2021
      expect(formatPOSIXTimestamp(timestamp)).toBe('03/02/21');
    });
  });

  describe('formatDateTimeWithOrdinal', () => {
    it('formats the date correctly with ordinal suffix', () => {
      const dateTime = DateTime.fromISO('2022-03-01T00:00:00.000Z');
      expect(formatDateTimeWithOrdinal(dateTime)).toBe('March 1st 2022');
    });
  });

  describe('getNumberSuffix', () => {
    it('returns the correct suffix for a number', () => {
      expect(getNumberSuffix(1)).toBe('st');
      expect(getNumberSuffix(2)).toBe('nd');
      expect(getNumberSuffix(3)).toBe('rd');
      expect(getNumberSuffix(4)).toBe('th');
      expect(getNumberSuffix(11)).toBe('th');
      expect(getNumberSuffix(12)).toBe('th');
      expect(getNumberSuffix(13)).toBe('th');
    });
  });
});

import {
  formatDateTimeWithOrdinal,
  formatPOSIXTimestamp,
  formatPOSIXTimestampWithHoursMinutes,
  formatPOSIXTimestampWithHoursMinutesUTC,
  formatTimestamp,
  getNumberSuffix,
} from './index';

describe('utilities.date', () => {
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

  describe('formatPOSIXTimestampWithHoursMinutes', () => {
    it('formats the POSIX timestamp correctly with hours and minutes', () => {
      const timestamp = 1614667200000; // corresponds to 02 Mar 2021, 06:40 AM UTC
      expect(formatPOSIXTimestampWithHoursMinutes(timestamp)).toBe('03/02/21, 06:40');
    });
  });

  describe('formatDateTimeWithOrdinal', () => {
    it('formats the date correctly with ordinal suffix', () => {
      // Test case 1
      const timestamp1 = new Date('2022-03-01').valueOf();
      const expected1 = 'March 1st 2022';
      expect(formatDateTimeWithOrdinal(timestamp1)).toBe(expected1);

      // Test case 2
      const timestamp2 = new Date('2023-08-21').valueOf();
      const expected2 = 'August 21st 2023';
      expect(formatDateTimeWithOrdinal(timestamp2)).toBe(expected2);

      // Test case 3
      const timestamp3 = new Date('2024-11-12').valueOf();
      const expected3 = 'November 12th 2024';
      expect(formatDateTimeWithOrdinal(timestamp3)).toBe(expected3);

      // Test case 4
      const timestamp4 = new Date('2025-02-03').valueOf();
      const expected4 = 'February 3rd 2025';
      expect(formatDateTimeWithOrdinal(timestamp4)).toBe(expected4);
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

  describe('formatPOSIXTimestampWithHoursMinutesUTC', () => {
    it('should format the timestamp correctly', () => {
      // Test case 1
      const timestamp1 = 1625376000000;
      const expected1 = '07/04/21, 05:20 AM';
      expect(formatPOSIXTimestampWithHoursMinutesUTC(timestamp1)).toBe(expected1);

      // Test case 2
      const timestamp2 = 1663033600000;
      const expected2 = '09/13/22, 01:46 AM';
      expect(formatPOSIXTimestampWithHoursMinutesUTC(timestamp2)).toBe(expected2);
    });
  });
});

import { BigNumber } from 'ethers';
import JSBI from 'jsbi';
import { DateTime } from 'luxon';

const timestampWadToDateTime = (wad: JSBI | BigNumber): DateTime => {
  const wadString = wad.toString();
  const truncated = wadString.substring(0, wadString.length - 15);

  return DateTime.fromMillis(parseInt(truncated, 10));
};

export default timestampWadToDateTime;

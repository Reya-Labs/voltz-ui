import JSBI from 'jsbi';
import { DateTime } from 'luxon';

const timestampWadToDateTime = (wad: JSBI): DateTime => {
  const wadString = wad.toString();
  const truncated = wadString.substring(0, wadString.length - 15);

  return DateTime.fromMillis(parseInt(truncated));
};

export default timestampWadToDateTime;

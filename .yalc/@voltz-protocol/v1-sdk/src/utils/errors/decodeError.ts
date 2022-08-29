import { getReadableErrorMessage } from './errorHandling';

const error = {
  data: "0x6b4fff24000000000000000000000000000000000000000000000000000000000000193e",
};

console.log(getReadableErrorMessage(error, 'KOVAN'));

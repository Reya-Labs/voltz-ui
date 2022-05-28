import { getReadableErrorMessage } from './errorHandling';

const error = {
  data: "Reverted 0x798f045e0000000000000000000000000000000000000000000000000000000000000000",
};

console.log(getReadableErrorMessage(error, 'KOVAN'));

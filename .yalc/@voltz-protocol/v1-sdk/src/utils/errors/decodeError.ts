import { getReadableErrorMessage } from './errorHandling';

const error = {
  data: "Reverted 0x6b4fff240000000000000000000000000000000000000000000000000000000000012ab2",
};

console.log(getReadableErrorMessage(error, 'KOVAN'));

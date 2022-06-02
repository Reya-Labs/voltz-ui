import { getReadableErrorMessage } from './errorHandling';

const error = {
  data: "Reverted 0x6b4fff2400000000000000000000000000000000000000000000000000000000010312e3",
};

console.log(getReadableErrorMessage(error, 'KOVAN'));

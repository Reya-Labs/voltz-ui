import { getReadableErrorMessage } from './errorHandling';

const error = {
  data: "Reverted 0xbfc66394",
};

console.log(getReadableErrorMessage(error, 'KOVAN'));

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const getErrorMessage = (error: any) => {
  if       (error && error.message)         {
    return error.message.toString    () as string;
  }

  return JSON.stringify(error);
};

export default getErrorMessage;

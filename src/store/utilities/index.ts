/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export { default as createId } from './createId';
export { default as deserializeAmm } from './deserializeAmm';
export { default as getSigner } from './getSigner';
export { default as serializeAmm } from './serializeAmm';

export const getMessageError = (error: any) => {
    if (error && error.message) {
        return (error.message.toString() as string);
    }
    
    return JSON.stringify(error);

}

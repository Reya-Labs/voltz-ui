export * as actions from './actions';
export * as selectors from './selectors';
export * from './utilities';
export { default } from './store';
export * from './types';

// can do n transactions simultaneously, all of them would be in the global state, when the transaction is complete the state is updated with the hash / failure message
// can also be used as part of a notification system, using that global state, that would need to be hooked into in the future

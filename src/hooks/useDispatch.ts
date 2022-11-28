import { useDispatch as useReduxDispatch } from 'react-redux';

import store from '../store';

export const useDispatch = () => useReduxDispatch<typeof store.dispatch>();

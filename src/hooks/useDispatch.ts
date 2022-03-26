import { useDispatch as useReduxDispatch } from 'react-redux';

import store from '@store';

const useDispatch = () => useReduxDispatch<typeof store.dispatch>();

export default useDispatch;

import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import { State } from '../store';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

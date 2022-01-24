import React from 'react';
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material/Autocomplete';

export type AutocompleteProps = MuiAutocompleteProps<Record<string, unknown>, true, true, true>;

const Autocomplete: React.FunctionComponent<AutocompleteProps> = ({ ...props }) => {
  return <MuiAutocomplete {...props} />;
};

export default Autocomplete;

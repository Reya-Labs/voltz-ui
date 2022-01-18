import React from 'react';
import { styled } from '@mui/system';
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material/Autocomplete';

import { colors } from '@theme';

export type AutocompleteProps = MuiAutocompleteProps<{}, true, true, true>;

const Autocomplete: React.FunctionComponent<AutocompleteProps> = ({ ...props }) => {
  return <MuiAutocomplete {...props} />;
};

export default styled(Autocomplete)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));

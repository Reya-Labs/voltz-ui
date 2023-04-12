import styled from '@emotion/styled';
import { Typography } from 'brokoli-ui';

import { ReactComponent as AscendingSort } from './assets/ascending-sort.svg';
import { ReactComponent as DescendingSort } from './assets/descending-sort.svg';
import { ReactComponent as NoSort } from './assets/no-sort.svg';

export const RowsBox = styled('div')`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const TypographyWithIcon = styled(Typography)`
  display: inline-flex;
  align-items: center;
`;

export const NoSortIcon = styled(NoSort)`
  width: 1em;
  height: 1em;
`;

export const AscendingSortIcon = styled(AscendingSort)`
  width: 1em;
  height: 1em;
`;

export const DescendingSortIcon = styled(DescendingSort)`
  width: 1em;
  height: 1em;
`;

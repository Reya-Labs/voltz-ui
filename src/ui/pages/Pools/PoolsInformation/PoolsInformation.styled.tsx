import styled from '@emotion/styled';
import { colors, Pill } from 'brokoli-ui';

export const PoolsInformationBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;

export const InformationBox = styled('div')``;

export const FilterBox = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const FiltersBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  cursor: pointer;
`;

export const VerticalLine = styled('div')`
  background-color: ${colors.lavenderWeb7};
  width: 1px;
`;

export const PoolFilterPill = styled(Pill)`
  transition: background 200ms ease-in;
`;

import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectPoolsLoading,
  togglePoolSortingDirectionAction,
} from '../../../../../../app/features/aMMs';
import { PoolSortDirection, PoolSortId } from '../../../../../../app/features/aMMs/constants';
import { selectChainId } from '../../../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../../hooks/useResponsiveQuery';
import {
  AscendingSortIcon,
  DescendingSortIcon,
  NoSortIcon,
  RowsBox,
  TypographyWithIcon,
} from './PoolSortHeader.styled';

type PoolSortHeaderProps = {
  id: PoolSortId;
  text: string;
  subtext?: string;
  direction: PoolSortDirection;
};

export const PoolSortHeader: React.FunctionComponent<PoolSortHeaderProps> = ({
  text,
  subtext,
  id,
  direction,
}) => {
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const loading = useAppSelector(selectPoolsLoading);

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const DirectionIcon =
    direction === 'noSort'
      ? NoSortIcon
      : direction === 'ascending'
      ? AscendingSortIcon
      : DescendingSortIcon;

  if (!chainId) {
    return null;
  }

  return (
    <RowsBox
      onClick={() => {
        if (loading) {
          return;
        }
        dispatch(
          togglePoolSortingDirectionAction({
            sortId: id,
            chainId,
          }),
        );
      }}
    >
      <TypographyWithIcon colorToken="lavenderWeb3" typographyToken={typographyToken}>
        {text}&nbsp;
        <DirectionIcon />
      </TypographyWithIcon>
      {subtext ? (
        <Typography colorToken="lavenderWeb5" typographyToken={typographyToken}>
          {subtext}
        </Typography>
      ) : null}
    </RowsBox>
  );
};

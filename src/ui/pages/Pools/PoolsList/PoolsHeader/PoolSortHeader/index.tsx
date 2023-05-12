import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectPoolsLoading,
  togglePoolSortingDirectionAction,
} from '../../../../../../app/features/aMMs';
import { PoolSortDirection, PoolSortId } from '../../../../../../app/features/aMMs/types';
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
  disabled: boolean;
};

export const PoolSortHeader: React.FunctionComponent<PoolSortHeaderProps> = ({
  text,
  subtext,
  id,
  direction,
  disabled,
}) => {
  const dispatch = useAppDispatch();
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

  return (
    <RowsBox
      onClick={() => {
        if (loading || disabled) {
          return;
        }
        dispatch(
          togglePoolSortingDirectionAction({
            sortId: id,
          }),
        );
      }}
    >
      <TypographyWithIcon colorToken="lavenderWeb3" typographyToken={typographyToken}>
        {text}
        {disabled ? null : (
          <React.Fragment>
            &nbsp;
            <DirectionIcon />
          </React.Fragment>
        )}
      </TypographyWithIcon>
      {subtext ? (
        <Typography colorToken="lavenderWeb5" typographyToken={typographyToken}>
          {subtext}
        </Typography>
      ) : null}
    </RowsBox>
  );
};

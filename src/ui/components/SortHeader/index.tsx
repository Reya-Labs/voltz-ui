import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../hooks/useResponsiveQuery';
import {
  AscendingSortIcon,
  DescendingSortIcon,
  NoSortIcon,
  RowsBox,
  TypographyWithIcon,
} from './SortHeader.styled';

type SortHeaderProps = {
  text: string;
  subtext?: string;
  direction: 'noSort' | 'ascending' | 'descending';
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

export const SortHeader: React.FunctionComponent<SortHeaderProps> = ({
  text,
  subtext,
  direction,
  disabled,
  loading,
  onClick,
}) => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

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
      disabled={loading || disabled}
      onClick={() => {
        if (loading || disabled) {
          return;
        }
        onClick && onClick();
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

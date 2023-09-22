import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../hooks/useResponsiveQuery';
import { DirectionIcon } from './DirectionIcon';
import { RowsBox, TypographyWithIcon } from './SortHeader.styled';

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

  const computedDisabled = loading || disabled;
  const handleOnRowClick = () => {
    if (computedDisabled) {
      return;
    }
    onClick && onClick();
  };
  return (
    <RowsBox
      data-testid={`SortHeader-${computedDisabled ? 'disabled' : 'enabled'}`}
      disabled={computedDisabled}
      onClick={handleOnRowClick}
    >
      <TypographyWithIcon
        colorToken="lavenderWeb3"
        data-testid={`SortHeader-TypographyWithIcon-${
          disabled ? 'WithDirectionIcon' : 'WithoutDirectionIcon'
        }`}
        typographyToken={typographyToken}
      >
        {text}
        {disabled ? null : (
          <React.Fragment>
            &nbsp;
            <DirectionIcon direction={direction} />
          </React.Fragment>
        )}
      </TypographyWithIcon>
      {subtext ? (
        <Typography
          colorToken="lavenderWeb5"
          data-testid="SortHeader-SubtextTypography"
          typographyToken={typographyToken}
        >
          {subtext}
        </Typography>
      ) : null}
    </RowsBox>
  );
};

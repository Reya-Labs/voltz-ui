import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

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
  const typographyToken: TypographyToken = 'primaryBodyXSmallRegular';

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
        colorToken="white400"
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
          colorToken="white600"
          data-testid="SortHeader-SubtextTypography"
          typographyToken={typographyToken}
        >
          {subtext}
        </Typography>
      ) : null}
    </RowsBox>
  );
};

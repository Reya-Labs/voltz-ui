import React from 'react';

import { TagContainer, TagTypography } from './Tag.styled';

type TagProps = {
  className?: string;
};

export const Tag: React.FunctionComponent<TagProps> = ({ className, children }) => (
  <TagContainer className={className}>
    <TagTypography variant="h6">{children}</TagTypography>
  </TagContainer>
);

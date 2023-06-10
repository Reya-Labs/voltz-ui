import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import React from 'react';

import { SystemStyleObject, Theme } from '../../../theme';
import { withLabel } from '../../hoc/withLabel/withLabel';

export type TypographyProps = React.ComponentProps<typeof TypographyComponent>;

function TypographyComponent<C extends React.ElementType>(
  props: MuiTypographyProps<C, { component?: C }>,
) {
  const { sx, ...restProps } = props;
  return <MuiTypography {...restProps} sx={{ ...(sx as SystemStyleObject<Theme>) }} />;
}

export const Typography = withLabel<TypographyProps>(TypographyComponent);

import { Ellipsis, Typography } from 'brokoli-ui';
import React from 'react';

import { BaseTextSpan, ErrorTextSpan, SuccessTextSpan, WarningTextSpan } from './HintText.styled';

export const HintText: React.FunctionComponent<{
  prefixText?: string;
  text: string;
  suffixText?: string;
  error?: boolean;
  loading?: boolean;
  warning?: boolean;
  success?: boolean;
}> = ({ error, warning, success, loading, prefixText, text, suffixText }) => {
  const TextSpanUI = error
    ? ErrorTextSpan
    : success
    ? SuccessTextSpan
    : warning
    ? WarningTextSpan
    : BaseTextSpan;

  const dataTestId = error
    ? 'ErrorTextSpan'
    : success
    ? 'SuccessTextSpan'
    : warning
    ? 'WarningTextSpan'
    : 'BaseTextSpan';
  if (!text && !prefixText && !suffixText) {
    return null;
  }
  return (
    <Typography
      colorToken="white400"
      data-testid="HintText-HintTextTypography"
      typographyToken="primaryBodySmallRegular"
    >
      {prefixText ? `${prefixText} ` : null}
      <TextSpanUI data-testid={`HintText-${dataTestId}`}>{text}</TextSpanUI>
      {loading ? <Ellipsis /> : null}
      {suffixText ? ` ${suffixText}` : null}
    </Typography>
  );
};

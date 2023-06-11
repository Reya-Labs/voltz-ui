import React from 'react';

import { Ellipsis } from '../../../../../components/atomic/Ellipsis/Ellipsis';
import {
  BaseTextSpan,
  ErrorTextSpan,
  HintTextTypography,
  SuccessTextSpan,
  WarningTextSpan,
} from './HintText.styled';

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

  return (
    <HintTextTypography data-testid="HintText-HintTextTypography">
      {prefixText ? `${prefixText} ` : null}
      <TextSpanUI data-testid={`HintText-${dataTestId}`}>{text}</TextSpanUI>
      {loading ? <Ellipsis /> : null}
      {suffixText ? ` ${suffixText}` : null}
    </HintTextTypography>
  );
};

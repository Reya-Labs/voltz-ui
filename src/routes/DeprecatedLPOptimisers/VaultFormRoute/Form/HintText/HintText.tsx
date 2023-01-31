import React from 'react';

import { Ellipsis } from '../../../../../components/atomic/Ellipsis/Ellipsis';
import { HintTextTypography, PrefixHintTextSpan } from './HintText.styled';

// TODO: remove this and use other HintText
// Requires some prop refactoring first
export const HintText: React.FunctionComponent<{
  prefixText?: string;
  text: string;
  suffixText?: string;
  textColor?: string;
  loading: boolean;
}> = ({ loading, prefixText, text, suffixText, textColor }) => {
  return (
    <HintTextTypography>
      {prefixText ? `${prefixText} ` : null}
      <PrefixHintTextSpan color={textColor}>{text}</PrefixHintTextSpan>
      {loading ? <Ellipsis /> : null}
      {suffixText ? ` ${suffixText}` : null}
    </HintTextTypography>
  );
};

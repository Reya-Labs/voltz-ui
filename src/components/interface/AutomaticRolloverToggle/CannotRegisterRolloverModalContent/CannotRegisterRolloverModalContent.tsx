import React from 'react';

import {
  ButtonBox,
  ContentBox,
  DescriptionTypography,
  ProceedButton,
  TitleTypography,
} from './CannotRegisterRolloverModalContent.styled';

type Props = {
  onProceed: () => void;
};
export const CannotRegisterRolloverModalContent: React.FunctionComponent<Props> = ({
  onProceed,
}) => {
  return (
    <ContentBox>
      <TitleTypography>AUTOMATIC ROLLOVER</TitleTypography>
      <DescriptionTypography>
        The autorollover for this optimiser was triggered, but not yet executed. During this period,
        it is not possible to change the autorollover configuration. You will be able to change this
        configuration as soon as the autorollover is executed.
      </DescriptionTypography>
      <ButtonBox>
        <ProceedButton onClick={onProceed}>GOT IT</ProceedButton>
      </ButtonBox>
    </ContentBox>
  );
};

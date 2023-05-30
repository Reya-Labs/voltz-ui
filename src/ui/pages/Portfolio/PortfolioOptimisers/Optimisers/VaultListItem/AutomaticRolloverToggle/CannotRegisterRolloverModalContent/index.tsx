import { Button, Typography } from 'brokoli-ui';
import React from 'react';

import { ButtonBox, ContentBox } from './CannotRegisterRolloverModalContent.styled';

type Props = {
  onProceed: () => void;
};
export const CannotRegisterRolloverModalContent: React.FunctionComponent<Props> = ({
  onProceed,
}) => {
  return (
    <ContentBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Automatic Rollover
      </Typography>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        The autorollover for this optimiser was triggered, but not yet executed. During this period,
        it is not possible to change the autorollover configuration. You will be able to change this
        configuration as soon as the autorollover is executed.
      </Typography>
      <ButtonBox>
        <Button variant="primary" onClick={onProceed}>
          Got it!
        </Button>
      </ButtonBox>
    </ContentBox>
  );
};

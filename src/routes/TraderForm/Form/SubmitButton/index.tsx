import { Button } from 'brokoli-ui';
import React from 'react';

import { SubmitButtonBox } from './SubmitButton.styled';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  // todo: Alex handle button states
  return (
    <SubmitButtonBox>
      <Button bottomLeftText="Almost ready.">Swap</Button>
    </SubmitButtonBox>
  );
};

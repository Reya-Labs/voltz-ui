import { Button, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppNavigate } from '../../../hooks/useAppNavigate';
import { NoPassDetectedBox, TitleBox } from './NoPassDetected.styled';

export const NoPassDetected: React.FunctionComponent = () => {
  const navigate = useAppNavigate();
  return (
    <NoPassDetectedBox>
      <TitleBox>
        <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
          No Pass Detected
        </Typography>
      </TitleBox>
      <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
        Unfortunately we couldn’t verify your Voltz Alpha Pass in your wallet. Check out other v1
        pools until the v2 pools are opened to all.{' '}
      </Typography>
      <Button variant="primary" onClick={navigate.toPoolsPage}>
        Trade Other Pools
      </Button>
    </NoPassDetectedBox>
  );
};

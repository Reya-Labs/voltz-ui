import { ProgressBar, TokenTypography, Typography } from 'brokoli-ui';
import React, { useMemo } from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { DetailsBox, ProgressBarBox, RowBox, RowsBox } from './MaturityDetails.styled';

export type MaturityDetailsProps = {
  maturityFormatted: PositionUI['maturityFormatted'];
  maturityEndTimestampInMS: PositionUI['maturityEndTimestampInMS'];
  maturityStartTimestampInMS: PositionUI['maturityStartTimestampInMS'];
};

export const MaturityDetails: React.FunctionComponent<MaturityDetailsProps> = ({
  maturityFormatted,
  maturityEndTimestampInMS,
  maturityStartTimestampInMS,
}) => {
  const percentageCompleted = useMemo((): number => {
    const totalSeparation = maturityEndTimestampInMS - maturityStartTimestampInMS;
    const separationFromStart = Date.now().valueOf() - maturityStartTimestampInMS;
    const percentage = (separationFromStart * 100) / totalSeparation;

    return Math.floor(percentage);
  }, [maturityStartTimestampInMS, maturityEndTimestampInMS]);
  const daysRemaining = Math.ceil((maturityEndTimestampInMS - Date.now()) / (1000 * 60 * 60 * 24));
  return (
    <DetailsBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallBold">
        Maturity
      </Typography>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        Time until the pool expires. Trading will stop 1 hour before maturity and once new pools are
        deployed trading will resume.
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Expiry
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
            {maturityFormatted}
          </Typography>
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Days Remaining
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
            {daysRemaining}
          </Typography>
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Progress
          </Typography>
          <ProgressBarBox>
            <ProgressBar percentageComplete={percentageCompleted} />
            <TokenTypography
              colorToken="lavenderWeb"
              token="%"
              typographyToken="primaryBodySmallRegular"
              value={percentageCompleted}
            />
          </ProgressBarBox>
        </RowBox>
      </RowsBox>
    </DetailsBox>
  );
};

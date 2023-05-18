import { CloseButton, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { Pagination } from '../../../components/Pagination';
import { ReactComponent as Slide1Svg } from './assets/slide_1.svg';
import { ReactComponent as Slide2Svg } from './assets/slide_2.svg';
import { ReactComponent as Slide3Svg } from './assets/slide_3.svg';
import {
  LearnMoreAboutVoyageBox,
  PaginationBox,
  StepBox,
  TextBox,
  TitleBox,
} from './LearnMoreAboutVoyage.styled';

type LearnMoreAboutVoyageProps = {
  onCloseButtonClick: () => void;
};
const MAX_STEPS = 3;
const STEP_COMPONENT_MAP: Record<0 | 1 | 2, React.FunctionComponent> = {
  0: Slide1Svg,
  1: Slide2Svg,
  2: Slide3Svg,
};
const STEP_TITLE_MAP: Record<0 | 1 | 2, string> = {
  0: 'Wait, what is a Voyage?',
  1: 'Explain more about this current Voyage.',
  2: 'How long will it last? How do I know if I’ve met the criteria?',
};
const STEP_DESCRIPTION_MAP: Record<0 | 1 | 2, string> = {
  0: 'Voyages can start at any time and will last for a number of weeks. They provide you with an opportunity to earn unique badges that have a number of unique benefits.',
  1: 'The first ever Voyage gives you the chance to gain early access to Voltz v2. If you meet the criteria required to earn the badge(s), you’ll become part of a unique set of users who will kick-start the exclusive voyager program and help us build out Voltz v2 as a v2 OG.',
  2: 'This initial voyage will span over four weeks. On a weekly basis, the badge winners will be revealed in the “BIG REVEAL”. At that point, if you’ve met the criteria of the badge, you’ll see these unique SBTs on your "Profile" page',
};

export const LearnMoreAboutVoyage: React.FunctionComponent<LearnMoreAboutVoyageProps> = ({
  onCloseButtonClick,
}) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const onNextPage = () => setStep(((step + 1) % MAX_STEPS) as 0 | 1 | 2);
  const onPrevPage = () => setStep(((step - 1) % MAX_STEPS) as 0 | 1 | 2);
  const Step = STEP_COMPONENT_MAP[step];
  return (
    <LearnMoreAboutVoyageBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Voltz v2 Voyage
        </Typography>
        <CloseButton onClick={onCloseButtonClick} />
      </TitleBox>
      <StepBox>
        <Step />
      </StepBox>
      <TextBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
          {STEP_TITLE_MAP[step]}
        </Typography>
        <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
          {STEP_DESCRIPTION_MAP[step]}
        </Typography>
      </TextBox>
      <PaginationBox>
        <Pagination
          maxPages={3}
          page={step}
          onNextPageClick={onNextPage}
          onPreviousPageClick={onPrevPage}
        />
      </PaginationBox>
    </LearnMoreAboutVoyageBox>
  );
};

import React from 'react';

import { Page } from '../../components/Page';
import { Profile } from './Profile';

export const ProfilePage: React.FunctionComponent = () => {
  return <Page mainSlot={<Profile />} />;
};

import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { Profile } from './Profile';

export const ProfilePage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<Profile />} />;
};

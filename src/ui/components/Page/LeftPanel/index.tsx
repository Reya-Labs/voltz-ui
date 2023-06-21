import React from 'react';

import { LeftPanelWithoutSubmenu } from './LeftPanelWithoutSubmenu';
import { LeftPanelWithSubmenu } from './LeftPanelWithSubmenu';

type LeftPanelProps = {
  submenu?: React.ReactNode;
};

export const LeftPanel: React.FunctionComponent<LeftPanelProps> = ({ submenu }) => {
  if (submenu) {
    return <LeftPanelWithSubmenu submenu={submenu} />;
  }
  return <LeftPanelWithoutSubmenu />;
};

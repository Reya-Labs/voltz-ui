import React from 'react';

import { Panel, Typography } from '../../atomic';

export type PanelAlertProps = {
  type: 'error' | 'warning' | 'info';
  title?: string;
  message: string;
};

const PanelAlert: React.FunctionComponent<PanelAlertProps> = ({ type, title, message }) => {
  const renderTitle = () => {
    if (title) {
      return title;
    }

    switch (type) {
      case 'error':
        return 'ERROR';

      case 'warning':
        return 'DANGER';

      case 'info':
        return 'INFORMATION';

      default:
        return null;
    }
  };

  return (
    <Panel type={type}>
      <Typography variant="h5">{renderTitle()}</Typography>
      <Typography variant="body1">{message}</Typography>
    </Panel>
  );
};

export default PanelAlert;

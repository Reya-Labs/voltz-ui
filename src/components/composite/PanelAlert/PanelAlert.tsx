import React from 'react';

import { Panel, Typography } from '../../atomic';

export type PanelAlertProps = {
  variant: 'error' | 'warning' | 'info';
  title?: string;
  message: string;
};

const PanelAlert: React.FunctionComponent<PanelAlertProps> = ({ variant, title, message }) => {
  const renderTitle = () => {
    if (title) {
      return title;
    }

    switch (variant) {
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
    <Panel variant={variant}>
      <Typography variant="h5">{renderTitle()}</Typography>
      <Typography variant="body1">{message}</Typography>
    </Panel>
  );
};

export default PanelAlert;

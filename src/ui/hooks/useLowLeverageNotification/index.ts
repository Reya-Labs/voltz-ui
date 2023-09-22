import { showNotification } from 'brokoli-ui';
import { useEffect, useState } from 'react';

export const useLowLeverageNotification = ({
  showLowLeverageNotification,
}: {
  showLowLeverageNotification: boolean;
}) => {
  const [notificationRead, setNotificationRead] = useState(false);
  useEffect(() => {
    if (!notificationRead && showLowLeverageNotification) {
      showNotification({
        title: 'Reminder',
        content:
          'If you take small amounts of leverage when providing liquidity, whilst your risk is lower, your payoff is likely to be low.',
        colorToken: 'orangeYellow',
        autoClose: 5000,
      });
      setNotificationRead(true);
    }
  }, [notificationRead, showLowLeverageNotification]);
};

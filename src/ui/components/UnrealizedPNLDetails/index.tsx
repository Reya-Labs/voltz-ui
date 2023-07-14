import React from 'react';

import { TooltipBox } from './UnrealizedPnlDetails.styled';

export const UnrealizedPNLDetails: React.FunctionComponent = React.memo(() => (
  <TooltipBox>
    The additional PnL you’d generate should you close your position now.
    <br />
    <br />
    To close your position you must enter an opposite sided swap, meaning your uPnL is generated
    from any difference in the fixed rate from when you entered to when you exit.
  </TooltipBox>
));

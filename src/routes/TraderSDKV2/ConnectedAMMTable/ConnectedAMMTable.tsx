import React from 'react';

import AMMTable from '../AMMTable/AMMTable';
import { Protocol } from '@voltz-protocol/v2-sdk';

export type ConnectedAMMTableProps = {
  protocol: Protocol;
};

const ConnectedAMMTable: React.FunctionComponent<ConnectedAMMTableProps> = ({ protocol }) => {
  return <AMMTable amms={protocol.allPools} />;
};

export default ConnectedAMMTable;

import { Agents } from '@contexts';
import { useMellowLPVaults, useWallet } from '@hooks';
import { Box } from '@mui/system';
import { AugmentedMellowLpVault } from '@utilities';
import { isNull } from 'lodash';
import { useEffect, useState } from 'react';
import { Panel } from '../../atomic';
import MellowLPTable from '../../interface/MellowLPTable/MellowLPTable';
import EcosystemHeader from '../../../components/interface/EcosystemHeader/EcosystemHeader';

export type ConnectedMellowLPTableProps = {
  onSelectItem: (item: AugmentedMellowLpVault) => void;
  agent: Agents;
};

const ConnectedMellowLPTable: React.FunctionComponent<ConnectedMellowLPTableProps> = ({
  onSelectItem,
}) => {
  const { lpVaults } = useMellowLPVaults();

  const { signer } = useWallet();
  const isSignerAvailable = !isNull(signer);

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [vaultsLoaded, setVaultsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (lpVaults) {
      setVaultsLoaded(false);
      setDataLoading(true);
      const request = Promise.allSettled(lpVaults.map((item) => item.vaultInit()));

      void request.then(
        (_) => {
          setVaultsLoaded(true);
          setDataLoading(false);
        },
        (_) => {
          setDataLoading(false);
        },
      );
    }
  }, [lpVaults]);

  useEffect(() => {
    if (lpVaults && isSignerAvailable && vaultsLoaded) {
      setDataLoading(true);

      const request = Promise.allSettled(lpVaults.map((item) => item.userInit(signer)));

      void request.then(
        (_) => {
          setDataLoading(false);
        },
        (_) => {
          setDataLoading(false);
        },
      );
    }
  }, [lpVaults, isSignerAvailable, vaultsLoaded]);

  const renderContent = () => {
    return (
      <Panel
        variant="dark"
        sx={{
          padding: 0,
          width: '100%',
          maxWidth: '988px',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <EcosystemHeader
          lpOptimizerTag={`LP OPTIMISER`}
          lpOptimizerCount={lpVaults ? lpVaults.length : 0}
          alphaVaultTag={`ALPHA VAULT`}
          alphaVaultCount={0}
        />
        {lpVaults && (
          <Box sx={{ marginTop: '32px' }}>
            <MellowLPTable lpVaults={lpVaults} onSelectItem={onSelectItem} disabled={dataLoading} />
          </Box>
        )}
      </Panel>
    );
  };

  return renderContent();
};

export default ConnectedMellowLPTable;

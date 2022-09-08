import { Page } from '@components/interface';
import Box from '@mui/material/Box';
import { Agents } from '@contexts';

import ConnectedMellowLPTable from '../../components/containers/ConnectedMellowLPTable/ConnectedMellowLPTable';

const Ecosystem: React.FunctionComponent = () => {

    return (
        <Page>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', backdropFilter: "blur(8px)" }}>
            <ConnectedMellowLPTable agent={Agents.LIQUIDITY_PROVIDER}/>
          </Box>
        </Page>
    )
}

export default Ecosystem;
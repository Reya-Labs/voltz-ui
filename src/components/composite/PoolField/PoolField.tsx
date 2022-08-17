import { Agents } from '@contexts';
import Box from '@mui/material/Box';
import { ProgressBar } from '@components/composite';
import CustomPoolField from './CustomPoolField';
import { isNumber } from 'lodash';
import { Typography } from '@components/atomic';

export type PoolFieldProps = {
    agent: Agents;
    protocol: string;
    isBorrowing: boolean;
    capLoading: boolean;
    cap: number | void | null;
}

const PoolField = ({agent, protocol, isBorrowing, capLoading, cap}: PoolFieldProps) => {
    const getPoolLabel = () => (
        <>
          <Box component='span' sx={{ color: '#9B97AD' }}>
          POOL
          </Box>
          {(isBorrowing) && (
            <Box component='span' sx={{ color: '#FF4AA9' }}>
              {'  '}
              <strong>BORROWING</strong>
            </Box>
          )}
        </>
      );

      if (agent === Agents.LIQUIDITY_PROVIDER) {
        if (capLoading) {
          return (
            <CustomPoolField label={getPoolLabel()}>
              <ProgressBar
                  leftContent={protocol}
                  rightContent={"Loading..."}
                  percentageComplete={0}
                />
            </CustomPoolField>
          );
        }

        if (!isNumber(cap)) {
          return (
            <CustomPoolField label={getPoolLabel()}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{protocol}</Typography>
                </Box>
              </Box>
            </CustomPoolField>);
        }

        return (
          <CustomPoolField label={getPoolLabel()}>
            <ProgressBar
              leftContent={protocol}
              rightContent={<>{cap.toFixed(2)}% CAP</>}
              percentageComplete={cap}
            />
          </CustomPoolField>
        );
      }
      else {
        return (
          <CustomPoolField label={getPoolLabel()}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{protocol}</Typography>
              </Box>
            </Box>
          </CustomPoolField>);
      }
}

export default PoolField;
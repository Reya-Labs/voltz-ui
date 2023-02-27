import Box from '@mui/material/Box';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { Button } from '../../../../../../components/atomic/Button/Button';
import {
  getPositionBadgeVariant,
  PositionBadge,
} from '../../../../../../components/atomic/PositionBadge/PositionBadge';
import {
  getHealthTextColor,
  HealthFactorText,
} from '../../../../../../components/composite/HealthFactorText/HealthFactorText';
import { SystemStyleObject, Theme } from '../../../../../../theme';
import { BulletLabel } from './BulletLabel/BulletLabel';
import { ReactComponent as EditIcon } from './editPosition.svg';

export type PositionTableHeadProps = {
  poolTraderWithdrawable: boolean;
  isSettled: boolean;
  positionType: number;
  onRollover: () => void;
  onSettle: () => void;
  rolloverAvailable: boolean;
  gaButtonId: string;
  onSelect?: (mode: 'margin' | 'liquidity' | 'notional') => void;
  beforeMaturity?: boolean;
  healthFactor?: number;
  isBothTraderAndLP: boolean;
};

const containerStyles: SystemStyleObject<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: (theme) => `${theme.spacing(4)} 0`,
};

export const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({
  poolTraderWithdrawable,
  isSettled,
  positionType,
  onRollover,
  onSettle,
  rolloverAvailable,
  gaButtonId,
  onSelect,
  beforeMaturity,
  healthFactor,
  isBothTraderAndLP,
}) => {
  const handleEditNotional = () => {
    onSelect && onSelect('notional');
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex' }}>
        <PositionBadge
          isBothTraderAndLP={isBothTraderAndLP}
          variant={getPositionBadgeVariant(positionType)}
        />
      </Box>

      <Box sx={{ display: 'flex' }}>
        {beforeMaturity && !isUndefined(healthFactor) && (
          <Box
            sx={{
              padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
              marginLeft: (theme) => theme.spacing(2),
              display: 'flex',
            }}
          >
            <BulletLabel
              sx={{
                color: getHealthTextColor(healthFactor),
                alignItems: 'center',
                marginRight: '8px',
                fontSize: '14px',
              }}
              text={<HealthFactorText healthFactor={healthFactor} />}
            />
            {onSelect && (
              <Button
                id={gaButtonId}
                size="vs"
                sx={{ display: 'flex', padding: '4px 8px', fontSize: '14px' }}
                variant="darker"
                onClick={handleEditNotional}
              >
                <Box sx={{ marginRight: '4px' }}>Edit </Box>
                <EditIcon />
              </Button>
            )}
          </Box>
        )}

        {beforeMaturity === false && !isSettled && poolTraderWithdrawable && (
          <>
            <Button
              id={gaButtonId}
              size="xs"
              variant={positionType === 1 ? 'darker-link' : 'darker'}
              onClick={onSettle}
            >
              Settle
            </Button>
            {rolloverAvailable && (
              <Button
                id={gaButtonId}
                size="xs"
                sx={{ marginLeft: (theme) => theme.spacing(4) }}
                variant={
                  positionType === 1 ? 'rollover1' : positionType === 2 ? 'rollover2' : 'rollover3'
                }
                onClick={onRollover}
              >
                Rollover
              </Button>
            )}
          </>
        )}

        {beforeMaturity === false && isSettled && (
          <Button size="xs" variant={positionType === 1 ? 'darker-link' : 'darker'} disabled>
            Settled
          </Button>
        )}
      </Box>
    </Box>
  );
};
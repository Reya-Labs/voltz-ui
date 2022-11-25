import { useEffect, useRef, useState } from 'react';

import { Typography } from '@components/atomic';
import { IconLabel, MaskedIntegerField } from '@components/composite';
import Box from '@mui/material/Box';
import { colors } from '../../../../../theme';
import {
  DataLayerEventPayload,
  formatNumber,
  getAmmProtocol,
  notFormatted,
  pushEvent,
  stringToBigFloat,
  toUSFormat,
} from '../../../../../utilities';
import isUndefined from 'lodash/isUndefined';
import { useAgent, useWallet } from '../../../../../hooks';
import { useAMMContext } from '../../../../../contexts';

interface ExpectedAPYProps {
  expectedApy?: number;
  expectedCashflow?: number;
  userSimulatedVariableApy?: number;
  onChangeUserSimulatedVariableApy: (value: number, resetToDefault?: boolean) => void;
  userSimulatedVariableApyUpdated: boolean;
}

export const ExpectedAPY = ({
  expectedApy,
  expectedCashflow,
  userSimulatedVariableApy,
  onChangeUserSimulatedVariableApy,
  userSimulatedVariableApyUpdated,
}: ExpectedAPYProps) => {
  const delay = 1000;
  const { agent } = useAgent();
  const { amm } = useAMMContext();
  const { account } = useWallet();

  const [userInput, setUserInput] = useState(
    !isUndefined(userSimulatedVariableApy)
      ? formatNumber(userSimulatedVariableApy, 0, 2)
      : undefined,
  );
  const timer = useRef<number>();

  useEffect(() => {
    const formatted = !isUndefined(userSimulatedVariableApy)
      ? formatNumber(userSimulatedVariableApy, 0, 2)
      : undefined;
    setUserInput(formatted);
  }, [userSimulatedVariableApy, userSimulatedVariableApyUpdated]);

  useEffect(() => {
    const usFormatted = toUSFormat(userInput);
    const newValue = usFormatted ? stringToBigFloat(usFormatted) : NaN;
    if (!isNaN(newValue)) {
      const payload: DataLayerEventPayload = {
        event: 'expectedApy_change',
        eventValue: newValue,
        pool: getAmmProtocol(amm),
        agent: agent,
      };
      pushEvent(account ?? '', payload);
    }
  }, [stringToBigFloat(toUSFormat(userInput) ?? '0')]);

  const handleChangeInput = (inputVal: string | undefined) => {
    if (inputVal) {
      const usFormatted = toUSFormat(inputVal);
      const newValue = usFormatted ? stringToBigFloat(usFormatted) : NaN;
      if (!isNaN(newValue)) {
        setUserInput(inputVal);
        window.clearInterval(timer.current);
        timer.current = window.setTimeout(() => {
          onChangeUserSimulatedVariableApy(newValue);
        }, delay);
      }
    } else {
      setUserInput('');
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChangeUserSimulatedVariableApy(0, true), delay * 2);
    }
  };

  const formatExpectedApy = (value: number | undefined) => {
    if (value) {
      if (value > 1000) {
        return '>1,000%';
      }
      if (value < -1000) {
        return '<-1,000%';
      }
      return formatNumber(value, 0, 2) + '%';
    }
    return '---';
  };

  const formatCashflow = (value: number | undefined) => {
    if (value) {
      if (Math.abs(value) >= 1000000000 - 0.5) {
        return formatNumber(value / 1000000000, 0, 3) + 'bn';
      }
      if (Math.abs(value) >= 1000000 - 0.5) {
        return formatNumber(value, 0, 0);
      }
      if (Math.abs(value) >= 100000 - 0.5) {
        return formatNumber(value, 0, 2);
      }
      return formatNumber(value, 0, 4);
    }

    return '---';
  };

  return (
    <>
      <Box sx={{ marginBottom: (theme) => theme.spacing(4) }}>
        <Typography
          label={<Typography variant="h4">P&L Calculator</Typography>}
          variant="body1"
          sx={{ color: colors.lavenderWeb.darken020, fontSize: '14px' }}
        >
          Use the P&L Calculator to compute your expected cash flow, and implied APY, for a range of
          simulated market conditions. To begin, adjust the variable rate to see how your expected
          returns vary.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: '8px',
          background: colors.lavenderWeb.darken045,
          maxWidth: '340px',
          width: '340px',
        }}
      >
        <Box
          sx={{
            padding: (theme) => theme.spacing(4),
            marginRight: (theme) => theme.spacing(16),
            maxWidth: '80px',
            width: '80px',
            marginTop: '4px',
          }}
        >
          <MaskedIntegerField
            allowDecimals
            dynamic
            inputSize="small"
            label={
              <IconLabel
                label={'Expected Variable APY'}
                icon="information-circle"
                info="Select the variable APY you wish to simulate. This calculation will assume the variable rate [immediately] moves to your selected rate and then stays there until maturity."
              />
            }
            onChange={handleChangeInput}
            suffix="%"
            suffixPadding={0}
            value={notFormatted(userInput)}
          />
        </Box>
        <Box
          sx={{
            padding: (theme) => theme.spacing(4),
            maxWidth: '100px',
            width: '100px',
          }}
        >
          <Typography
            variant="body2"
            fontSize={24}
            label={
              <IconLabel
                label="Expected Casfhlow"
                icon="information-circle"
                info=" The cashflow you would generate based on your position and simulated Variable APY. "
              />
            }
            sx={{
              marginTop: '-4px',
            }}
          >
            {formatCashflow(expectedCashflow)}
          </Typography>
          <Typography
            variant="body2"
            fontSize={12}
            sx={{
              color: colors.lavenderWeb.darken010,
            }}
          >
            {'APY: ' + formatExpectedApy(expectedApy)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

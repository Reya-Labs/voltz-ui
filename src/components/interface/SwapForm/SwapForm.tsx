import React, { ReactNode } from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';
import { MintBurnFormMarginAction, SwapFormState, useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import { Button, Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  NotionalAmount,
  MarginAmount,
} from '@components/composite';
import { TraderControls, MarginControls, SwapInfo } from './components';
import { useTokenApproval } from '@hooks';

export type SwapFormProps = {
  endDate?: DateTime;
  errors: Record<string, string>;
  formState: SwapFormState;
  maxMargin?: number;
  isEditingMargin?: boolean;
  isFormValid: boolean;
  onCancel: () => void;
  onChangeMargin: (value: number) => void;
  onChangeMarginAction: (value: MintBurnFormMarginAction) => void;
  onChangeNotional: (value: number) => void;
  onChangePartialCollateralization: (value: boolean) => void;
  onSubmit: () => void;
  protocol?: string;
  startDate?: DateTime;
  submitButtonText: ReactNode;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  underlyingTokenName?: string;
};

const SwapForm: React.FunctionComponent<SwapFormProps> = ({
  endDate,
  errors,
  formState,
  maxMargin,
  isEditingMargin,
  isFormValid,
  onCancel,
  onChangeMargin,
  onChangeMarginAction,
  onChangeNotional,
  onChangePartialCollateralization,
  onSubmit,
  protocol,
  startDate,
  submitButtonText,
  tokenApprovals,
  underlyingTokenName,
}) => {
  const { agent, onChangeAgent } = useAgent();
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6)
  }

  return (
    <Panel
      variant="dark"
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: () => agent === Agents.FIXED_TRADER 
          ? '0px 0px 88px rgba(0, 131, 155, 0.2)' 
          : '0px 0px 88px rgba(38, 103, 255, 0.20)',
      }}
    >
      <ProtocolInformation protocol={protocol}/>

      <Box sx={bottomSpacing}>
        <MaturityInformation
          label={
            <IconLabel
              label="maturity"
              icon="information-circle"
              info="The proportion between the time elapsed since the initiation of the pool and the entire duration."
              removeIcon
            />
          }
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
 
      {isEditingMargin && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <MarginControls 
            value={formState.marginAction}
            onChange={onChangeMarginAction}
          />
        </Box>
      )}  

      {!isEditingMargin && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <TraderControls
            agent={agent}
            partialCollateralization={formState.partialCollateralization}
            onChangeAgent={onChangeAgent}
            onChangePartialCollateralization={onChangePartialCollateralization}
          />
        </Box>
      )}

      {!isEditingMargin && (
        <Box sx={bottomSpacing}>
          <NotionalAmount
            error={errors['notional']}
            label="notional amount"
            info="Choose the notional you wish to trade. The notional amount is the total size of your trade."
            protocol={protocol}
            notional={formState.notional}
            onChangeNotional={onChangeNotional}
          />
        </Box>
      )}

      {formState.partialCollateralization && (
        <Box sx={bottomSpacing}>
          <MarginAmount
            error={errors['margin']}
            protocol={protocol}
            maxMargin={maxMargin}
            margin={formState.margin}
            isAdditional={formState.marginAction === MintBurnFormMarginAction.ADD}
            onChangeMargin={onChangeMargin}
          />
        </Box>
      )}

      <Box sx={bottomSpacing}>
        <SwapInfo notional={formState.notional} underlyingTokenName={underlyingTokenName} />
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Button 
          disabled={!isFormValid || tokenApprovals.checkingApprovals || tokenApprovals.approving} 
          onClick={onSubmit} 
          size="large" 
          sx={{ flexGrow: 1 }}
        >
          {submitButtonText}
        </Button>

        <Button
          sx={{ marginLeft: (theme) => theme.spacing(7), flexGrow: 0 }}
          variant="dark"
          onClick={onCancel}
        >
          Back
        </Button>
      </Box>
  
    </Panel>
  );
};

export default SwapForm;

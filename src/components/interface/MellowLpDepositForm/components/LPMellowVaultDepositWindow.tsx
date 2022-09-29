import { FormPanel } from '@components/interface';
import { IconLabel, InputTokenLabel, MaskedIntegerField } from '@components/composite';
import { Box } from '@mui/system';
import { Panel, Typography } from "src/components/atomic";
import { AugmentedMellowLpVault, formatCurrency, toUSFormat } from '@utilities';
import { Button } from '@components/atomic';
import { colors } from '@theme';
import { ReactNode } from 'react';
import { isUndefined } from 'lodash';

export type LPMellowVaultDepositWindowProps = {
    lpVault: AugmentedMellowLpVault;
    onChangeDeposit: (value: number | undefined) => void;
    submitText: string;
    hintText: ReactNode;
    onSubmit: () => void;
    disabled: boolean;
};

const LPMellowVaultDepositWindow: React.FunctionComponent<LPMellowVaultDepositWindowProps> = ({ lpVault, onChangeDeposit, submitText, hintText, disabled, onSubmit }: LPMellowVaultDepositWindowProps) => {

    const subtext = `WALLET BALANCE: ${isUndefined(lpVault.userWalletBalance) ? "---" : `${formatCurrency(lpVault.userWalletBalance, true)} ${lpVault.tokenName}`}`;

    const handleChange = (newValue: string | undefined) => {
        const usFormatted = toUSFormat(newValue);
        onChangeDeposit(!isUndefined(usFormatted) ? parseFloat(usFormatted) : undefined);
    };
    
    const renderContent = () => {
        return (
            <FormPanel sx={{ width: '100%', maxWidth: '328px', background: "#19152A", padding: "16px 16px" }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ borderBottom: '1px solid #E5E1F9' }}>
                        <Typography variant='h1' sx={{ fontSize: '24px', lineHeight: '1.2', color: '#E5E1F9', fontWeight: '700', marginLeft: "0px" }}>
                            DEPOSIT
                        </Typography>
                    </Box>

                    <Box sx={{ borderBottom: '1px solid #2A2444', marginLeft: "16px" }}>
                        <Typography variant='h1' sx={{ fontSize: '24px', lineHeight: '1.2', color: '#2A2444', fontWeight: '700', marginLeft: "0px" }}>
                            WITHDRAW
                        </Typography>
                    </Box>
                </Box>

                <Typography variant='body1' sx={{ fontSize: '16px', lineHeight: '1.6', color: '#E5E1F9', marginTop: "8px", fontWeight: '400' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat ut proin porttitor sit lorem.
                </Typography>

                <Box sx={{marginTop: "16px"}}>
                    <MaskedIntegerField
                        allowDecimals
                        allowNegativeValue={false}
                        suffix={<InputTokenLabel tokenName={lpVault.tokenName} />}
                        suffixPadding={90}
                        label={<IconLabel label={"AMOUNT"} icon="information-circle" info={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat ut proin porttitor sit lorem."} />}
                        defaultValue={0}
                        onChange={handleChange}
                        subtext={subtext}
                        subtextSize={12}
                    />
                </Box>


                <Box sx={{ display: 'flex', marginTop: "16px" }}>
                    <Button 
                        disabled={disabled} 
                        onClick={onSubmit} 
                        size="large" 
                        sx={{ flexGrow: 1, backgroundColor: '#00556D',
                        color: '#4DE5FF',
                        '&:hover': {
                          backgroundColor: '#00556D',
                          borderColor: '#4DE5FF',
                          boxShadow: '0px 4px 20px 0px #4de5ff33',
                        } }}
                    >
                        {submitText}
                    </Button>
                </Box>

                <Typography variant='body2' sx={{ 
                    marginTop: (theme) => theme.spacing(2), 
                    color: colors.lavenderWeb.darken015,
                    fontSize: '12px'
                }}>
                    {hintText}
                </Typography>

                <Panel sx={{ width: '100%', maxWidth: '296px', background: "#28233B", padding: "16px 16px", marginTop: "16px" }}>
                    <Typography variant='h1' sx={{ fontSize: '14px', lineHeight: '1.4', color: '#C6C2DA', fontWeight: '700', marginLeft: "0px" }}>
                        ABOUT YOUR FUNDS
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '12px', color: '#9B97AD', marginTop: "10px", fontWeight: '400' }}>
                        There is one small nuance though, being 10x levered when there is one year until maturity of the AMM is very different from 10x leverage when there are a few days left until the maturity of the AMM. Need to properly signal this in the UX
                    </Typography>

                </Panel>
            </FormPanel>
        );
    }

    return renderContent();
}

export default LPMellowVaultDepositWindow;
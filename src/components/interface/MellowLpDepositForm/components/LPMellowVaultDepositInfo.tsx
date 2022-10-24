import { Box } from "@mui/material";
import { PoolField, ProgressBar } from "src/components/composite";
import { Agents } from "@contexts";
import { Panel, Typography } from "src/components/atomic";
import { IconLabel } from '@components/composite';
import { AugmentedMellowLpVault, formatCurrency } from "@utilities";
import { isUndefined } from "lodash";

export type LPMellowVaultDepositInfoProps = {
    lpVault: AugmentedMellowLpVault;
}
const LPMellowVaulDepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({ lpVault }: LPMellowVaultDepositInfoProps) => {

    const getCapBar = () => {
        if (isUndefined(lpVault.vaultCap) || isUndefined(lpVault.vaultAccumulative)) {
            return null;
        }

        const percentage = Math.floor(lpVault.vaultCap * 100 + 0.5) / 100;

        return (<Box sx={{ marginTop: "16px" }}>
            <Typography variant='h6' sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }}>
                DEPOSITS
            </Typography>
            <ProgressBar
                isMaturity={true}
                leftContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {lpVault.tokenName}
                    </Typography>)
                }
                middleContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {formatCurrency(lpVault.vaultAccumulative, true)}
                    </Typography>)
                }
                rightContent={
                    (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                        {percentage.toString() + "%"}
                    </Typography>)
                }
                percentageComplete={percentage}
            />
        </Box>);
    }

    const renderContent = () => {

        return (
            <Panel variant='dark' sx={{ width: '100%', maxWidth: '366px', background: 'transparent' }}>
                <PoolField agent={Agents.LIQUIDITY_PROVIDER} protocol={"aUSDC"} isBorrowing={false} capLoading={false} cap={null} isBorrowTable={true} />

                <Box sx={{ marginTop: "16px", display: "flex" }}>
                    <Typography
                        variant='body2'
                        sx={{ fontSize: '24px', color: '#FF4AA9', fontFamily: 'DM Sans', fontWeight: '700' }}
                        label={<IconLabel label="Expected APY" icon="information-circle" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere." />}
                    >
                        {isUndefined(lpVault.vaultExpectedApy) ? "---" : `${lpVault.vaultExpectedApy.toFixed(2)}%`}
                    </Typography>

                    <Typography
                        variant='body2'
                        sx={{ fontSize: '16px', color: '#E5E1F9', fontFamily: 'DM Sans', fontWeight: '700', marginTop: "8px" }}
                        label={<IconLabel label="Running until" icon="information-circle" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere." />}
                    >
                        {isUndefined(lpVault.maturity) ? "---" : lpVault.maturity}
                    </Typography>
                </Box>

                {getCapBar()}

                <Box sx={{ display: "flex", borderRadius: "4px", padding: "8px 16px", border: "1px solid #1E1933", background: "#1E1933", marginTop: "16px" }}>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#8B879D" }}>
                        YOUR POSITION:
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#4DE5FF", paddingLeft: "8px" }}>
                        {isUndefined(lpVault.userDeposit) ? "---" : `${formatCurrency(lpVault.userDeposit, true)} ${lpVault.tokenName}`}
                    </Typography>
                </Box>

                {/* <Box sx={{ display: "flex", borderRadius: "4px", padding: "8px 16px", border: "1px solid #1E1933", background: "#1E1933", marginTop: "16px" }}>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#8B879D" }}>
                        EXPECTED CASHFLOW:
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#4DE5FF", paddingLeft: "8px" }}>
                        {isUndefined(lpVault.userExpectedCashflow) ? "---" : `${formatCurrency(lpVault.userExpectedCashflow, true)} ${lpVault.tokenName}`}
                    </Typography>
                </Box> */}

                <Typography variant='body1' sx={{ fontSize: "14px", color: "#9B97AD", marginTop: "8px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
                </Typography>
            </Panel>
        );
    }

    return renderContent();
}

export default LPMellowVaulDepositInfo;
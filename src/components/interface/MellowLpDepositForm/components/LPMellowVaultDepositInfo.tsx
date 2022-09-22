import { Box } from "@mui/material";
import { PoolField, ProgressBar } from "src/components/composite";
import { Agents } from "@contexts";
import { Panel, Typography } from "src/components/atomic";
import { IconLabel } from '@components/composite';
import { formatCurrency } from "@utilities";
import { FormPanel } from '@components/interface';

export type LPMellowVaultDepositInfoProps = {
    vaultExpectedApy: string,
    token: string,
    accumulative: number,
    cap: number,
    currentDeposit: number,
    expectedCashflow: number,
    vaultMaturity: string,
}
const LPMellowVaulDepositInfo: React.FunctionComponent<LPMellowVaultDepositInfoProps> = ({ vaultExpectedApy, token, accumulative, cap, currentDeposit, expectedCashflow, vaultMaturity }: LPMellowVaultDepositInfoProps) => {

    const percentage = Math.floor(accumulative * 100 / cap + 0.5);

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
                        {vaultExpectedApy}
                    </Typography>

                    <Typography
                        variant='body2'
                        sx={{ fontSize: '16px', color: '#E5E1F9', fontFamily: 'DM Sans', fontWeight: '700', marginTop: "8px" }}
                        label={<IconLabel label="Running until" icon="information-circle" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere." />}
                    >
                        {vaultMaturity}
                    </Typography>
                </Box>

                <Box sx={{ marginTop: "16px" }}>
                    <Typography variant='h6' sx={{ fontSize: '12px', color: '#9B97AD', marginLeft: '0px' }}>
                        DEPOSITS
                    </Typography>
                    <ProgressBar
                        isMaturity={true}
                        leftContent={
                            (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                                {token}
                            </Typography>)
                        }
                        middleContent={
                            (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                                {'$'}{formatCurrency(accumulative, true)}
                            </Typography>)
                        }
                        rightContent={
                            (<Typography variant="h6" color="#E5E1F9" marginLeft="0px">
                                {percentage.toString() + "%"}
                            </Typography>)
                        }
                        percentageComplete={percentage}
                    />
                </Box>

                <Box sx={{ display: "flex", borderRadius: "4px", padding: "8px 16px", border: "1px solid #1E1933", background: "#1E1933", marginTop: "16px"}}>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#8B879D" }}>
                        YOUR POSITION:
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#4DE5FF", paddingLeft: "8px" }}>
                        s00n
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", borderRadius: "4px", padding: "8px 16px", border: "1px solid #1E1933", background: "#1E1933", marginTop: "16px"}}>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#8B879D" }}>
                        EXPECTED CASHFLOW:
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: "14px", color: "#4DE5FF", paddingLeft: "8px" }}>
                        s00n
                    </Typography>
                </Box>

                <Typography variant='body1' sx={{fontSize: "14px", color: "#9B97AD", marginTop: "8px"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
                </Typography>
            </Panel>
        );
    }

    return renderContent();
}

export default LPMellowVaulDepositInfo;
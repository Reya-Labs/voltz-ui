import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { AutomaticRolloverToggleProps } from '../../../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { routes } from '../../../../../../routes/paths';
import { formatPOSIXTimestamp } from '../../../../../../utilities/date';
import { doNothing } from '../../../../../../utilities/doNothing';
import { compactFormat } from '../../../../../../utilities/number';
import { AutomaticRolloverToggle } from './AutomaticRolloverToggle';
import { MarketTokenInformation, MarketTokenInformationProps } from './MarketTokenInformation';
import {
  ActionsBox,
  CurrentBalanceBox,
  DepositButton,
  DistributionBox,
  HeaderBox,
  ManageButton,
  MaturityInfoBox,
  PoolsCountBox,
  StatusBox,
  VaultListItemBottomBox,
  VaultListItemBox,
  VaultListItemInfo,
  VaultListItemTopBox,
} from './VaultListItem.styled';

export type VaultListItemProps = {
  id: string;
  token: MarketTokenInformationProps['token'];
  totalBalance: number;
  gasCost: number;
  vaults: {
    maturityTimestampMS: number;
    isCompleted: boolean;
    canManageVaultPosition: boolean;
    poolsCount: number;
    currentBalance: number;
    distribution: number;
  }[];
  depositable: boolean;
  automaticRolloverState: AutomaticRolloverToggleProps['automaticRolloverState'];
  canRegisterUnregister: boolean;
  onChangeAutomaticRolloverStatePromise: (
    vaultId: string,
    automaticRolloverState: AutomaticRolloverToggleProps['automaticRolloverState'],
  ) => Promise<void>;
};
export const VaultListItem: React.FunctionComponent<VaultListItemProps> = ({
  vaults,
  totalBalance,
  token,
  depositable,
  id,
  gasCost,
  automaticRolloverState,
  canRegisterUnregister,
  onChangeAutomaticRolloverStatePromise = doNothing,
}) => {
  return (
    <VaultListItemBox>
      <VaultListItemTopBox>
        <MarketTokenInformation market={'Aave'} token={token} />
        <Typography colorToken="lavenderWeb" typographyToken="secondaryBodySmallRegular">
          {compactFormat(totalBalance).toUpperCase()}
          TODO: make it in usd
        </Typography>
        <ActionsBox>
          {depositable ? (
            <DepositButton
              colorToken="lavenderWeb"
              to={`/${generatePath(routes.LP_OPTIMISERS_DEPOSIT_FORM, {
                actions: 'deposit',
                vaultId: id,
              })}`}
              typographyToken="primaryBodyXSmallBold"
            >
              DEPOSIT
            </DepositButton>
          ) : null}
          <AutomaticRolloverToggle
            automaticRolloverState={automaticRolloverState}
            canRegisterUnregister={canRegisterUnregister}
            disabled={!depositable}
            gasCost={gasCost}
            showTooltip={false}
            triggersOnChainTransaction={true}
            onChangePromise={async (value) =>
              await onChangeAutomaticRolloverStatePromise(id, value)
            }
          />
        </ActionsBox>
      </VaultListItemTopBox>
      <VaultListItemBottomBox>
        <HeaderBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Maturity
          </Typography>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Distribution
          </Typography>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Current Balance
          </Typography>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Status
          </Typography>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Pools
          </Typography>
        </HeaderBox>
        {vaults.map(
          (
            {
              canManageVaultPosition,
              poolsCount,
              currentBalance,
              distribution,
              isCompleted,
              maturityTimestampMS,
            },
            vaultIndex,
          ) => {
            if (isCompleted && currentBalance <= 0) {
              // can't replace this with filter because it screws up vaultIndex
              return null;
            }

            return (
              <VaultListItemInfo key={maturityTimestampMS}>
                <MaturityInfoBox>
                  <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                    {formatPOSIXTimestamp(maturityTimestampMS)}
                    {isCompleted ? ' -' : ''}
                  </Typography>
                </MaturityInfoBox>
                <StatusBox>
                  <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                    {isCompleted ? 'Completed' : 'In progress'}
                  </Typography>
                </StatusBox>
                <DistributionBox>
                  <TokenTypography
                    colorToken="lavenderWeb"
                    token="%"
                    typographyToken="secondaryBodySmallRegular"
                    value={distribution}
                  />
                  {}
                </DistributionBox>
                <CurrentBalanceBox>
                  {compactFormat(currentBalance)}
                  TODO: USD
                </CurrentBalanceBox>
                <PoolsCountBox>{poolsCount}</PoolsCountBox>
                {isCompleted && canManageVaultPosition ? (
                  <ManageButton
                    colorToken="lavenderWeb"
                    to={`/${generatePath(routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM, {
                      actions: 'manage',
                      vaultId: id,
                      vaultIndex: vaultIndex.toString(),
                    })}`}
                    typographyToken="primaryBodyXSmallBold"
                  >
                    Manage
                  </ManageButton>
                ) : null}
              </VaultListItemInfo>
            );
          },
        )}
      </VaultListItemBottomBox>
    </VaultListItemBox>
  );
};

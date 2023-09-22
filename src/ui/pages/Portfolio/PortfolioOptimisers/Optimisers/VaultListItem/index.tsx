import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { routes } from '../../../../../../app/paths';
import { formatPOSIXTimestamp } from '../../../../../../utilities/date';
import { doNothing } from '../../../../../../utilities/doNothing';
import { compactFormatToParts } from '../../../../../../utilities/number';
import {
  AutomaticRolloverToggle,
  AutomaticRolloverToggleProps,
} from '../../../../../components/AutomaticRolloverToggle';
import { MarketTokenInformation, MarketTokenInformationProps } from './MarketTokenInformation';
import {
  AutomaticRolloverBox,
  BalanceBox,
  BottomBox,
  DepositButton,
  DistributionBox,
  HeaderBox,
  ListEntryLeftBox,
  ListEntryRightBox,
  ManageButton,
  MaturityBox,
  PoolsBox,
  StatusBox,
  TopBox,
  TopLeftBox,
  TopRightBox,
  TotalBalanceBox,
  VaultListItemBox,
  VaultListItemInfo,
  VaultsBox,
} from './VaultListItem.styled';

export type VaultListItemProps = {
  id: string;
  token: NonNullable<MarketTokenInformationProps['token']>;
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
  const totalBalanceCompactFormat = compactFormatToParts(totalBalance);

  return (
    <VaultListItemBox>
      <TopBox>
        <TopLeftBox>
          <MarketTokenInformation token={token} />
          {depositable ? (
            <DepositButton
              colorToken="lavenderWeb"
              to={`/${generatePath(routes.LP_OPTIMISERS_DEPOSIT_FORM, {
                actions: 'deposit',
                vaultId: id,
              })}`}
              typographyToken="primaryBodyXSmallBold"
            >
              Deposit
            </DepositButton>
          ) : null}
        </TopLeftBox>
        <TopRightBox>
          <TotalBalanceBox>
            <TokenTypography
              colorToken="lavenderWeb"
              prefixToken="$"
              token={totalBalanceCompactFormat.compactSuffix}
              typographyToken="secondaryBodySmallRegular"
              value={totalBalanceCompactFormat.compactNumber}
            />
          </TotalBalanceBox>
          <AutomaticRolloverBox>
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
          </AutomaticRolloverBox>
        </TopRightBox>
      </TopBox>
      <BottomBox>
        <HeaderBox>
          <ListEntryLeftBox>
            <MaturityBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Maturity
              </Typography>
            </MaturityBox>
            <StatusBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Status
              </Typography>
            </StatusBox>
          </ListEntryLeftBox>
          <ListEntryRightBox>
            <DistributionBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Distribution
              </Typography>
            </DistributionBox>
            <BalanceBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Balance
              </Typography>
            </BalanceBox>
            <PoolsBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Pools
              </Typography>
            </PoolsBox>
          </ListEntryRightBox>
        </HeaderBox>
        <VaultsBox>
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
                // can't replace this with filter because it messes up vaultIndex
                return null;
              }
              const currentBalanceCompactFormat = compactFormatToParts(currentBalance);

              return (
                <VaultListItemInfo key={maturityTimestampMS}>
                  <ListEntryLeftBox>
                    <MaturityBox>
                      <Typography
                        colorToken="lavenderWeb"
                        typographyToken="primaryBodyXSmallRegular"
                      >
                        {formatPOSIXTimestamp(maturityTimestampMS)}
                      </Typography>
                    </MaturityBox>
                    <StatusBox>
                      <Typography
                        colorToken={isCompleted ? 'skyBlueCrayola' : 'skyBlueCrayola3'}
                        typographyToken="primaryBodyXSmallRegular"
                      >
                        {isCompleted ? 'Completed' : 'In progress'}
                      </Typography>
                    </StatusBox>
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
                  </ListEntryLeftBox>
                  <ListEntryRightBox>
                    <DistributionBox>
                      <TokenTypography
                        colorToken="lavenderWeb"
                        token="%"
                        typographyToken="secondaryBodySmallRegular"
                        value={distribution}
                      />
                    </DistributionBox>
                    <BalanceBox>
                      <TokenTypography
                        colorToken="lavenderWeb"
                        prefixToken="$"
                        token={currentBalanceCompactFormat.compactSuffix}
                        typographyToken="secondaryBodySmallRegular"
                        value={currentBalanceCompactFormat.compactNumber}
                      />
                    </BalanceBox>
                    <PoolsBox>
                      <Typography
                        colorToken="lavenderWeb"
                        typographyToken="secondaryBodySmallRegular"
                      >
                        {poolsCount}
                      </Typography>
                    </PoolsBox>
                  </ListEntryRightBox>
                </VaultListItemInfo>
              );
            },
          )}
        </VaultsBox>
      </BottomBox>
    </VaultListItemBox>
  );
};

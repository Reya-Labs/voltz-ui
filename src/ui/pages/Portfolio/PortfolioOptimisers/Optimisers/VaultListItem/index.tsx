import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { AutomaticRolloverToggleProps } from '../../../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { routes } from '../../../../../../routes/paths';
import { formatPOSIXTimestamp } from '../../../../../../utilities/date';
import { doNothing } from '../../../../../../utilities/doNothing';
import { compactFormat, compactFormatToParts } from '../../../../../../utilities/number';
import { AutomaticRolloverToggle } from './AutomaticRolloverToggle';
import { MarketTokenInformation, MarketTokenInformationProps } from './MarketTokenInformation';
import {
  CurrentBalanceBox,
  DepositButton,
  DistributionBox,
  HeaderBox,
  HeaderLeftBox,
  HeaderRightBox,
  ManageButton,
  MaturityBox,
  PoolsBox,
  PoolsCountBox,
  RightBox,
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
  const totalBalanceCompactFormat = compactFormatToParts(totalBalance);

  return (
    <VaultListItemBox>
      <VaultListItemTopBox>
        <MarketTokenInformation market={'Aave'} token={token} />
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
        <RightBox>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken="$"
            token={totalBalanceCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={totalBalanceCompactFormat.compactNumber}
          />
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
        </RightBox>
      </VaultListItemTopBox>
      <VaultListItemBottomBox>
        <HeaderBox>
          <HeaderLeftBox>
            <MaturityBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Maturity
              </Typography>
            </MaturityBox>
            <DistributionBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Distribution
              </Typography>
            </DistributionBox>
          </HeaderLeftBox>
          <HeaderRightBox>
            <CurrentBalanceBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Current Balance
              </Typography>
            </CurrentBalanceBox>
            <StatusBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Status
              </Typography>
            </StatusBox>
            <PoolsBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                Pools
              </Typography>
            </PoolsBox>
          </HeaderRightBox>
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
                <MaturityBox>
                  <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
                    {formatPOSIXTimestamp(maturityTimestampMS)}
                    {isCompleted ? ' -' : ''}
                  </Typography>
                </MaturityBox>
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
                <CurrentBalanceBox>{compactFormat(currentBalance)}</CurrentBalanceBox>
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

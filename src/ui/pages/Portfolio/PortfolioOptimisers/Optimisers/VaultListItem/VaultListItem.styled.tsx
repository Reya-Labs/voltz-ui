import styled from '@emotion/styled';
import { AppLink, colors } from 'brokoli-ui';

export const VaultListItemBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px;
  gap: 16px;

  background: ${colors.liberty8};
  border: 1px solid ${colors.lavenderWeb7};

  box-shadow: -2px 0px 8px ${colors.liberty8};
  border-radius: 8px;
`;

export const TopRightBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const TopBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

export const DepositButton = styled(AppLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;

  background: ${colors.lavenderWeb7};
  border: 1px solid ${colors.lavenderWeb7};

  box-shadow: 0px 2px 10px ${colors.liberty6}, 0px 8px 40px rgba(38, 103, 255, 0.2),
    0px 5px 40px rgba(255, 74, 169, 0.2);
  border-radius: 4px;
`;

export const ManageButton = styled(AppLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;

  background: ${colors.lavenderWeb7};
  border: 1px solid ${colors.lavenderWeb7};

  box-shadow: 0px 2px 10px ${colors.liberty6}, 0px 8px 40px rgba(38, 103, 255, 0.2),
    0px 5px 40px rgba(255, 74, 169, 0.2);
  border-radius: 4px;
`;

export const BottomBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const HeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

export const VaultsBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const VaultListItemInfo = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px;
  gap: 8px;

  background: ${colors.lavenderWeb8};
  border: 1px solid ${colors.lavenderWeb7};

  box-shadow: -2px 0px 8px ${colors.liberty8};
  border-radius: 8px;
`;

export const ListEntryLeftBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ListEntryRightBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ValueBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MaturityBox = styled(ValueBox)`
  width: 80px;
`;

export const StatusBox = styled(ValueBox)`
  width: 80px;
`;

export const DistributionBox = styled(ValueBox)`
  width: 80px;
`;
export const BalanceBox = styled(ValueBox)`
  width: 80px;
`;
export const PoolsBox = styled(ValueBox)`
  width: 80px;
`;
export const TotalBalanceBox = styled(ValueBox)`
  width: 80px;
`;

export const AutomaticRolloverBox = styled(ValueBox)`
  width: 100px;
`;

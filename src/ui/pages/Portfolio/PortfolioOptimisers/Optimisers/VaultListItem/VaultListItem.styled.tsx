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

export const RightBox = styled('div')`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const VaultListItemTopBox = styled('div')`
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

export const VaultListItemBottomBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 16px 16px;
  gap: 4px;

  /* Liberty 7 */
  background: #0f0d18;

  /* Liberty 5 */
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #1e1933;
  border-radius: 0px 0px 8px 8px;
  box-sizing: border-box;
`;

export const HeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const VaultListItemInfo = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 24px;
  gap: 61px;

  /* Liberty 6 */
  background: #19152a;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;
export const HeaderLeftBox = styled('div')``;
export const HeaderRightBox = styled('div')``;
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
export const CurrentBalanceBox = styled(ValueBox)`
  width: 80px;
`;
export const PoolsBox = styled(ValueBox)`
  width: 80px;
`;
export const PoolsCountBox = styled(ValueBox)``;

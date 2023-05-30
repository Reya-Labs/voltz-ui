import styled from '@emotion/styled';
import { AppLink, colors } from 'brokoli-ui';

export const VaultListItemBox = styled('div')`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

export const ActionsBox = styled('div')`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
`;

export const VaultListItemTopBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 16px;

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 8px 8px 0px 0px;
`;

export const DepositButton = styled(AppLink)`
  /* Liberty 4 */
  background: #2b2548;
  border-radius: 4px;
`;

export const ManageButton = styled(AppLink)`
  /* Liberty 4 */
  background: #2b2548;
  border-radius: 0px 4px 4px 0px;
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
  padding: 0px 0px 0px 23px;
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

export const MaturityInfoBox = styled('div')`
  display: flex;
  min-width: 171px;
`;

export const StatusBox = styled('div')`
  display: flex;
  min-width: 171px;
`;

const ValueBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;

  /* Liberty 5 */
  background: ${colors.liberty5};
`;

export const DistributionBox = styled(ValueBox)`
  min-width: 52px;
`;
export const CurrentBalanceBox = styled(ValueBox)`
  min-width: 81px;
`;
export const PoolsCountBox = styled(ValueBox)``;

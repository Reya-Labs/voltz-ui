import { Panel } from '../../atomic/Panel/Panel';
import { BorrowPortfolioHeaderBox } from './BorrowportfolioHeaderBox';
import { BorrowPortfolioSummary } from './BorrowPortfolioSummary';

export type BorrowPortfolioHeaderProps = {
  currencyCode: string;
  currencySymbol: string;
  fixedDebt?: number;
  variableDebt?: number;
  fixedPositionsCount?: number;
  variablePositionsCount?: number;
  loading?: boolean;
};

export const BorrowPortfolioHeader = ({
  currencyCode,
  currencySymbol,
  fixedDebt,
  variableDebt,
  fixedPositionsCount,
  variablePositionsCount,
  loading,
}: BorrowPortfolioHeaderProps) => {
  return (
    <>
      <Panel
        borderRadius="large"
        padding="container"
        sx={{ paddingTop: 0, paddingBottom: 0, background: 'transparent' }}
      >
        <BorrowPortfolioHeaderBox
          aggregatedDebt={
            variableDebt !== undefined && fixedDebt !== undefined
              ? variableDebt + fixedDebt
              : undefined
          }
          currencyCode={currencyCode}
          currencySymbol={currencySymbol}
          loading={loading}
        />

        <BorrowPortfolioSummary
          currencyCode={currencyCode}
          currencySymbol={currencySymbol}
          fixedDebt={fixedDebt}
          fixedPositionsCount={fixedPositionsCount}
          variableDebt={variableDebt}
          variablePositionsCount={variablePositionsCount}
        />
      </Panel>
    </>
  );
};

import { Panel } from '@components/atomic';
import BorrowPortfolioHeaderBox from './BorrowportfolioHeaderBox';
import BorrowPortfolioSummary from './BorrowPortfolioSummary';
import { SystemStyleObject, Theme } from '@theme';

export type BorrowPortfolioHeaderProps = {
  commonOverrides: SystemStyleObject<Theme>;
  currencyCode: string;
  currencySymbol: string;
  fixedDebt?: number;
  variableDebt?: number;
  fixedPositionsCount?: number;
  variablePositionsCount?: number;
  loading?: boolean;
};

const BorrowPortfolioHeader = ({ 
  commonOverrides,
  currencyCode, 
  currencySymbol,
  fixedDebt,
  variableDebt,
  fixedPositionsCount,
  variablePositionsCount,
  loading
}: BorrowPortfolioHeaderProps) => {
  return (
    <>
    <Panel borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background: "transparent"}}>
      <BorrowPortfolioHeaderBox
        loading={loading}
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        aggregatedDebt={(variableDebt !== undefined && fixedDebt !== undefined) ? (variableDebt + fixedDebt) : undefined }/>

        <BorrowPortfolioSummary
          commonOverrides={commonOverrides}
          currencyCode={currencyCode}
          currencySymbol={currencySymbol}
          fixedDebt={fixedDebt}
          variableDebt={variableDebt}
          fixedPositionsCount={fixedPositionsCount}
          variablePositionsCount={variablePositionsCount}
        />
    </Panel>
      
    </>
  )
};

export default BorrowPortfolioHeader;

  
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
};

const BorrowPortfolioHeader = ({ 
  commonOverrides,
  currencyCode, 
  currencySymbol,
  fixedDebt,
  variableDebt,
  fixedPositionsCount,
  variablePositionsCount
}: BorrowPortfolioHeaderProps) => {
  return (
    <>
    <Panel variant={'dark'} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0 }}>
      <BorrowPortfolioHeaderBox
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        aggregatedDebt={(variableDebt && fixedDebt) ? (variableDebt - fixedDebt) : undefined }/>

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

  
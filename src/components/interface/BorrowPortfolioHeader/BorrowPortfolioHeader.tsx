import { SystemStyleObject, Theme } from '@theme';
import BorrowPortfolioHeaderBox from './BorrowportfolioHeaderBox';

export type BorrowPortfolioHeaderProps = {
  currencyCode?: string;
  currencySymbol?: string;
  aggregatedDebt?: number;
};

const labelStyles: SystemStyleObject<Theme> = { 
  fontSize: '12px', 
  lineHeight: '1.2',
  textTransform: 'uppercase'
};

const titleStyles: SystemStyleObject<Theme> = { 
  fontSize: '40px', 
  lineHeight: '1.2', 
  marginTop: (theme) => theme.spacing(2)
};

const PortfolioHeader = ({ 
  currencyCode = '', 
  currencySymbol = '',
  aggregatedDebt = 0,
}: BorrowPortfolioHeaderProps) => {
  return (
    <>
      <BorrowPortfolioHeaderBox
       currencyCode={currencyCode}
       currencySymbol={currencySymbol}
       aggregatedDebt={aggregatedDebt}/>
    </>
  )
};

export default PortfolioHeader;

  
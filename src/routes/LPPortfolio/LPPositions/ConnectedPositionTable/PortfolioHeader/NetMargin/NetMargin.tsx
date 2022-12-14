import { formatCurrency } from '../../../../../../utilities/number';
import {
  NegativeNetMarginDiffTypography,
  NetMarginBox,
  NetMarginDiffBox,
  NetMarginTypography,
  NetMarginValueBox,
  NetMarginValueTypography,
  PositiveNetMarginDiffTypography,
} from './NetMargin.styled';

export type NetMarginProps = {
  currencyCode?: string;
  currencySymbol?: string;
  netMargin: number;
  netMarginDiff: number;
};

export const NetMargin = ({
  currencyCode = '',
  currencySymbol = '',
  netMargin,
  netMarginDiff,
}: NetMarginProps) => {
  if (netMargin === undefined || netMarginDiff === undefined) {
    return null;
  }
  const NetMarginDiffTypography =
    netMarginDiff >= 0 ? PositiveNetMarginDiffTypography : NegativeNetMarginDiffTypography;
  return (
    <NetMarginBox>
      <NetMarginDiffBox>
        <NetMarginTypography>NET MARGIN</NetMarginTypography>
        <NetMarginDiffTypography>
          {' '}
          {netMarginDiff > 0 && '+'}
          {netMarginDiff < 0 && '-'}
          {currencySymbol}
          {formatCurrency(Math.abs(netMarginDiff))} {currencyCode}
        </NetMarginDiffTypography>
      </NetMarginDiffBox>
      <NetMarginValueBox>
        <NetMarginValueTypography>
          {currencySymbol}
          {formatCurrency(netMargin)} {currencyCode}
        </NetMarginValueTypography>
      </NetMarginValueBox>
    </NetMarginBox>
  );
};

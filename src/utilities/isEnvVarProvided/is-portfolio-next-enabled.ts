import { isEnvVarProvided } from './index';

export const isPortfolioNextEnabled = () =>
  isEnvVarProvided(process.env.REACT_APP_PORTFOLIO_NEXT_ENABLED);

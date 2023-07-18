import { capitalize } from '../../../../utilities/capitalize';

export const extractTextFromLink = (link: string) => {
  if (!link) {
    return 'Etherscan';
  }

  const domainStartIndex = link.indexOf('//') + 2;
  const domainEndIndex = link.indexOf('/', domainStartIndex);
  const domain = link.slice(domainStartIndex, domainEndIndex !== -1 ? domainEndIndex : undefined);

  const domainInfo = domain.split('.');
  const lastDomain = domainInfo[domainInfo.length - 2];
  return capitalize(lastDomain);
};

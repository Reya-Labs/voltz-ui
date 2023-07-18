import { extractTextFromLink } from '.';

describe('extractTextFromLink', () => {
  test.each([
    ['https://etherscan.io/', 'Etherscan'],
    ['https://goerli.etherscan.io/', 'Etherscan'],
    ['https://arbiscan.io/', 'Arbiscan'],
    ['https://goerli.arbiscan.io/', 'Arbiscan'],
    ['https://snowtrace.io', 'Snowtrace'],
    ['https://testnet.snowtrace.io', 'Snowtrace'],
    ['', 'Etherscan'],
  ])('given link=%p it should %p', (link, expected) => {
    const result = extractTextFromLink(link);
    expect(result).toBe(expected);
  });
});

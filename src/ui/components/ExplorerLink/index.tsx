import { ExternalLink } from 'brokoli-ui';
import React from 'react';

import { extractTextFromLink } from './extract-text-from-link';

export const ExplorerLink: React.FunctionComponent<{ link: string }> = ({ link }) => (
  <ExternalLink colorToken="white" href={link} typographyToken="primaryBodyXSmallRegular">
    {`Open transaction on ${extractTextFromLink(link)}`}
  </ExternalLink>
);

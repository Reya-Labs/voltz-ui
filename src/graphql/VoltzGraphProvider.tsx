import React from 'react';
import { ApolloProvider } from '@apollo/client';

import client from './client';

const VoltzGraphProvider: React.FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default VoltzGraphProvider;

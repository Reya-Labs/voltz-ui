import { ApolloProvider } from '@apollo/client';
import React from 'react';

import client from './client';

const VoltzGraphProvider: React.FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default VoltzGraphProvider;

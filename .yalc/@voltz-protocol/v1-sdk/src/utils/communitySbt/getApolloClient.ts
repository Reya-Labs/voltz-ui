import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';

export const getApolloClient = (uri: string): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri, fetch }),
  });
  return client;
};

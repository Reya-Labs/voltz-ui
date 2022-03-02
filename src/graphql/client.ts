import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/subgraphs/name/nicholaspiano/v1-subgraph',
  cache: new InMemoryCache(),
});

export default client;

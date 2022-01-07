import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const wsLink = new WebSocketLink({
    uri: `ws://new-pig-96.hasura.app/v1/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'eRltODkyV4VCMHxjGoRnnARLNfG6oWviDAL6lH8EZnCwbmRHnTprwdXD3AQlalhQ'
            },
        },
    },
});

const httpLink = new HttpLink({
    uri: `https://new-pig-96.hasura.app/v1/graphql`,
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

export default new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

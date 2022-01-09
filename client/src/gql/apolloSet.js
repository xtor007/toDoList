import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';


const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WSS_LINK,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'content-type': process.env.REACT_APP_CONTENT_TYPE,
                'x-hasura-admin-secret': process.env.REACT_APP_SECRET
            },
        },
    },
});

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HTTP_LINK,
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

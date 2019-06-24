import 'graphql-import-node';
import {GraphQLModule} from "@graphql-modules/core";
import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';

export const MovieModule = new GraphQLModule({
    resolvers,
    typeDefs,
});

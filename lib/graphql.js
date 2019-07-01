const {importSchema} = require('graphql-import');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const movieSchema = importSchema('./lib/Movie/schema.graphql');

const movieResolver = require('./Movie/resolver');

const resolvers = {
	Query: Object.assign({}, movieResolver.Query),
	Mutation: Object.assign({}, movieResolver.Mutation),
};

const typeDefs = [
	movieSchema,
];

module.exports = makeExecutableSchema({typeDefs, resolvers});

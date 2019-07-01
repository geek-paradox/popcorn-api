const {importSchema} = require('graphql-import');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const modules = [
	'movie',
];

const getTypeDefs = (modules) => {
	let typeDefs = [];
	modules.forEach((module) => {
		typeDefs.push(importSchema(`./lib/${module}/schema.graphql`));
	});
	return typeDefs;
};

const getResolvers = (modules) => {
	const resolvers = {
		Query: {},
		Mutation: {},
	};
	modules.forEach((module) => {
		const resolver = require(`./${module}/resolver`);
		if (resolver.Query) resolvers.Query = Object.assign(resolvers.Query, resolver.Query);
		if (resolver.Mutation) resolvers.Mutation = Object.assign(resolvers.Mutation, resolver.Mutation);
	});
	return resolvers;
};

const resolvers = getResolvers(modules);
const typeDefs = getTypeDefs(modules);

module.exports = makeExecutableSchema({typeDefs, resolvers});

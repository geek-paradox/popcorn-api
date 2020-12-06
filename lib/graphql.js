const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const modules = [
	'genre',
	'movie',
	'user',
];

const getTypeDefs = (modules) => {
	const paths = ['base.graphql'];
	modules.forEach(module => paths.push(path.join(module, 'schema.graphql')));
	const schemas = paths.map(p => fs.readFileSync(path.join(__dirname, p), {encoding: 'utf-8', flag: 'r'}));
	return schemas.join('\n');
};

const getResolvers = (modules) => {
	const resolvers = {
		Query: {},
		Mutation: {},
	};
	modules.forEach((module) => {
		const resolver = require(path.join(__dirname, module, 'resolver.js'));
		if (resolver.Query) resolvers.Query = Object.assign(resolvers.Query, resolver.Query);
		if (resolver.Mutation) resolvers.Mutation = Object.assign(resolvers.Mutation, resolver.Mutation);
		const capitalCase = _.capitalize(module);
		if (resolver[capitalCase]) resolvers[capitalCase] = resolver[capitalCase];
	});
	return resolvers;
};

const resolvers = getResolvers(modules);
const typeDefs = getTypeDefs(modules);

module.exports = makeExecutableSchema({typeDefs, resolvers});

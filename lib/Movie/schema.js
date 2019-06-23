const {buildSchema} = require('graphql');

module.exports = buildSchema(`
	type Movie {
		id: ID,
		title: String,
		year: Int,
		language: String,
		rating: Int,
		director: String,
		image: String
	}

	type Query {
		listMovies: [Movie]
	}

	type Mutation {
		createMovie(
			title: String!,
			year: Int!,
			language: String,
			rating: Int!,
			director: String,
			image: String,
		): Movie
		
		updateMovie(
			id: String!,
			title: String,
			year: Int,
			language: String,
			rating: Int,
			director: String,
			image: String,
		): Movie
		
		deleteMovie(id: String!): String
	}
`);

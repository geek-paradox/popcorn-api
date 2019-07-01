const Movie = require('../../model').Movie;

const resolver = {
	Movie: {

	},
	Query: {
		movie: async (_, {id}) => {
			return Movie.findOne(id);
		},
		movies: async (_, args) => {
			const condition = {};
			if (args.title) condition.title = {$regex: args.title, $options: 'i'};
			if (args.year) condition.year = args.year;
			if (args.rating) condition.rating = args.rating;
			if (args.language) condition.language = args.language;
			if (args.director) condition.director = {$regex: args.director, $options: 'i'};
			console.log('Movie conditions: ', condition);
			let query = Movie.find(condition);
			if (args.limit) query = query.limit(args.limit);
			return query;
		},
	},
	Mutation: {
		createMovie(_, movie) {
			const newMovie = new Movie(movie);
			return newMovie.save();
		},
		updateMovie(_, movie) {
			const {id, ...rest} = movie;
			return Movie.findByIdAndUpdate(id, {$set: rest}, {new: true})
				.catch(err => console.error(err));
		},
		deleteMovie(_, {id}) {
			return Movie.findByIdAndDelete(id)
				.then(movie => movie.remove())
				.then(() => `${id} successfully deleted`)
				.catch(err => console.error(err));
		},
	},
};

module.exports = resolver;

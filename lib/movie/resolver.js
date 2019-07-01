const Movie = require('../../models').Movie;

const resolver = {
	Query: {
		listMovies() {
			return Movie.find();
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

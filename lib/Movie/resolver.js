const Movie = require('../../models').Movie;

const resolver = {
	listMovies() {
		return Movie.find();
	},
	createMovie(movie) {
		const newMovie = new Movie(movie);
		return newMovie.save();
	},
	updateMovie(movie) {
		const {id, ...rest} = movie;
		return Movie.findByIdAndUpdate(id, {$set: rest}, {new: true})
			.catch(err => console.error(err));
	},
	deleteMovie({id}) {
		return Movie.findByIdAndDelete(id)
			.then(movie => movie.remove())
			.then(() => `${id} successfully deleted`)
			.catch(err => console.error(err));
	},
};

module.exports = resolver;

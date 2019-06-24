// import {Movie} from '../../models';
import Movie, {IMovie} from '../../models/movie.model';

export default {
    Query: {
        listMovies: () => {
            return Movie.find();
        },
    },
    Mutation: {
        createMovie: (movie: IMovie) => {
            const newMovie = new Movie(movie);
            return newMovie.save();
        },
        updateMovie: (movie: IMovie) => {
            const {id, ...rest} = movie;
            return Movie.findByIdAndUpdate(id, {$set: rest}, {new: true})
                .catch(err => console.error(err));
        },
        deleteMovie: ({id}: IMovie) => {
            return Movie.findByIdAndDelete(id)
                .then((movie) => {
                    if (movie !== null) movie.remove();
                })
                .then(() => `${id} successfully deleted`)
                .catch(err => console.error(err));
        },
    },
};

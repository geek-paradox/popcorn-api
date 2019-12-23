const model = require('../../model');
const Genre = model.Genre;
const Movie = model.Movie;
const User = model.User;

const resolver = {
	User: {
		preferredGenres: (_, {preferredGenreIds}) => Genre.find({id: preferredGenreIds}),
		moviesCollection: (_, {movieIdsCollection}) => Movie.find({id: movieIdsCollection}),
		moviesWishlist: (_, {movieIdsWishlist}) => Movie.find({id: movieIdsWishlist}),
		moviesWatched: (_, {movieIdsWatched}) => Movie.find({id: movieIdsWatched}),
	},
	Query: {
		user: (_, {id}) => {
			return User.findOne(id);
		},
		users: (_, args) => {
			const condition = {};
			if (args.name) condition.name = {$regex: args.name, $options: 'i'};
			if (args.country) condition.country = args.country;
			console.log('User conditions: ', condition);
			let query = User.find(condition);
			if (args.limit) query = query.limit(args.limit);
			return query;
		},
	},
	Mutation: {
		createUser: (_, user) => {
			const newUser = new User(user);
			return newUser.save();
		},
		updateUser: (_, user) => {
			const {id, ...rest} = user;
			return User.findByIdAndUpdate(id, {$set: rest}, {new: true})
				.catch(err => console.error(err));
		},
		deleteUser: (_, {id}) => {
			return User.findByIdAndDelete(id)
				.then(user => user.remove())
				.then(() => `${id} successfully deleted`)
				.catch(err => console.error(err));
		},
	},
};

module.exports = resolver;

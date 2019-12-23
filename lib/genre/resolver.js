const model = require('../../model');
const Genre = model.Genre;

const resolver = {
	Query: {
		genre: (_, {id}) => {
			return Genre.findOne(id);
		},
		genres: (_, args) => {
			return Genre.find(args.id);
		},
	},
	Mutation: {
		createGenre: (_, genre) => {
			const newGenre = new Genre(genre);
			return newGenre.save();
		},
		updateGenre: (_, genre) => {
			const {id, ...rest} = genre;
			return Genre.findByIdAndUpdate(id, {$set: rest}, {new: true})
				.catch(err => console.error(err));
		},
		deleteGenre: (_, {id}) => {
			return Genre.findByIdAndDelete(id)
				.then(genre => genre.remove())
				.then(() => `${id} successfully deleted`)
				.catch(err => console.error(err));
		},
	},
};

module.exports = resolver;

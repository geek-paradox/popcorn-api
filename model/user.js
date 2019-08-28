const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	username: Number,
	password: String,
	country: String,
	email: String,
	phone: String,
	image: String,
	preferredGenreIds: [String],
	movieIdsCollection: [String],
	movieIdsWishlist: [String],
	movieIdsWatched: [String],
});

module.exports = mongoose.model('User', UserSchema);

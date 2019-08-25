const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	username: Number,
	password: String,
	country: String,
	email: String,
	phone: String,
	image: String,
	preferredGenre: [Number],
	movieCollection: [Number],
	movieWishlist: [Number],
	movieWatched: [Number],
});

module.exports = mongoose.model('User', UserSchema);

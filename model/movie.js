const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	language: String,
	rating: Number,
	director: String,
	image: String,
	genre: [Number],
	shortDescription: String,
});

module.exports = mongoose.model('Movie', MovieSchema);

const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model('Genre', GenreSchema);

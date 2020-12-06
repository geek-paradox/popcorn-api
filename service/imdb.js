const cheerio = require('cheerio');
const request = require('request-promise');

const config = require('../config');

const imdbService = {
	search: async (title) => {
		const options = {
			url: `${config.imdb.searchApi}/?title=${title}`,
			transform: body => cheerio.load(body),
		};
		request(options)
			.then(($) => {
				console.log($);
			})
			.catch((err) => {
				console.error(`Error during searching imdb: ${err}`);
			});
	},
};

module.export = imdbService;


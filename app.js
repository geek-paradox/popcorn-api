const bodyParser = require('koa-body');
const graphqlHTTP = require('koa-graphql');
const Koa = require('koa');
const mount = require('koa-mount');
const mongoose = require('mongoose');
const root = require('./lib/Movie/resolver');
const schema = require('./lib/Movie/schema');

const config = require('./config');

const app = new Koa();

app.use(bodyParser({multipart: true,}));
app.use(mount('/graphql', graphqlHTTP({schema, rootValue: root, graphiql: true})));

mongoose.connect(config.db.mongoServer, {useNewUrlParser: true, useFindAndModify: false})
	.then(() => {console.log('Database connected'); })
	.then(() => listenServer(app))
	.catch((err) => {
		console.error('connection error', err);
	});

const listenServer = (app) => {
	const port = config.port;
	return new Promise((resolve) => {
		app.listen(port, () => {
			console.log(`Server listening on ${port}`);
			resolve(port);
		});
	});
};

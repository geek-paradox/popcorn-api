const graphqlHTTP = require('koa-graphql');
const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');

const config = require('./config');
const schema = require('./lib/graphql');

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({schema, graphiql: true}));
app.use(router.routes());
app.use(router.allowedMethods());

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

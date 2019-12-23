const graphqlHTTP = require('koa-graphql');
const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');

const config = require('./config');
const schema = require('./lib/graphql');

const app = new Koa();
const router = new Router();

router.post('/graphql', graphqlHTTP({schema, graphiql: true}));
app.use(router.routes());
app.use(router.allowedMethods());

const listenServer = (app) => {
	const port = config.port;
	return new Promise((resolve) => {
		app.listen(port, () => {
			console.log(`Server listening on ${port}`);
			resolve(port);
		});
	});
};

const startServer = async () => {
	await mongoose.connect(config.db.mongoServer, {
		useNewUrlParser: true,
		useFindAndModify: false
	});
	console.log('Database connected');
	await listenServer(app);
};

if (require.main === module) {
	startServer()
		.catch((err) => console.error('connection error', err));
}

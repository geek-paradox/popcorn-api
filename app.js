const bodyParser = require('koa-body');
const graphqlHTTP = require('koa-graphql');
const koa = require('koa');
const mount = require('koa-mount');
const mongoose = require('mongoose');
const root = require('./lib/Movie/resolver');
const schema = require('./lib/Movie/schema');

const config = require('./config');

mongoose.connect(config.db.mongoServer, {
	useNewUrlParser: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database Connected'));

const app = new koa();
app.use(bodyParser({
	multipart: true,
}));
app.listen(9000);

app.on('error', (err) => {
	console.log('Server error', err);
});

app.use(mount('/graphql', graphqlHTTP({schema, rootValue: root, graphiql: true})));

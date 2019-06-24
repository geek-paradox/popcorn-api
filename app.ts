import {appModule} from './lib/graphql';
import Koa from 'koa';
import {ApolloServer} from 'apollo-server-koa';
import mongoose from 'mongoose';

import config from './config';

const {schema, context} = appModule;

const server = new ApolloServer({
    schema,
    context,
    introspection: true,
});
const app = new Koa();
server.applyMiddleware({app});

mongoose.connect(config.db.mongoServer, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => console.log('Database connected'))
    .then(() => {
        const port = config.port;
        return new Promise((resolve) => {
            app.listen(port, () => {
                console.log(`Server listening on ${port}`);
                resolve(port);
            });
        });
    })
    .catch((err) => console.error('connection error', err));

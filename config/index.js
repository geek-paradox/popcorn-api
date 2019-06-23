const constants = require('../util/constants');
const devConfig = require('./development');
const prodConfig = require('./production');

const env = process.env.NODE_ENV;

let config = devConfig;
if (env === constants.env.production) {
    config = prodConfig;
}

module.exports = config;

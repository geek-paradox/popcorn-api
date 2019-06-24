import devConfig from './development';
import prodConfig from './production';
import constants from '../util/constants';

const env = process.env.NODE_ENV;

let envConfig = devConfig;
if (env === constants.env.production) {
	envConfig = prodConfig;
}

export default {
	db: envConfig.db,
	port: 9000,
};

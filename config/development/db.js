const mongoUser = 'admin';
const mongoPassword = 'admin';

module.exports = {
	mongoServer: `mongodb+srv://${mongoUser}:${mongoPassword}@geekparadox-octjb.gcp.mongodb.net/popcorn?retryWrites=true&w=majority`
};

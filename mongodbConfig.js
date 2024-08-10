require("dotenv").config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

const mongodbConnectionString =
	`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}` +
	`.erzzs.mongodb.net/${MONGODB_COLLECTION}?retryWrites=true&w=majority&appName=${MONGODB_CLUSTER}`;

exports.mongodbConnectionString = mongodbConnectionString;

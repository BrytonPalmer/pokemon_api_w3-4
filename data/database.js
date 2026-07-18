const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

// Initialize DB connection once
const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;   // store the client connection
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

// Return the active DB connection
const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
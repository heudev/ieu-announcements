const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});

const connectDB = async () => {
    const env = process.env.NODE_ENV || 'development';

    let uri;
    if (env === 'production') {
        uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
    } else {
        uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    }

    await Mongoose.connect(uri);
};

module.exports = {
    connectDB,
};

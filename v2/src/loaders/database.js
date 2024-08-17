const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});

const connectDB = async () => {
    await Mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`);
    //await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`);
};

module.exports = {
    connectDB,
};

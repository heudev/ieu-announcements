const Mongoose = require("mongoose");
const logger = require('../scripts/logger/News');

const createNewsModel = (modelName) => {
    const schema = new Mongoose.Schema(
        {
            title: String,
            description: String,
            imageUrl: String,
            readMoreLink: String,
        },
        { timestamps: true, versionKey: false }
    );

    schema.post("save", (news) => {
        logger.log({
            level: "info",
            message: `${modelName} News: ${news.title}`,
        });
    });

    return Mongoose.model(modelName, schema);
};

const TurkishNewsModel = createNewsModel("Turkish-News");
const EnglishNewsModel = createNewsModel("English-News");

module.exports = {
    TurkishNewsModel,
    EnglishNewsModel
};

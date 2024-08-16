const Mongoose = require("mongoose");
const logger = require('../scripts/logger/News');

const NewsSchema = new Mongoose.Schema(
    {
        title: String,
        description: String,
        imageUrl: String,
        readMoreLink: String,
    },
    { timestamps: true, versionKey: false }
);

NewsSchema.post("save", (news) => {
    logger.log({
        level: "info",
        message: news,
    });
});

module.exports = Mongoose.model("News", NewsSchema);

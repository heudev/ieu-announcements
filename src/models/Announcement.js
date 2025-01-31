const Mongoose = require("mongoose");
const logger = require('../scripts/logger/Announcement');

const createAnnouncementModel = (modelName) => {
    const schema = new Mongoose.Schema(
        {
            title: String,
            link: String,
            date: String
        },
        { timestamps: true, versionKey: false }
    );

    schema.post("save", (announcement) => {
        logger.log({
            level: "info",
            message: `${modelName} Announcement: ${announcement.title}`,
        });
    });

    return Mongoose.model(modelName, schema);
};

const TurkishAnnouncementModel = createAnnouncementModel("Turkish-Announcement");
const EnglishAnnouncementModel = createAnnouncementModel("English-Announcement");

module.exports = {
    TurkishAnnouncementModel,
    EnglishAnnouncementModel
};

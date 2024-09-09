const Mongoose = require("mongoose");
const logger = require('../scripts/logger/FecsAnnouncement');

const createFecsAnnouncementModel = (modelName) => {
    const schema = new Mongoose.Schema(
        {
            title: String,
            link: String,
            date: String,
        },
        { timestamps: true, versionKey: false }
    );

    schema.post("save", (announcement) => {
        logger.log({
            level: "info",
            message: `${modelName} FECS Announcement: ${announcement.title}`,
        });
    });

    return Mongoose.model(modelName, schema);
};

const TurkishFecsAnnouncementModel = createFecsAnnouncementModel("Turkish-Fecs-Announcement");
const EnglishFecsAnnouncementModel = createFecsAnnouncementModel("English-Fecs-Announcement");

module.exports = {
    TurkishFecsAnnouncementModel,
    EnglishFecsAnnouncementModel
};
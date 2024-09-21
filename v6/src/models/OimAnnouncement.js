const Mongoose = require("mongoose");
const logger = require('../scripts/logger/OimAnnouncement');

const createOimAnnouncementModel = (modelName) => {
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
            message: `${modelName} OIM Announcement: ${announcement.title}`,
        });
    });

    return Mongoose.model(modelName, schema);
};

const TurkishOimAnnouncementModel = createOimAnnouncementModel("Turkish-Oim-Announcement");
const EnglishOimAnnouncementModel = createOimAnnouncementModel("English-Oim-Announcement");

module.exports = {
    TurkishOimAnnouncementModel,
    EnglishOimAnnouncementModel
};

const Mongoose = require("mongoose");
const logger = require('../scripts/logger/DmAnnouncement');

const createDmAnnouncementModel = (modelName) => {
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
            message: `${modelName} DM Announcement: ${announcement.title}`,
        });
    });

    return Mongoose.model(modelName, schema);
};

const TurkishDmAnnouncementModel = createDmAnnouncementModel("Turkish-Dm-Announcement");
const EnglishDmAnnouncementModel = createDmAnnouncementModel("English-Dm-Announcement");

module.exports = {
    TurkishDmAnnouncementModel,
    EnglishDmAnnouncementModel
};

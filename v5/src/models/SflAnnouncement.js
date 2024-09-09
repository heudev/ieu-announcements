const Mongoose = require("mongoose");
const logger = require('../scripts/logger/SflAnnouncement');

const createSflAnnouncementModel = (modelName) => {
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
            message: `${modelName} SFL Announcement: ${announcement.title}`,
        });
    });

    return Mongoose.model(modelName, schema);
};

const TurkishSflAnnouncementModel = createSflAnnouncementModel("Turkish-Sfl-Announcement");
const EnglishSflAnnouncementModel = createSflAnnouncementModel("English-Sfl-Announcement");

module.exports = {
    TurkishSflAnnouncementModel,
    EnglishSflAnnouncementModel
};

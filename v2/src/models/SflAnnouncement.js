const Mongoose = require("mongoose");
const logger = require('../scripts/logger/SflAnnouncement');

const SflAnnouncementSchema = new Mongoose.Schema(
    {
        title: String,
        link: String,
        date: String,
    },
    { timestamps: true, versionKey: false }
);

SflAnnouncementSchema.post("save", (announcement) => {
    logger.log({
        level: "info",
        message: announcement,
    });
});

module.exports = Mongoose.model("SflAnnouncement", SflAnnouncementSchema);

const Mongoose = require("mongoose");
const logger = require('../scripts/logger/Announcement');

const AnnouncementSchema = new Mongoose.Schema(
    {
        title: String,
        link: String,
        date: String
    },
    { timestamps: true, versionKey: false }
);

AnnouncementSchema.post("save", (announcement) => {
    logger.log({
        level: "info",
        message: announcement,
    });
});

module.exports = Mongoose.model("Announcement", AnnouncementSchema);

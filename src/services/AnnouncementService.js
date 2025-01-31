const BaseService = require('./BaseService');
const { TurkishAnnouncementModel, EnglishAnnouncementModel } = require('../models/Announcement');

class AnnouncementService extends BaseService {
    constructor(model) {
        super(model);
    }
}

const TurkishAnnouncementService = new AnnouncementService(TurkishAnnouncementModel);
const EnglishAnnouncementService = new AnnouncementService(EnglishAnnouncementModel);

module.exports = {
    TurkishAnnouncementService,
    EnglishAnnouncementService
};
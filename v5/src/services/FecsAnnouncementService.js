const BaseService = require('./BaseService');
const { TurkishFecsAnnouncementModel, EnglishFecsAnnouncementModel } = require('../models/FecsAnnouncement');

class FecsAnnouncementService extends BaseService {
    constructor(model) {
        super(model);
    }
}

const TurkishFecsAnnouncementService = new FecsAnnouncementService(TurkishFecsAnnouncementModel);
const EnglishFecsAnnouncementService = new FecsAnnouncementService(EnglishFecsAnnouncementModel);

module.exports = {
    TurkishFecsAnnouncementService,
    EnglishFecsAnnouncementService
};
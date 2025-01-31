const BaseService = require('./BaseService');
const { TurkishOimAnnouncementModel, EnglishOimAnnouncementModel } = require('../models/OimAnnouncement');

class OimAnnouncementService extends BaseService {
    constructor(model) {
        super(model);
    }
}

const TurkishOimAnnouncementService = new OimAnnouncementService(TurkishOimAnnouncementModel);
const EnglishOimAnnouncementService = new OimAnnouncementService(EnglishOimAnnouncementModel);

module.exports = {
    TurkishOimAnnouncementService,
    EnglishOimAnnouncementService
};
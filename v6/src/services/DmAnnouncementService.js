const BaseService = require('./BaseService');
const { TurkishDmAnnouncementModel, EnglishDmAnnouncementModel } = require('../models/DmAnnouncement');

class DmAnnouncementService extends BaseService {
    constructor(model) {
        super(model);
    }
}

const TurkishDmAnnouncementService = new DmAnnouncementService(TurkishDmAnnouncementModel);
const EnglishDmAnnouncementService = new DmAnnouncementService(EnglishDmAnnouncementModel);

module.exports = {
    TurkishDmAnnouncementService,
    EnglishDmAnnouncementService
};
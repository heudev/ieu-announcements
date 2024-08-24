const BaseService = require('./BaseService');
const { TurkishSflAnnouncementModel, EnglishSflAnnouncementModel } = require('../models/SflAnnouncement');

class SflAnnouncementService extends BaseService {
    constructor(model) {
        super(model);
    }
}

const TurkishSflAnnouncementService = new SflAnnouncementService(TurkishSflAnnouncementModel);
const EnglishSflAnnouncementService = new SflAnnouncementService(EnglishSflAnnouncementModel);

module.exports = {
    TurkishSflAnnouncementService,
    EnglishSflAnnouncementService
};

const BaseService = require('./BaseService');
const BaseModel = require('../models/SflAnnouncement');

class SflAnnouncementService extends BaseService {
    constructor() {
        super(BaseModel);
    }
}

module.exports = new SflAnnouncementService();
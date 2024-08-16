const BaseService = require('./BaseService');
const BaseModel = require('../models/Announcement');

class AnnouncementService extends BaseService {
    constructor() {
        super(BaseModel);
    }
}

module.exports = new AnnouncementService();
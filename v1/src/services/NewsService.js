const BaseService = require('./BaseService');
const BaseModel = require('../models/News');

class NewsService extends BaseService {
    constructor() {
        super(BaseModel);
    }
}

module.exports = new NewsService();
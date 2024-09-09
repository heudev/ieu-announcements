const BaseService = require('./BaseService');
const { TurkishNewsModel, EnglishNewsModel } = require('../models/News');

class NewsService extends BaseService {
    constructor(model) {
        super(model);
    }
}

const TurkishNewsService = new NewsService(TurkishNewsModel);
const EnglishNewsService = new NewsService(EnglishNewsModel);

module.exports = {
    TurkishNewsService,
    EnglishNewsService
};
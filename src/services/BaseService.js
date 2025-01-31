class BaseService {
    constructor(model) {
        this.model = model;
    }

    async exists(where) {
        const count = await this.model.countDocuments(where);
        return count !== 0;
    };

    save(data) {
        return new this.model(data).save();
    };

    find(where) {
        return this.model.find(where || {});
    }
}

module.exports = BaseService;
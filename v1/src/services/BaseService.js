class BaseService {
    constructor(model) {
        this.model = model;
    }

    async exists(where) {
        const count = await this.model.count({ where });
        return count !== 0;
    };

    save(data) {
        return this.model.create(data);
    };

    findAll(where) {
        return this.model.findAll(where || {});
    }
}

module.exports = BaseService;
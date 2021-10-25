const PeopleRepository = require('../repository/PeopleRepository');

class PeopleService {
    async create(payload) {
        try {
            const result = await PeopleRepository.create(payload);
            return result;
        } catch (error) {
            return error;
        }
    }
    async getAll() {
        try {
            const result = await PeopleRepository.getAll();
            return result;
        } catch (error) {
            return error;
        }
    }
    async getById(_id) {
        try {
            const result = await PeopleRepository.getById(_id);
            return result;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new PeopleService();
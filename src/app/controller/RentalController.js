const { paginateSerialize } = require('../serialize/RentalSerialize');
const RentalService = require('../service/RentalService');

class RentalController {
  async create(req, res) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ description: error.path, name: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await RentalService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, name: error.message });
    }
  }
}

module.exports = new RentalController();

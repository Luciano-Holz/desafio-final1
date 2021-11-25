const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const FleetRepository = require('../repository/FleetRepository');
const RentalRepository = require('../repository/RentalRepository');
const CarRepository = require('../repository/CarRepository');

class FleetService {
  async create(_id, payload) {
    const { id_locadora, id_carro, placa } = payload;
    if (id_locadora !== _id) throw new BadRequest('Id Rental', 'Invalid');

    const rental = await RentalRepository.getById(id_locadora);
    if (!rental) throw new NotFound('rental', 'not found');

    const car = await CarRepository.getById(id_carro);
    if (!car) throw new NotFound('car', 'not found');

    const checkPlaca = await FleetRepository.getAll({ placa });
    if (checkPlaca.docs.length > 0) {
      throw new BadRequest('Conflict', `This placa ${placa} already exists in this Rental`);
    }

    const result = await FleetRepository.create(payload);
    if (!result) {
      throw new NotFound('Fleet', `not found`);
    }
    return result;
  }

  async getAll(queryParams) {
    const result = await FleetRepository.getAll(queryParams);
    return result;
  }

  async getById(_id, _idFleet) {
    const result = await FleetRepository.getById(_idFleet);
    return result;
  }

  async update(_id, payload) {
    const result = await FleetRepository.update(_id, payload);
    return result;
  }

  async delete(_id) {
    const result = await FleetRepository.delete(_id);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }
}

module.exports = new FleetService();

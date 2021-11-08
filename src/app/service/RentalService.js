const RentalNotFound = require('../errors/rental/RentalNotFound');
const RentalRepository = require('../repository/RentalRepository');
const ViacepRepository = require('../repository/ViacepRepository');

class RentalService {
  async create(payload) {
    const viaCep = await ViacepRepository.viaCep(payload.endereco[0].cep);
    const { cep, logradouro, complemento, bairro, localidade, uf } = viaCep;
    payload.endereco = [
      {
        cep,
        logradouro,
        number: payload.endereco[0].number,
        complemento,
        bairro,
        localidade,
        uf,
        isFilial: payload.endereco[0].isFilial
      }
    ];
    const result = await RentalRepository.create(payload);
    if (!result) throw new RentalNotFound();
    return result;
  }

  async getAll(queryParams) {
    const result = await RentalRepository.getAll(queryParams);
    if (!result) throw new RentalNotFound();
    return result;
  }

  async getById(_id) {
    const result = await RentalRepository.getById(_id);
    if (!result) throw new RentalNotFound(_id);
    return result;
  }

  async update(_id, payload) {
    const viaCep = await ViacepRepository.viaCep(payload.endereco[0].cep);
    const { cep, logradouro, complemento, bairro, localidade, uf } = viaCep;
    payload.endereco = [
      {
        cep,
        logradouro,
        number: payload.endereco[0].number,
        complemento,
        bairro,
        localidade,
        uf,
        isFilial: payload.endereco[0].isFilial
      }
    ];
    const result = await RentalRepository.update(_id, payload);
    if (!result) throw new RentalNotFound();
    return result;
  }
}

module.exports = new RentalService();

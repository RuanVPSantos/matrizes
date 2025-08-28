"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAmbiente = createAmbiente;
exports.updateAmbiente = updateAmbiente;
exports.deleteAmbiente = deleteAmbiente;
exports.listAmbientes = listAmbientes;
exports.listAmbientesById = listAmbientesById;
const ambiente_repository_1 = require("../data/repositories/ambiente.repository");
const ambienteRepository = new ambiente_repository_1.AmbienteRepository();
async function createAmbiente(data) {
    const ambiente = await ambienteRepository.create(data);
    return ambiente.toResponse();
}
async function updateAmbiente(id, data) {
    const ambiente = await ambienteRepository.findById(id);
    if (!ambiente) {
        throw new Error("Ambiente not found");
    }
    const updatedAmbiente = await ambienteRepository.update(id, data);
    return updatedAmbiente.toResponse();
}
async function deleteAmbiente(id) {
    const ambiente = await ambienteRepository.findById(id);
    if (!ambiente) {
        throw new Error("Ambiente not found");
    }
    await ambienteRepository.delete(id);
    return { message: "Ambiente deleted successfully" };
}
async function listAmbientes() {
    const ambientes = await ambienteRepository.findAll();
    return ambientes.map(ambiente => ambiente.toResponse());
}
async function listAmbientesById(id) {
    const ambiente = await ambienteRepository.findById(id);
    if (!ambiente) {
        throw new Error("Ambiente not found");
    }
    return ambiente.toResponse();
}
//# sourceMappingURL=ambiente.service.js.map
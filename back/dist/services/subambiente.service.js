"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubambiente = createSubambiente;
exports.updateSubambiente = updateSubambiente;
exports.deleteSubambiente = deleteSubambiente;
exports.listSubambientes = listSubambientes;
exports.listSubambientesById = listSubambientesById;
const subambiente_repository_1 = require("../data/repositories/subambiente.repository");
const ambiente_repository_1 = require("../data/repositories/ambiente.repository");
const subambienteRepository = new subambiente_repository_1.SubambienteRepository();
const ambienteRepository = new ambiente_repository_1.AmbienteRepository();
async function createSubambiente(ambienteId, data) {
    const ambiente = await ambienteRepository.findById(ambienteId);
    if (!ambiente) {
        throw new Error("Ambiente not found");
    }
    const subambiente = await subambienteRepository.create({
        ...data,
        ambienteId
    });
    return subambiente.toResponse();
}
async function updateSubambiente(id, data) {
    const subambiente = await subambienteRepository.findById(id);
    if (!subambiente) {
        throw new Error("Subambiente not found");
    }
    const updatedSubambiente = await subambienteRepository.update(id, data);
    return updatedSubambiente.toResponse();
}
async function deleteSubambiente(id) {
    const subambiente = await subambienteRepository.findById(id);
    if (!subambiente) {
        throw new Error("Subambiente not found");
    }
    await subambienteRepository.delete(id);
    return { message: "Subambiente deleted successfully" };
}
async function listSubambientes(ambienteId) {
    const ambiente = await ambienteRepository.findById(ambienteId);
    if (!ambiente) {
        throw new Error("Ambiente not found");
    }
    const subambientes = await subambienteRepository.findByAmbienteId(ambienteId);
    return subambientes.map(subambiente => subambiente.toResponse());
}
async function listSubambientesById(id) {
    const subambiente = await subambienteRepository.findById(id);
    if (!subambiente) {
        throw new Error("Subambiente not found");
    }
    return subambiente.toResponse();
}
//# sourceMappingURL=subambiente.service.js.map
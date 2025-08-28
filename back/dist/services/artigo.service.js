"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtigo = createArtigo;
exports.updateArtigo = updateArtigo;
exports.deleteArtigo = deleteArtigo;
exports.listArtigos = listArtigos;
exports.getArtigo = getArtigo;
const artigo_repository_1 = require("../data/repositories/artigo.repository");
const subambiente_repository_1 = require("../data/repositories/subambiente.repository");
const artigoRepository = new artigo_repository_1.ArtigoRepository();
const subambienteRepository = new subambiente_repository_1.SubambienteRepository();
async function createArtigo(subambienteId, data) {
    const subambiente = await subambienteRepository.findById(subambienteId);
    if (!subambiente) {
        throw new Error("Subambiente not found");
    }
    const artigo = await artigoRepository.create({
        ...data,
        subambienteId
    });
    return artigo.toResponse();
}
async function updateArtigo(id, data) {
    const artigo = await artigoRepository.findById(id);
    if (!artigo) {
        throw new Error("Artigo not found");
    }
    const updatedArtigo = await artigoRepository.update(id, data);
    return updatedArtigo.toResponse();
}
async function deleteArtigo(id) {
    const artigo = await artigoRepository.findById(id);
    if (!artigo) {
        throw new Error("Artigo not found");
    }
    await artigoRepository.delete(id);
    return { message: "Artigo deleted successfully" };
}
async function listArtigos(subambienteId) {
    const subambiente = await subambienteRepository.findById(subambienteId);
    if (!subambiente) {
        throw new Error("Subambiente not found");
    }
    const artigos = await artigoRepository.findBySubambienteId(subambienteId);
    return artigos.map(artigo => artigo.toResponse());
}
async function getArtigo(artigoId) {
    const artigo = await artigoRepository.findById(artigoId);
    if (!artigo) {
        throw new Error("Artigo not found");
    }
    return artigo.toResponse();
}
//# sourceMappingURL=artigo.service.js.map
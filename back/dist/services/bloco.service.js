"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBloco = createBloco;
exports.updateBloco = updateBloco;
exports.deleteBloco = deleteBloco;
exports.reorderBlocos = reorderBlocos;
const bloco_repository_1 = require("../data/repositories/bloco.repository");
const artigo_repository_1 = require("../data/repositories/artigo.repository");
const blocoRepository = new bloco_repository_1.BlocoRepository();
const artigoRepository = new artigo_repository_1.ArtigoRepository();
async function createBloco(artigoId, data) {
    const artigo = await artigoRepository.findById(artigoId);
    if (!artigo) {
        throw new Error("Artigo not found");
    }
    // If order is not provided, assign the next available order
    let order = data.order;
    if (order === undefined || order === null) {
        const maxOrder = await blocoRepository.getMaxOrder(artigoId);
        order = maxOrder + 1;
    }
    const bloco = await blocoRepository.create({
        ...data,
        order,
        artigoId
    });
    return bloco.toResponse();
}
async function updateBloco(id, data) {
    const bloco = await blocoRepository.findById(id);
    if (!bloco) {
        throw new Error("Bloco not found");
    }
    const updatedBloco = await blocoRepository.update(id, data);
    return updatedBloco.toResponse();
}
async function deleteBloco(id) {
    const bloco = await blocoRepository.findById(id);
    if (!bloco) {
        throw new Error("Bloco not found");
    }
    await blocoRepository.delete(id);
    return { message: "Bloco deleted successfully" };
}
async function reorderBlocos(artigoId, orderList) {
    const artigo = await artigoRepository.findById(artigoId);
    if (!artigo) {
        throw new Error("Artigo not found");
    }
    // Convert array of IDs to array of objects with id and order properties
    const orderObjects = orderList.map((id, index) => ({
        id,
        order: index + 1
    }));
    await blocoRepository.reorderBlocos(artigoId, orderObjects);
    return { message: "Blocos reordered successfully" };
}
//# sourceMappingURL=bloco.service.js.map
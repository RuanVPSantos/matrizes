"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtigoRepository = void 0;
const client_1 = require("@prisma/client");
const artigo_model_1 = require("../models/artigo.model");
const bloco_model_1 = require("../models/bloco.model");
const prisma = new client_1.PrismaClient();
class ArtigoRepository {
    async create(data) {
        const artigo = await prisma.artigo.create({
            data
        });
        return new artigo_model_1.Artigo(artigo.id, artigo.title, artigo.description, artigo.subambienteId, artigo.createdAt, artigo.updatedAt);
    }
    async findById(id) {
        const artigo = await prisma.artigo.findUnique({
            where: { id },
            include: {
                blocks: {
                    orderBy: { order: 'asc' }
                }
            }
        });
        if (!artigo)
            return null;
        const blocos = [];
        artigo.blocks.forEach(block => {
            blocos.push(new bloco_model_1.Bloco(block.id, block.type, block.order, block.content, block.artigoId, block.createdAt, block.updatedAt));
        });
        return new artigo_model_1.Artigo(artigo.id, artigo.title, artigo.description, artigo.subambienteId, artigo.createdAt, artigo.updatedAt, blocos);
    }
    async findBySubambienteId(subambienteId) {
        const artigos = await prisma.artigo.findMany({
            where: { subambienteId },
            include: {
                blocks: {
                    orderBy: { order: 'asc' }
                }
            }
        });
        return artigos.map(artigo => new artigo_model_1.Artigo(artigo.id, artigo.title, artigo.description, artigo.subambienteId, artigo.createdAt, artigo.updatedAt, artigo.blocks));
    }
    async update(id, data) {
        const artigo = await prisma.artigo.update({
            where: { id },
            data,
            include: {
                blocks: {
                    orderBy: { order: 'asc' }
                }
            }
        });
        return new artigo_model_1.Artigo(artigo.id, artigo.title, artigo.description, artigo.subambienteId, artigo.createdAt, artigo.updatedAt, artigo.blocks);
    }
    async delete(id) {
        await prisma.artigo.delete({
            where: { id }
        });
    }
}
exports.ArtigoRepository = ArtigoRepository;
//# sourceMappingURL=artigo.repository.js.map
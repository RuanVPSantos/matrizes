"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocoRepository = void 0;
const client_1 = require("@prisma/client");
const bloco_model_1 = require("../models/bloco.model");
const prisma = new client_1.PrismaClient();
class BlocoRepository {
    async create(data) {
        // Ensure order is always provided as a number for Prisma
        const blocoData = {
            ...data,
            order: data.order ?? 0 // Default to 0 if order is undefined
        };
        const bloco = await prisma.bloco.create({
            data: blocoData
        });
        return new bloco_model_1.Bloco(bloco.id, bloco.type, bloco.order, bloco.content, bloco.artigoId, bloco.createdAt, bloco.updatedAt);
    }
    async findById(id) {
        const bloco = await prisma.bloco.findUnique({
            where: { id }
        });
        if (!bloco)
            return null;
        return new bloco_model_1.Bloco(bloco.id, bloco.type, bloco.order, bloco.content, bloco.artigoId, bloco.createdAt, bloco.updatedAt);
    }
    async findByArtigoId(artigoId) {
        const blocos = await prisma.bloco.findMany({
            where: { artigoId },
            orderBy: { order: 'asc' }
        });
        return blocos.map(bloco => new bloco_model_1.Bloco(bloco.id, bloco.type, bloco.order, bloco.content, bloco.artigoId, bloco.createdAt, bloco.updatedAt));
    }
    async update(id, data) {
        const bloco = await prisma.bloco.update({
            where: { id },
            data
        });
        return new bloco_model_1.Bloco(bloco.id, bloco.type, bloco.order, bloco.content, bloco.artigoId, bloco.createdAt, bloco.updatedAt);
    }
    async delete(id) {
        await prisma.bloco.delete({
            where: { id }
        });
    }
    async reorderBlocos(artigoId, orderList) {
        await prisma.$transaction(orderList.map(item => prisma.bloco.update({
            where: { id: item.id },
            data: { order: item.order }
        })));
    }
    async getMaxOrder(artigoId) {
        const result = await prisma.bloco.aggregate({
            where: { artigoId },
            _max: {
                order: true
            }
        });
        return result._max.order || 0;
    }
}
exports.BlocoRepository = BlocoRepository;
//# sourceMappingURL=bloco.repository.js.map
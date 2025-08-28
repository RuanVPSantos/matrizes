"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubambienteRepository = void 0;
const client_1 = require("@prisma/client");
const subambiente_model_1 = require("../models/subambiente.model");
const prisma = new client_1.PrismaClient();
class SubambienteRepository {
    async create(data) {
        const subambiente = await prisma.subambiente.create({
            data
        });
        return new subambiente_model_1.Subambiente(subambiente.id, subambiente.name, subambiente.description, subambiente.ambienteId, subambiente.createdAt, subambiente.updatedAt);
    }
    async findById(id) {
        const subambiente = await prisma.subambiente.findUnique({
            where: { id },
            include: {
                artigos: true
            }
        });
        if (!subambiente)
            return null;
        return new subambiente_model_1.Subambiente(subambiente.id, subambiente.name, subambiente.description, subambiente.ambienteId, subambiente.createdAt, subambiente.updatedAt, subambiente.artigos);
    }
    async findByAmbienteId(ambienteId) {
        const subambientes = await prisma.subambiente.findMany({
            where: { ambienteId },
            include: {
                artigos: true
            }
        });
        return subambientes.map(subambiente => new subambiente_model_1.Subambiente(subambiente.id, subambiente.name, subambiente.description, subambiente.ambienteId, subambiente.createdAt, subambiente.updatedAt, subambiente.artigos));
    }
    async update(id, data) {
        const subambiente = await prisma.subambiente.update({
            where: { id },
            data
        });
        return new subambiente_model_1.Subambiente(subambiente.id, subambiente.name, subambiente.description, subambiente.ambienteId, subambiente.createdAt, subambiente.updatedAt);
    }
    async delete(id) {
        await prisma.subambiente.delete({
            where: { id }
        });
    }
}
exports.SubambienteRepository = SubambienteRepository;
//# sourceMappingURL=subambiente.repository.js.map
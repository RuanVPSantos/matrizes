"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbienteRepository = void 0;
const client_1 = require("@prisma/client");
const ambiente_model_1 = require("../models/ambiente.model");
const prisma = new client_1.PrismaClient();
class AmbienteRepository {
    async create(data) {
        const ambiente = await prisma.ambiente.create({
            data
        });
        return new ambiente_model_1.Ambiente(ambiente.id, ambiente.name, ambiente.description, ambiente.createdAt, ambiente.updatedAt);
    }
    async findById(id) {
        const ambiente = await prisma.ambiente.findUnique({
            where: { id },
            include: {
                subambientes: true
            }
        });
        if (!ambiente)
            return null;
        return new ambiente_model_1.Ambiente(ambiente.id, ambiente.name, ambiente.description, ambiente.createdAt, ambiente.updatedAt, ambiente.subambientes);
    }
    async findAll() {
        const ambientes = await prisma.ambiente.findMany({
            include: {
                subambientes: true
            }
        });
        return ambientes.map(ambiente => new ambiente_model_1.Ambiente(ambiente.id, ambiente.name, ambiente.description, ambiente.createdAt, ambiente.updatedAt, ambiente.subambientes));
    }
    async update(id, data) {
        const ambiente = await prisma.ambiente.update({
            where: { id },
            data
        });
        return new ambiente_model_1.Ambiente(ambiente.id, ambiente.name, ambiente.description, ambiente.createdAt, ambiente.updatedAt);
    }
    async delete(id) {
        await prisma.ambiente.delete({
            where: { id }
        });
    }
}
exports.AmbienteRepository = AmbienteRepository;
//# sourceMappingURL=ambiente.repository.js.map
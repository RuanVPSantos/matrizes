"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const user_model_1 = require("../models/user.model");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async create(data) {
        const user = await prisma.user.create({
            data
        });
        return new user_model_1.User(user.id, user.name, user.email, user.password, user.role, user.blocked, user.createdAt, user.updatedAt);
    }
    async findById(id) {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user)
            return null;
        return new user_model_1.User(user.id, user.name, user.email, user.password, user.role, user.blocked, user.createdAt, user.updatedAt);
    }
    async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user)
            return null;
        return new user_model_1.User(user.id, user.name, user.email, user.password, user.role, user.blocked, user.createdAt, user.updatedAt);
    }
    async findAll() {
        const users = await prisma.user.findMany();
        return users.map(user => new user_model_1.User(user.id, user.name, user.email, user.password, user.role, user.blocked, user.createdAt, user.updatedAt));
    }
    async update(id, data) {
        const user = await prisma.user.update({
            where: { id },
            data
        });
        return new user_model_1.User(user.id, user.name, user.email, user.password, user.role, user.blocked, user.createdAt, user.updatedAt);
    }
    async delete(id) {
        await prisma.user.delete({
            where: { id }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map
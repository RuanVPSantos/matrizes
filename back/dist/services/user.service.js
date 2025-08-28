"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.blockUser = blockUser;
exports.unblockUser = unblockUser;
const user_repository_1 = require("../data/repositories/user.repository");
const auth_1 = require("../utils/auth");
const userRepository = new user_repository_1.UserRepository();
async function getAllUsers() {
    const users = await userRepository.findAll();
    return users.map(user => user.toResponse());
}
async function getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user.toResponse();
}
async function updateUser(id, data) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    if (data.password) {
        data.password = await auth_1.Auth.hashPassword(data.password);
    }
    const updatedUser = await userRepository.update(id, data);
    return updatedUser.toResponse();
}
async function deleteUser(id) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    await userRepository.delete(id);
    return { message: "User deleted successfully" };
}
async function blockUser(id) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    const updatedUser = await userRepository.update(id, { blocked: true });
    return updatedUser.toResponse();
}
async function unblockUser(id) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    const updatedUser = await userRepository.update(id, { blocked: false });
    return updatedUser.toResponse();
}
//# sourceMappingURL=user.service.js.map
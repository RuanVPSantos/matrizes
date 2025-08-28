"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.renewToken = renewToken;
const user_repository_1 = require("../data/repositories/user.repository");
const auth_1 = require("../utils/auth");
const client_1 = require("@prisma/client");
const userRepository = new user_repository_1.UserRepository();
async function registerUser(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
        throw new Error("User already exists with this email");
    }
    const hashedPassword = await auth_1.Auth.hashPassword(data.password);
    const user = await userRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: client_1.Role.USER
    });
    return user.toResponse();
}
async function loginUser(data) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    if (user.blocked) {
        throw new Error("User is blocked");
    }
    const isValidPassword = await auth_1.Auth.comparePassword(data.password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid credentials");
    }
    return user.responseJwtToken();
}
async function renewToken(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    if (user.blocked) {
        throw new Error("User is blocked");
    }
    return user.createJwtToken();
}
//# sourceMappingURL=auth.service.js.map
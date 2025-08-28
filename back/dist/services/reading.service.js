"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markBlocoAsRead = markBlocoAsRead;
exports.listReadBlocos = listReadBlocos;
const reading_repository_1 = require("../data/repositories/reading.repository");
const bloco_repository_1 = require("../data/repositories/bloco.repository");
const user_repository_1 = require("../data/repositories/user.repository");
const readingRepository = new reading_repository_1.ReadingRepository();
const blocoRepository = new bloco_repository_1.BlocoRepository();
const userRepository = new user_repository_1.UserRepository();
async function markBlocoAsRead(userId, blocoId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const bloco = await blocoRepository.findById(blocoId);
    if (!bloco) {
        throw new Error("Bloco not found");
    }
    await readingRepository.markBlocoAsRead(userId, blocoId);
    return { message: "Bloco marked as read" };
}
async function listReadBlocos(userId, artigoId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const readBlocos = await readingRepository.listReadBlocos(userId, artigoId);
    return readBlocos;
}
//# sourceMappingURL=reading.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
exports.listFavorites = listFavorites;
const favorite_repository_1 = require("../data/repositories/favorite.repository");
const artigo_repository_1 = require("../data/repositories/artigo.repository");
const user_repository_1 = require("../data/repositories/user.repository");
const favoriteRepository = new favorite_repository_1.FavoriteRepository();
const artigoRepository = new artigo_repository_1.ArtigoRepository();
const userRepository = new user_repository_1.UserRepository();
async function addFavorite(userId, artigoId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const artigo = await artigoRepository.findById(artigoId);
    if (!artigo) {
        throw new Error("Artigo not found");
    }
    const isFavorite = await favoriteRepository.isFavorite(userId, artigoId);
    if (isFavorite) {
        throw new Error("Artigo is already in favorites");
    }
    await favoriteRepository.addFavorite(userId, artigoId);
    return { message: "Artigo added to favorites" };
}
async function removeFavorite(userId, artigoId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const isFavorite = await favoriteRepository.isFavorite(userId, artigoId);
    if (!isFavorite) {
        throw new Error("Artigo is not in favorites");
    }
    await favoriteRepository.removeFavorite(userId, artigoId);
    return { message: "Artigo removed from favorites" };
}
async function listFavorites(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const favorites = await favoriteRepository.listFavorites(userId);
    return favorites;
}
//# sourceMappingURL=favorite.service.js.map
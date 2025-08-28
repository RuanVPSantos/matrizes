"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FavoriteRepository {
    async addFavorite(userId, artigoId) {
        await prisma.favorite.create({
            data: {
                userId,
                artigoId
            }
        });
    }
    async removeFavorite(userId, artigoId) {
        await prisma.favorite.delete({
            where: {
                userId_artigoId: {
                    userId,
                    artigoId
                }
            }
        });
    }
    async listFavorites(userId) {
        const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: {
                artigo: {
                    include: {
                        subambiente: {
                            include: {
                                ambiente: true
                            }
                        }
                    }
                }
            }
        });
        return favorites.map(fav => fav.artigo);
    }
    async isFavorite(userId, artigoId) {
        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_artigoId: {
                    userId,
                    artigoId
                }
            }
        });
        return !!favorite;
    }
}
exports.FavoriteRepository = FavoriteRepository;
//# sourceMappingURL=favorite.repository.js.map
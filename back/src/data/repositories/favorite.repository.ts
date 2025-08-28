import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FavoriteRepository {
  async addFavorite(userId: number, artigoId: number): Promise<void> {
    await prisma.favorite.create({
      data: {
        userId,
        artigoId
      }
    });
  }

  async removeFavorite(userId: number, artigoId: number): Promise<void> {
    await prisma.favorite.delete({
      where: {
        userId_artigoId: {
          userId,
          artigoId
        }
      }
    });
  }

  async listFavorites(userId: number): Promise<any[]> {
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

  async isFavorite(userId: number, artigoId: number): Promise<boolean> {
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

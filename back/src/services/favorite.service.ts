import { FavoriteRepository } from "../data/repositories/favorite.repository";
import { ArtigoRepository } from "../data/repositories/artigo.repository";
import { UserRepository } from "../data/repositories/user.repository";

const favoriteRepository = new FavoriteRepository();
const artigoRepository = new ArtigoRepository();
const userRepository = new UserRepository();

export async function addFavorite(userId: number, artigoId: number) {
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

export async function removeFavorite(userId: number, artigoId: number) {
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

export async function listFavorites(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const favorites = await favoriteRepository.listFavorites(userId);
  return favorites;
}

import { FastifyRequest, FastifyReply } from "fastify";
import * as favoriteService from "../../services/favorite.service";

export async function addFavoriteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user?.id) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }
    const { artigoId } = request.body as any;
    const result = await favoriteService.addFavorite(Number(request.user.id), Number(artigoId));
    reply.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function removeFavoriteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user?.id) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }
    const { artigoId } = request.body as any;
    const result = await favoriteService.removeFavorite(Number(request.user.id), Number(artigoId));
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function listFavoritesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user?.id) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }
    const favorites = await favoriteService.listFavorites(Number(request.user.id));
    reply.status(200).send(favorites);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

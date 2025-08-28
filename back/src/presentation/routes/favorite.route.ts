import { FastifyInstance } from "fastify";
import { addFavoriteController, removeFavoriteController, listFavoritesController } from "../controllers/favorite.controller";
import { addFavoriteSchema, removeFavoriteSchema, listFavoritesSchema } from "../schemas/favorite.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function favoriteRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/favorites",
    {
      preHandler: authMiddleware,
      schema: zodToFastify(addFavoriteSchema)
    },
    addFavoriteController
  );

  fastify.delete(
    "/favorites",
    {
      preHandler: authMiddleware,
      schema: zodToFastify(removeFavoriteSchema)
    },
    removeFavoriteController
  );

  fastify.get(
    "/favorites",
    {
      preHandler: authMiddleware,
      schema: zodToFastify(listFavoritesSchema)
    },
    listFavoritesController
  );
}

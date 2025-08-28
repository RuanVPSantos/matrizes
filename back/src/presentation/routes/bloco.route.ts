import { FastifyInstance } from "fastify";
import { createBlocoController, updateBlocoController, deleteBlocoController, reorderBlocosController } from "../controllers/bloco.controller";
import { createBlocoSchema, updateBlocoSchema, deleteBlocoSchema, reorderBlocosSchema } from "../schemas/bloco.schema";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function blocoRoutes(fastify: FastifyInstance) {
  // Admin routes
  fastify.post(
    "/artigos/:artigoId/blocos",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(createBlocoSchema)
    },
    createBlocoController
  );

  fastify.put(
    "/blocos/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(updateBlocoSchema)
    },
    updateBlocoController
  );

  fastify.delete(
    "/blocos/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(deleteBlocoSchema)
    },
    deleteBlocoController
  );

  fastify.patch(
    "/artigos/:artigoId/blocos/reorder",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(reorderBlocosSchema)
    },
    reorderBlocosController
  );
}

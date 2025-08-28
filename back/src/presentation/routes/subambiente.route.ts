import { FastifyInstance } from "fastify";
import { createSubambienteController, updateSubambienteController, deleteSubambienteController, listSubambientesController, listSubambientesByIdController } from "../controllers/subambiente.controller";
import { createSubambienteSchema, updateSubambienteSchema, deleteSubambienteSchema, listSubambientesSchema, listSubambientesByIdSchema } from "../schemas/subambiente.schema";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function subambienteRoutes(fastify: FastifyInstance) {
  // Public routes
  fastify.get(
    "/ambientes/:ambienteId/subambientes",
    {
      schema: zodToFastify(listSubambientesSchema)
    },
    listSubambientesController
  );

  // Admin routes
  fastify.post(
    "/ambientes/:ambienteId/subambientes",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(createSubambienteSchema)
    },
    createSubambienteController
  );

  fastify.put(
    "/subambientes/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(updateSubambienteSchema)
    },
    updateSubambienteController
  );

  fastify.delete(
    "/subambientes/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(deleteSubambienteSchema)
    },
    deleteSubambienteController
  );

  fastify.get(
    "/subambientes/:id",
    {
      schema: zodToFastify(listSubambientesByIdSchema)
    },
    listSubambientesByIdController
  );
}

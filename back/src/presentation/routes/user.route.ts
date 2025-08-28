import { FastifyInstance } from "fastify";
import { getAllUsersController, getUserByIdController, updateUserController, deleteUserController, blockUserController, unblockUserController } from "../controllers/user.controller";
import { getUserByIdSchema, updateUserSchema, deleteUserSchema } from "../schemas/user.schema";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/users",
    {
      preHandler: [authMiddleware, adminMiddleware]
    },
    getAllUsersController
  );

  fastify.get(
    "/users/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(getUserByIdSchema)
    },
    getUserByIdController
  );

  fastify.put(
    "/users/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(updateUserSchema)
    },
    updateUserController
  );

  fastify.delete(
    "/users/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(deleteUserSchema)
    },
    deleteUserController
  );

  fastify.patch(
    "/users/:id/block",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(deleteUserSchema)
    },
    blockUserController
  );

  fastify.patch(
    "/users/:id/unblock",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: zodToFastify(deleteUserSchema)
    },
    unblockUserController
  );
}

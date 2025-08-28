import { FastifyInstance } from "fastify";
import { registerController, loginController, renewTokenController } from "../controllers/auth.controller";
import { registerSchema, loginSchema, renewTokenSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/auth/register",
    {
      schema: {
        ...zodToFastify(registerSchema),
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string", enum: ["ADMIN", "USER"] },
              blocked: { type: "boolean" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" }
            }
          },
          400: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      }
    },
    registerController
  );

  fastify.post(
    "/auth/login",
    {
      schema: {
        ...zodToFastify(loginSchema),
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string", enum: ["ADMIN", "USER"] },
              blocked: { type: "boolean" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
              token: { type: "string" }
            }
          },
          400: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      }
    },
    loginController
  );

  fastify.post(
    "/auth/renew-token",
    {
      preHandler: authMiddleware,
      schema: {
        ...zodToFastify(renewTokenSchema),
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" }
            }
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      }
    },
    renewTokenController
  );
}

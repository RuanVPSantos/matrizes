"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const auth_controller_1 = require("../controllers/auth.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function authRoutes(fastify) {
    fastify.post("/auth/register", {
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(auth_schema_1.registerSchema),
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
    }, auth_controller_1.registerController);
    fastify.post("/auth/login", {
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(auth_schema_1.loginSchema),
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
    }, auth_controller_1.loginController);
    fastify.post("/auth/renew-token", {
        preHandler: auth_middleware_1.authMiddleware,
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(auth_schema_1.renewTokenSchema),
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
    }, auth_controller_1.renewTokenController);
}
//# sourceMappingURL=auth.route.js.map
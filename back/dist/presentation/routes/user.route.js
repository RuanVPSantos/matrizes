"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schemas/user.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function userRoutes(fastify) {
    fastify.get("/users", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware]
    }, user_controller_1.getAllUsersController);
    fastify.get("/users/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(user_schema_1.getUserByIdSchema)
    }, user_controller_1.getUserByIdController);
    fastify.put("/users/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(user_schema_1.updateUserSchema)
    }, user_controller_1.updateUserController);
    fastify.delete("/users/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(user_schema_1.deleteUserSchema)
    }, user_controller_1.deleteUserController);
    fastify.patch("/users/:id/block", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(user_schema_1.deleteUserSchema)
    }, user_controller_1.blockUserController);
    fastify.patch("/users/:id/unblock", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(user_schema_1.deleteUserSchema)
    }, user_controller_1.unblockUserController);
}
//# sourceMappingURL=user.route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blocoRoutes;
const bloco_controller_1 = require("../controllers/bloco.controller");
const bloco_schema_1 = require("../schemas/bloco.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function blocoRoutes(fastify) {
    // Admin routes
    fastify.post("/artigos/:artigoId/blocos", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(bloco_schema_1.createBlocoSchema)
    }, bloco_controller_1.createBlocoController);
    fastify.put("/blocos/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(bloco_schema_1.updateBlocoSchema)
    }, bloco_controller_1.updateBlocoController);
    fastify.delete("/blocos/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(bloco_schema_1.deleteBlocoSchema)
    }, bloco_controller_1.deleteBlocoController);
    fastify.patch("/artigos/:artigoId/blocos/reorder", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(bloco_schema_1.reorderBlocosSchema)
    }, bloco_controller_1.reorderBlocosController);
}
//# sourceMappingURL=bloco.route.js.map
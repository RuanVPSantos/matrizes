"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = readingRoutes;
const reading_controller_1 = require("../controllers/reading.controller");
const reading_schema_1 = require("../schemas/reading.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function readingRoutes(fastify) {
    fastify.post("/readings", {
        preHandler: auth_middleware_1.authMiddleware,
        schema: (0, zod_fastify_1.zodToFastify)(reading_schema_1.markBlocoAsReadSchema)
    }, reading_controller_1.markBlocoAsReadController);
    fastify.get("/artigos/:artigoId/readings", {
        preHandler: auth_middleware_1.authMiddleware,
        schema: (0, zod_fastify_1.zodToFastify)(reading_schema_1.listReadBlocosSchema)
    }, reading_controller_1.listReadBlocosController);
}
//# sourceMappingURL=reading.route.js.map
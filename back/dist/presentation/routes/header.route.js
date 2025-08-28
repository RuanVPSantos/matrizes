"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = headerRoutes;
const header_controller_1 = require("../controllers/header.controller");
async function headerRoutes(fastify) {
    fastify.get("/header", {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            description: { type: "string", nullable: true },
                            subambientes: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "number" },
                                        name: { type: "string" },
                                        description: { type: "string", nullable: true },
                                        artigos: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    id: { type: "number" },
                                                    title: { type: "string" },
                                                    description: { type: "string", nullable: true }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, header_controller_1.getHeaderController);
}
//# sourceMappingURL=header.route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAmbientesByIdSchema = exports.getAmbienteSchema = exports.deleteAmbienteSchema = exports.updateAmbienteSchema = exports.createAmbienteSchema = void 0;
const zod_1 = require("zod");
exports.createAmbienteSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
        description: zod_1.z.string().optional()
    })
});
exports.updateAmbienteSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().optional()
    })
});
exports.deleteAmbienteSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.getAmbienteSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.listAmbientesByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
//# sourceMappingURL=ambiente.schema.js.map
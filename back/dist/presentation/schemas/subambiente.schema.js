"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSubambientesByIdSchema = exports.listSubambientesSchema = exports.deleteSubambienteSchema = exports.updateSubambienteSchema = exports.createSubambienteSchema = void 0;
const zod_1 = require("zod");
exports.createSubambienteSchema = zod_1.z.object({
    params: zod_1.z.object({
        ambienteId: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
        description: zod_1.z.string().optional()
    })
});
exports.updateSubambienteSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().optional()
    })
});
exports.deleteSubambienteSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.listSubambientesSchema = zod_1.z.object({
    params: zod_1.z.object({
        ambienteId: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.listSubambientesByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
//# sourceMappingURL=subambiente.schema.js.map
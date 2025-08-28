"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtigoSchema = exports.listArtigosSchema = exports.deleteArtigoSchema = exports.updateArtigoSchema = exports.createArtigoSchema = void 0;
const zod_1 = require("zod");
exports.createArtigoSchema = zod_1.z.object({
    params: zod_1.z.object({
        subambienteId: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().min(2, "Title must be at least 2 characters"),
        description: zod_1.z.string().optional()
    })
});
exports.updateArtigoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().optional()
    })
});
exports.deleteArtigoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.listArtigosSchema = zod_1.z.object({
    params: zod_1.z.object({
        subambienteId: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.getArtigoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
//# sourceMappingURL=artigo.schema.js.map
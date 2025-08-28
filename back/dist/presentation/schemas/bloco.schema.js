"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderBlocosSchema = exports.deleteBlocoSchema = exports.updateBlocoSchema = exports.createBlocoSchema = void 0;
const zod_1 = require("zod");
exports.createBlocoSchema = zod_1.z.object({
    params: zod_1.z.object({
        artigoId: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        type: zod_1.z.enum(["TEXTO", "IMAGEM", "VIDEO"]),
        order: zod_1.z.number().int().min(0).optional(),
        content: zod_1.z.any()
    })
});
exports.updateBlocoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        type: zod_1.z.enum(["TEXTO", "IMAGEM", "VIDEO"]).optional(),
        order: zod_1.z.number().int().min(0).optional(),
        content: zod_1.z.any().optional()
    })
});
exports.deleteBlocoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(val => parseInt(val))
    })
});
exports.reorderBlocosSchema = zod_1.z.object({
    params: zod_1.z.object({
        artigoId: zod_1.z.string().transform(val => parseInt(val))
    }),
    body: zod_1.z.object({
        orderList: zod_1.z.array(zod_1.z.number().int())
    })
});
//# sourceMappingURL=bloco.schema.js.map
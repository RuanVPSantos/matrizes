"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReadBlocosSchema = exports.markBlocoAsReadSchema = void 0;
const zod_1 = require("zod");
exports.markBlocoAsReadSchema = zod_1.z.object({
    body: zod_1.z.object({
        blocoId: zod_1.z.number().int().positive()
    })
});
exports.listReadBlocosSchema = zod_1.z.object({
    params: zod_1.z.object({
        artigoId: zod_1.z.string().transform(val => parseInt(val))
    }),
    headers: zod_1.z.object({
        authorization: zod_1.z.string()
    })
});
//# sourceMappingURL=reading.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerResponseSchema = exports.headerAmbienteSchema = exports.headerSubambienteSchema = exports.headerArtigoSchema = exports.blocoResponseSchema = exports.blocoContentSchema = exports.blocoStyleSchema = exports.artigoResponseSchema = exports.subambienteResponseSchema = exports.ambienteResponseSchema = exports.tokenResponseSchema = exports.userWithTokenResponseSchema = exports.userResponseSchema = exports.errorResponseSchema = exports.messageResponseSchema = void 0;
const zod_1 = require("zod");
// Common response schemas
exports.messageResponseSchema = zod_1.z.object({
    message: zod_1.z.string()
});
exports.errorResponseSchema = zod_1.z.object({
    message: zod_1.z.string()
});
// User response schemas
exports.userResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.enum(["ADMIN", "USER"]),
    blocked: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
});
exports.userWithTokenResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.enum(["ADMIN", "USER"]),
    blocked: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    token: zod_1.z.string()
});
exports.tokenResponseSchema = zod_1.z.object({
    token: zod_1.z.string()
});
// Content response schemas
exports.ambienteResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    subambientes: zod_1.z.array(zod_1.z.any()).optional()
});
exports.subambienteResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    ambienteId: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    artigos: zod_1.z.array(zod_1.z.any()).optional()
});
exports.artigoResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    subambienteId: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    blocks: zod_1.z.array(zod_1.z.any()).optional()
});
exports.blocoStyleSchema = zod_1.z.object({
    fontSize: zod_1.z.enum(["small", "medium", "large", "xlarge"]).optional(),
    textAlign: zod_1.z.enum(["left", "center", "right", "justify"]).optional(),
    fontWeight: zod_1.z.enum(["normal", "bold"]).optional(),
    fontStyle: zod_1.z.enum(["normal", "italic"]).optional(),
    color: zod_1.z.string().optional(),
    backgroundColor: zod_1.z.string().optional(),
    width: zod_1.z.string().optional(),
    height: zod_1.z.string().optional()
});
exports.blocoContentSchema = zod_1.z.object({
    text: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    alt: zod_1.z.string().optional(),
    caption: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    duration: zod_1.z.string().optional(),
    style: exports.blocoStyleSchema.optional()
});
exports.blocoResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    type: zod_1.z.enum(["TEXTO", "IMAGEM", "VIDEO"]),
    order: zod_1.z.number(),
    content: exports.blocoContentSchema,
    artigoId: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
});
// Header response schema
exports.headerArtigoSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable()
});
exports.headerSubambienteSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    artigos: zod_1.z.array(exports.headerArtigoSchema)
});
exports.headerAmbienteSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    subambientes: zod_1.z.array(exports.headerSubambienteSchema)
});
exports.headerResponseSchema = zod_1.z.array(exports.headerAmbienteSchema);
//# sourceMappingURL=response.schema.js.map
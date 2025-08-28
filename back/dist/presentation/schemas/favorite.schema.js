"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFavoritesSchema = exports.removeFavoriteSchema = exports.addFavoriteSchema = void 0;
const zod_1 = require("zod");
exports.addFavoriteSchema = zod_1.z.object({
    body: zod_1.z.object({
        artigoId: zod_1.z.number().int().positive()
    })
});
exports.removeFavoriteSchema = zod_1.z.object({
    body: zod_1.z.object({
        artigoId: zod_1.z.number().int().positive()
    })
});
exports.listFavoritesSchema = zod_1.z.object({
    headers: zod_1.z.object({
        authorization: zod_1.z.string()
    })
});
//# sourceMappingURL=favorite.schema.js.map
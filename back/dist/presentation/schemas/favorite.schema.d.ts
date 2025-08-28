import { z } from "zod";
export declare const addFavoriteSchema: z.ZodObject<{
    body: z.ZodObject<{
        artigoId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        artigoId: number;
    }, {
        artigoId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        artigoId: number;
    };
}, {
    body: {
        artigoId: number;
    };
}>;
export declare const removeFavoriteSchema: z.ZodObject<{
    body: z.ZodObject<{
        artigoId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        artigoId: number;
    }, {
        artigoId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        artigoId: number;
    };
}, {
    body: {
        artigoId: number;
    };
}>;
export declare const listFavoritesSchema: z.ZodObject<{
    headers: z.ZodObject<{
        authorization: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        authorization: string;
    }, {
        authorization: string;
    }>;
}, "strip", z.ZodTypeAny, {
    headers: {
        authorization: string;
    };
}, {
    headers: {
        authorization: string;
    };
}>;
//# sourceMappingURL=favorite.schema.d.ts.map
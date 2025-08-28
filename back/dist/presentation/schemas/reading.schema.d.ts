import { z } from "zod";
export declare const markBlocoAsReadSchema: z.ZodObject<{
    body: z.ZodObject<{
        blocoId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        blocoId: number;
    }, {
        blocoId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        blocoId: number;
    };
}, {
    body: {
        blocoId: number;
    };
}>;
export declare const listReadBlocosSchema: z.ZodObject<{
    params: z.ZodObject<{
        artigoId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        artigoId: number;
    }, {
        artigoId: string;
    }>;
    headers: z.ZodObject<{
        authorization: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        authorization: string;
    }, {
        authorization: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        artigoId: number;
    };
    headers: {
        authorization: string;
    };
}, {
    params: {
        artigoId: string;
    };
    headers: {
        authorization: string;
    };
}>;
//# sourceMappingURL=reading.schema.d.ts.map
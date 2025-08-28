import { z } from "zod";
export declare const createBlocoSchema: z.ZodObject<{
    params: z.ZodObject<{
        artigoId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        artigoId: number;
    }, {
        artigoId: string;
    }>;
    body: z.ZodObject<{
        type: z.ZodEnum<["TEXTO", "IMAGEM", "VIDEO"]>;
        order: z.ZodOptional<z.ZodNumber>;
        content: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        type: "TEXTO" | "IMAGEM" | "VIDEO";
        order?: number | undefined;
        content?: any;
    }, {
        type: "TEXTO" | "IMAGEM" | "VIDEO";
        order?: number | undefined;
        content?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        type: "TEXTO" | "IMAGEM" | "VIDEO";
        order?: number | undefined;
        content?: any;
    };
    params: {
        artigoId: number;
    };
}, {
    body: {
        type: "TEXTO" | "IMAGEM" | "VIDEO";
        order?: number | undefined;
        content?: any;
    };
    params: {
        artigoId: string;
    };
}>;
export declare const updateBlocoSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<["TEXTO", "IMAGEM", "VIDEO"]>>;
        order: z.ZodOptional<z.ZodNumber>;
        content: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type?: "TEXTO" | "IMAGEM" | "VIDEO" | undefined;
        order?: number | undefined;
        content?: any;
    }, {
        type?: "TEXTO" | "IMAGEM" | "VIDEO" | undefined;
        order?: number | undefined;
        content?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        type?: "TEXTO" | "IMAGEM" | "VIDEO" | undefined;
        order?: number | undefined;
        content?: any;
    };
    params: {
        id: number;
    };
}, {
    body: {
        type?: "TEXTO" | "IMAGEM" | "VIDEO" | undefined;
        order?: number | undefined;
        content?: any;
    };
    params: {
        id: string;
    };
}>;
export declare const deleteBlocoSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const reorderBlocosSchema: z.ZodObject<{
    params: z.ZodObject<{
        artigoId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        artigoId: number;
    }, {
        artigoId: string;
    }>;
    body: z.ZodObject<{
        orderList: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        orderList: number[];
    }, {
        orderList: number[];
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        orderList: number[];
    };
    params: {
        artigoId: number;
    };
}, {
    body: {
        orderList: number[];
    };
    params: {
        artigoId: string;
    };
}>;
//# sourceMappingURL=bloco.schema.d.ts.map
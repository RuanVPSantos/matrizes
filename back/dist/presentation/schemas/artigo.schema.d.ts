import { z } from "zod";
export declare const createArtigoSchema: z.ZodObject<{
    params: z.ZodObject<{
        subambienteId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        subambienteId: number;
    }, {
        subambienteId: string;
    }>;
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description?: string | undefined;
    }, {
        title: string;
        description?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        title: string;
        description?: string | undefined;
    };
    params: {
        subambienteId: number;
    };
}, {
    body: {
        title: string;
        description?: string | undefined;
    };
    params: {
        subambienteId: string;
    };
}>;
export declare const updateArtigoSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        title?: string | undefined;
    }, {
        description?: string | undefined;
        title?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        description?: string | undefined;
        title?: string | undefined;
    };
    params: {
        id: number;
    };
}, {
    body: {
        description?: string | undefined;
        title?: string | undefined;
    };
    params: {
        id: string;
    };
}>;
export declare const deleteArtigoSchema: z.ZodObject<{
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
export declare const listArtigosSchema: z.ZodObject<{
    params: z.ZodObject<{
        subambienteId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        subambienteId: number;
    }, {
        subambienteId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        subambienteId: number;
    };
}, {
    params: {
        subambienteId: string;
    };
}>;
export declare const getArtigoSchema: z.ZodObject<{
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
//# sourceMappingURL=artigo.schema.d.ts.map
import { z } from "zod";
export declare const createSubambienteSchema: z.ZodObject<{
    params: z.ZodObject<{
        ambienteId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        ambienteId: number;
    }, {
        ambienteId: string;
    }>;
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description?: string | undefined;
    }, {
        name: string;
        description?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        description?: string | undefined;
    };
    params: {
        ambienteId: number;
    };
}, {
    body: {
        name: string;
        description?: string | undefined;
    };
    params: {
        ambienteId: string;
    };
}>;
export declare const updateSubambienteSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
    };
    params: {
        id: number;
    };
}, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
    };
    params: {
        id: string;
    };
}>;
export declare const deleteSubambienteSchema: z.ZodObject<{
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
export declare const listSubambientesSchema: z.ZodObject<{
    params: z.ZodObject<{
        ambienteId: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        ambienteId: number;
    }, {
        ambienteId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        ambienteId: number;
    };
}, {
    params: {
        ambienteId: string;
    };
}>;
export declare const listSubambientesByIdSchema: z.ZodObject<{
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
//# sourceMappingURL=subambiente.schema.d.ts.map
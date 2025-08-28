import { z } from "zod";
export declare const getUserByIdSchema: z.ZodObject<{
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
export declare const updateUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodEnum<["ADMIN", "USER"]>>;
        blocked: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        role?: "ADMIN" | "USER" | undefined;
        name?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        blocked?: boolean | undefined;
    }, {
        role?: "ADMIN" | "USER" | undefined;
        name?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        blocked?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        role?: "ADMIN" | "USER" | undefined;
        name?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        blocked?: boolean | undefined;
    };
    params: {
        id: number;
    };
}, {
    body: {
        role?: "ADMIN" | "USER" | undefined;
        name?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        blocked?: boolean | undefined;
    };
    params: {
        id: string;
    };
}>;
export declare const deleteUserSchema: z.ZodObject<{
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
//# sourceMappingURL=user.schema.d.ts.map
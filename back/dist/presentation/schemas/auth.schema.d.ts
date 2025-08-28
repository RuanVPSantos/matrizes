import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        password: string;
    }, {
        name: string;
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const renewTokenSchema: z.ZodObject<{
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
//# sourceMappingURL=auth.schema.d.ts.map
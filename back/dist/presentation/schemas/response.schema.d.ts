import { z } from "zod";
export declare const messageResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export declare const errorResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export declare const userResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    blocked: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    role: "ADMIN" | "USER";
    name: string;
    email: string;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}, {
    id: number;
    role: "ADMIN" | "USER";
    name: string;
    email: string;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}>;
export declare const userWithTokenResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    blocked: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    role: "ADMIN" | "USER";
    name: string;
    email: string;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    token: string;
}, {
    id: number;
    role: "ADMIN" | "USER";
    name: string;
    email: string;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    token: string;
}>;
export declare const tokenResponseSchema: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export declare const ambienteResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    subambientes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    subambientes?: any[] | undefined;
}, {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    subambientes?: any[] | undefined;
}>;
export declare const subambienteResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    ambienteId: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    artigos: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    ambienteId: number;
    artigos?: any[] | undefined;
}, {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    ambienteId: number;
    artigos?: any[] | undefined;
}>;
export declare const artigoResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    subambienteId: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    blocks: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    title: string;
    subambienteId: number;
    blocks?: any[] | undefined;
}, {
    id: number;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    title: string;
    subambienteId: number;
    blocks?: any[] | undefined;
}>;
export declare const blocoStyleSchema: z.ZodObject<{
    fontSize: z.ZodOptional<z.ZodEnum<["small", "medium", "large", "xlarge"]>>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
    fontWeight: z.ZodOptional<z.ZodEnum<["normal", "bold"]>>;
    fontStyle: z.ZodOptional<z.ZodEnum<["normal", "italic"]>>;
    color: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
    textAlign?: "left" | "center" | "right" | "justify" | undefined;
    fontWeight?: "bold" | "normal" | undefined;
    fontStyle?: "normal" | "italic" | undefined;
    color?: string | undefined;
    backgroundColor?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
}, {
    fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
    textAlign?: "left" | "center" | "right" | "justify" | undefined;
    fontWeight?: "bold" | "normal" | undefined;
    fontStyle?: "normal" | "italic" | undefined;
    color?: string | undefined;
    backgroundColor?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
}>;
export declare const blocoContentSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    alt: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        fontSize: z.ZodOptional<z.ZodEnum<["small", "medium", "large", "xlarge"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "bold"]>>;
        fontStyle: z.ZodOptional<z.ZodEnum<["normal", "italic"]>>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodString>;
        height: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        fontWeight?: "bold" | "normal" | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        color?: string | undefined;
        backgroundColor?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
    }, {
        fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        fontWeight?: "bold" | "normal" | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        color?: string | undefined;
        backgroundColor?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    title?: string | undefined;
    text?: string | undefined;
    alt?: string | undefined;
    caption?: string | undefined;
    duration?: string | undefined;
    style?: {
        fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        fontWeight?: "bold" | "normal" | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        color?: string | undefined;
        backgroundColor?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
    } | undefined;
}, {
    url?: string | undefined;
    title?: string | undefined;
    text?: string | undefined;
    alt?: string | undefined;
    caption?: string | undefined;
    duration?: string | undefined;
    style?: {
        fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        fontWeight?: "bold" | "normal" | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        color?: string | undefined;
        backgroundColor?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
    } | undefined;
}>;
export declare const blocoResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    type: z.ZodEnum<["TEXTO", "IMAGEM", "VIDEO"]>;
    order: z.ZodNumber;
    content: z.ZodObject<{
        text: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
        duration: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodObject<{
            fontSize: z.ZodOptional<z.ZodEnum<["small", "medium", "large", "xlarge"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "bold"]>>;
            fontStyle: z.ZodOptional<z.ZodEnum<["normal", "italic"]>>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            width: z.ZodOptional<z.ZodString>;
            height: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            fontWeight?: "bold" | "normal" | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            color?: string | undefined;
            backgroundColor?: string | undefined;
            width?: string | undefined;
            height?: string | undefined;
        }, {
            fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            fontWeight?: "bold" | "normal" | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            color?: string | undefined;
            backgroundColor?: string | undefined;
            width?: string | undefined;
            height?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        title?: string | undefined;
        text?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        duration?: string | undefined;
        style?: {
            fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            fontWeight?: "bold" | "normal" | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            color?: string | undefined;
            backgroundColor?: string | undefined;
            width?: string | undefined;
            height?: string | undefined;
        } | undefined;
    }, {
        url?: string | undefined;
        title?: string | undefined;
        text?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        duration?: string | undefined;
        style?: {
            fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            fontWeight?: "bold" | "normal" | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            color?: string | undefined;
            backgroundColor?: string | undefined;
            width?: string | undefined;
            height?: string | undefined;
        } | undefined;
    }>;
    artigoId: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: string;
    updatedAt: string;
    type: "TEXTO" | "IMAGEM" | "VIDEO";
    order: number;
    content: {
        url?: string | undefined;
        title?: string | undefined;
        text?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        duration?: string | undefined;
        style?: {
            fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            fontWeight?: "bold" | "normal" | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            color?: string | undefined;
            backgroundColor?: string | undefined;
            width?: string | undefined;
            height?: string | undefined;
        } | undefined;
    };
    artigoId: number;
}, {
    id: number;
    createdAt: string;
    updatedAt: string;
    type: "TEXTO" | "IMAGEM" | "VIDEO";
    order: number;
    content: {
        url?: string | undefined;
        title?: string | undefined;
        text?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        duration?: string | undefined;
        style?: {
            fontSize?: "small" | "medium" | "large" | "xlarge" | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            fontWeight?: "bold" | "normal" | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            color?: string | undefined;
            backgroundColor?: string | undefined;
            width?: string | undefined;
            height?: string | undefined;
        } | undefined;
    };
    artigoId: number;
}>;
export declare const headerArtigoSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    description: string | null;
    title: string;
}, {
    id: number;
    description: string | null;
    title: string;
}>;
export declare const headerSubambienteSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    artigos: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        description: string | null;
        title: string;
    }, {
        id: number;
        description: string | null;
        title: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    description: string | null;
    artigos: {
        id: number;
        description: string | null;
        title: string;
    }[];
}, {
    id: number;
    name: string;
    description: string | null;
    artigos: {
        id: number;
        description: string | null;
        title: string;
    }[];
}>;
export declare const headerAmbienteSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    subambientes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        artigos: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            title: z.ZodString;
            description: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            description: string | null;
            title: string;
        }, {
            id: number;
            description: string | null;
            title: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }, {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    description: string | null;
    subambientes: {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }[];
}, {
    id: number;
    name: string;
    description: string | null;
    subambientes: {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }[];
}>;
export declare const headerResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    subambientes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        artigos: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            title: z.ZodString;
            description: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            description: string | null;
            title: string;
        }, {
            id: number;
            description: string | null;
            title: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }, {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    description: string | null;
    subambientes: {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }[];
}, {
    id: number;
    name: string;
    description: string | null;
    subambientes: {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            description: string | null;
            title: string;
        }[];
    }[];
}>, "many">;
//# sourceMappingURL=response.schema.d.ts.map
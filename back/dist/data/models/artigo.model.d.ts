export declare class Artigo {
    id: number;
    title: string;
    description: string | null;
    subambienteId: number;
    createdAt: Date;
    updatedAt: Date;
    blocks?: any[] | undefined;
    constructor(id: number, title: string, description: string | null, subambienteId: number, createdAt: Date, updatedAt: Date, blocks?: any[] | undefined);
    toResponse(): {
        id: number;
        title: string;
        description: string | null;
        subambienteId: number;
        createdAt: Date;
        updatedAt: Date;
        blocks: {
            id: number;
            type: import("@prisma/client").$Enums.BlocoType;
            order: number;
            content: any;
            artigoId: number;
            createdAt: Date;
            updatedAt: Date;
        }[] | undefined;
    };
}
//# sourceMappingURL=artigo.model.d.ts.map
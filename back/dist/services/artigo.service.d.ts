import { CreateArtigo, UpdateArtigo } from "../data/interfaces/artigo.interface";
export declare function createArtigo(subambienteId: number, data: CreateArtigo): Promise<{
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
}>;
export declare function updateArtigo(id: number, data: UpdateArtigo): Promise<{
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
}>;
export declare function deleteArtigo(id: number): Promise<{
    message: string;
}>;
export declare function listArtigos(subambienteId: number): Promise<{
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
}[]>;
export declare function getArtigo(artigoId: number): Promise<{
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
}>;
//# sourceMappingURL=artigo.service.d.ts.map
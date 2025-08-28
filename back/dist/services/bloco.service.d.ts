import { CreateBloco, UpdateBloco } from "../data/interfaces/bloco.interface";
export declare function createBloco(artigoId: number, data: CreateBloco): Promise<{
    id: number;
    type: import("@prisma/client").$Enums.BlocoType;
    order: number;
    content: any;
    artigoId: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateBloco(id: number, data: UpdateBloco): Promise<{
    id: number;
    type: import("@prisma/client").$Enums.BlocoType;
    order: number;
    content: any;
    artigoId: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteBloco(id: number): Promise<{
    message: string;
}>;
export declare function reorderBlocos(artigoId: number, orderList: number[]): Promise<{
    message: string;
}>;
//# sourceMappingURL=bloco.service.d.ts.map
import { BlocoType } from "@prisma/client";
export declare class Bloco {
    id: number;
    type: BlocoType;
    order: number;
    content: any;
    artigoId: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: number, type: BlocoType, order: number, content: any, artigoId: number, createdAt: Date, updatedAt: Date);
    toResponse(): {
        id: number;
        type: import("@prisma/client").$Enums.BlocoType;
        order: number;
        content: any;
        artigoId: number;
        createdAt: Date;
        updatedAt: Date;
    };
}
//# sourceMappingURL=bloco.model.d.ts.map
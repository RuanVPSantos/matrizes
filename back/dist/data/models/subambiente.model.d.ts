export declare class Subambiente {
    id: number;
    name: string;
    description: string | null;
    ambienteId: number;
    createdAt: Date;
    updatedAt: Date;
    artigos?: any[] | undefined;
    constructor(id: number, name: string, description: string | null, ambienteId: number, createdAt: Date, updatedAt: Date, artigos?: any[] | undefined);
    toResponse(): {
        id: number;
        name: string;
        description: string | null;
        ambienteId: number;
        createdAt: Date;
        updatedAt: Date;
        artigos: any[] | undefined;
    };
}
//# sourceMappingURL=subambiente.model.d.ts.map
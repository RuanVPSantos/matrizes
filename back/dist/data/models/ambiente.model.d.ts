export declare class Ambiente {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    subambientes?: any[] | undefined;
    constructor(id: number, name: string, description: string | null, createdAt: Date, updatedAt: Date, subambientes?: any[] | undefined);
    toResponse(): {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        subambientes: any[] | undefined;
    };
}
//# sourceMappingURL=ambiente.model.d.ts.map